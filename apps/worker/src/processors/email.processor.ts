export class EmailProcessor {
  async process(job: { name: string; data: any }) {
    console.log(`[EmailProcessor] Processing transactional job: ${job.name}`);
    return { status: 'sent', timestamp: new Date().toISOString() };
  }
}
