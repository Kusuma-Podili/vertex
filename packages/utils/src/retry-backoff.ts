export async function retryWithExponentialBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 4,
  baseDelayMs: number = 500
): Promise<T> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt >= maxRetries) throw err;
      const delay = baseDelayMs * Math.pow(2, attempt) + Math.random() * 100;
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error('Max retries reached');
}
