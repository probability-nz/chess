import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

process.chdir(fileURLToPath(new URL('../', import.meta.url)));
const manifest = JSON.parse(readFileSync('release.json', 'utf8'));
assert(manifest?.['@patchwork']?.type === 'probability-release' && manifest.version === 1 &&
  manifest.game?.['@patchwork']?.type === 'probability' && manifest.game.formatVersion === 0 &&
  !('@probability' in manifest) && !('@probability' in manifest.game), 'Unsupported Play release format');
for (const file of manifest.files) {
  const data = readFileSync(file.path);
  file.bytes = data.length;
  file.sha256 = createHash('sha256').update(data).digest('hex');
}
writeFileSync('release.json', JSON.stringify(manifest, null, 2) + '\n');
const files = ['package.json', 'release.json', ...manifest.files.map(file => file.path),
  ...['README.md', 'LICENSE.md', 'screenshot.png'].filter(existsSync)];
mkdirSync('dist', { recursive: true });
rmSync('dist/mod.zip', { force: true }); // Recreate so obsolete members cannot survive.
execFileSync('zip', ['-q', '-9', 'dist/mod.zip', '-@'], {
  input: [...new Set(files)].sort().join('\n') + '\n',
});
console.log('dist/mod.zip');
