import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import baseline from './fixtures/assets.json';
import { identity } from '../src/lib/content';

function assetFile(path: string) {
  return resolve('static', path.replace(/^\//, ''));
}

describe('original portfolio assets', () => {
  it.each(baseline)('preserves $path byte for byte', async (asset) => {
    const bytes = await readFile(assetFile(asset.path));
    expect({
      sha256: createHash('sha256').update(bytes).digest('hex'),
      signature: bytes.subarray(0, 8).toString('hex'),
      bytes: bytes.length,
    }).toEqual({ sha256: asset.sha256, signature: asset.signature, bytes: asset.bytes });
  });

  it('uses the PNG portrait URL with the untouched original bytes', async () => {
    const [active, legacy] = await Promise.all([
      readFile(assetFile(identity.image)),
      readFile(assetFile('/images/profile-picture.jpg')),
    ]);
    expect({ path: identity.image, signature: active.subarray(0, 8).toString('hex'), bytes: active })
      .toEqual({ path: '/images/profile-picture.png', signature: '89504e470d0a1a0a', bytes: legacy });
  });
});
