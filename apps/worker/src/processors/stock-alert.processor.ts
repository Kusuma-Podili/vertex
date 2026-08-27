export class StockAlertProcessor {
  async process(job: { name: string; data: any }) {
    console.log(`[StockAlertProcessor] Low stock trigger for SKU: ${job.data.sku}, Remaining: ${job.data.remaining}`);
    return { status: 'alert_dispatched' };
  }
}
