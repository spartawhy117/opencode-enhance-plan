#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const packageJsonPath = path.join(repoRoot, 'package.json');
const tempDir = path.join(repoRoot, 'temp');
const gitBin = 'git';
const npmBin = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function fail(message) {
  console.error(`\n[repo-release-workflow] ${message}`);
  process.exit(1);
}

function run(command, args) {
  execFileSync(command, args, {
    cwd: repoRoot,
    stdio: 'inherit',
  });
}

function capture(command, args) {
  return execFileSync(command, args, {
    cwd: repoRoot,
    encoding: 'utf8',
  }).trim();
}

function ensureGitRepository() {
  const insideWorkTree = capture(gitBin, ['rev-parse', '--is-inside-work-tree']);
  if (insideWorkTree !== 'true') {
    fail('Current directory is not inside a git repository.');
  }
}

function ensureTempDir() {
  fs.mkdirSync(tempDir, { recursive: true });
}

function readPackageJson() {
  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
}

function getPackageName() {
  return readPackageJson().name ?? path.basename(repoRoot);
}

function hasWorkingTreeChanges() {
  return capture(gitBin, ['status', '--porcelain']).length > 0;
}

function stageAllChanges() {
  run(gitBin, ['add', '-A']);
}

function writeCommitMessage(message) {
  const normalized = message.trim();
  if (!normalized) {
    fail('Commit message cannot be empty.');
  }

  ensureTempDir();
  const messagePath = path.join(tempDir, 'git-commit-message.txt');
  fs.writeFileSync(messagePath, `${normalized}\n`, 'utf8');
  return messagePath;
}

function createCommit(message) {
  const messagePath = writeCommitMessage(message);
  run(gitBin, ['commit', '-F', messagePath]);
}

function getCurrentBranch() {
  return capture(gitBin, ['branch', '--show-current']);
}

function normalizeVersion(value) {
  return value.trim().replace(/^v/, '');
}

function parseArgs(argv) {
  const parsed = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (!token.startsWith('--')) {
      fail(`Unknown argument: ${token}`);
    }

    const key = token.slice(2);
    const value = argv[index + 1];

    if (!value || value.startsWith('--')) {
      fail(`Missing value for --${key}`);
    }

    parsed[key] = value;
    index += 1;
  }

  return parsed;
}

function resolveReleaseVersion(args) {
  const bump = args.bump;
  const explicitVersion = args.version;

  if (bump && explicitVersion) {
    fail('Use either --bump or --version, not both.');
  }

  if (!bump && !explicitVersion) {
    fail('Release mode requires --bump <patch|minor|major> or --version <x.y.z>.');
  }

  if (bump && !['patch', 'minor', 'major'].includes(bump)) {
    fail('Supported bump values are patch, minor, or major.');
  }

  const target = explicitVersion ?? bump;
  return normalizeVersion(
    capture(npmBin, ['version', target, '--no-git-tag-version']),
  );
}

function runCommitMode(args) {
  const message = args.message;
  if (!message) {
    fail('Commit mode requires --message "<text>".');
  }

  stageAllChanges();

  if (!hasWorkingTreeChanges()) {
    console.log('[repo-release-workflow] No changes to commit.');
    return;
  }

  createCommit(message);
  console.log(`[repo-release-workflow] Commit created for ${getPackageName()}.`);
}

function runReleaseMode(args) {
  const branch = getCurrentBranch();
  if (!branch) {
    fail('Release mode requires an attached branch head.');
  }

  const version = resolveReleaseVersion(args);
  run(npmBin, ['run', 'build']);
  stageAllChanges();
  createCommit(args.message ?? `release: v${version}`);
  run(gitBin, ['tag', `v${version}`]);
  run(gitBin, ['push']);
  run(gitBin, ['push', '--tags']);
  run(npmBin, ['publish']);

  console.log(`[repo-release-workflow] Released ${getPackageName()}@${version}.`);
}

function main() {
  ensureGitRepository();

  const [mode, ...rest] = process.argv.slice(2);
  const args = parseArgs(rest);

  if (!mode) {
    fail('Usage: node scripts/release-workflow.mjs <commit|release> [options]');
  }

  if (mode === 'commit') {
    runCommitMode(args);
    return;
  }

  if (mode === 'release') {
    runReleaseMode(args);
    return;
  }

  fail(`Unsupported mode: ${mode}`);
}

main();
