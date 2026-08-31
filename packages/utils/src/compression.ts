import zlib from 'zlib';

export function compressPayload(input: string): Buffer {
  return zlib.gzipSync(Buffer.from(input, 'utf-8'));
}

export function decompressPayload(input: Buffer): string {
  return zlib.gunzipSync(input).toString('utf-8');
}
