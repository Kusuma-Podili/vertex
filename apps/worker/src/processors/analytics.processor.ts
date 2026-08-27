export class AnalyticsProcessor {
  async process(job: { name: string; data: any }) {
    console.log(`[AnalyticsProcessor] Compiling daily revenue metrics snapshot for: ${job.data.date}`);
    return { status: 'aggregated', records: 1240 };
  }
}
