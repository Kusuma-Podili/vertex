export class InvoiceProcessor {
  async process(job: { name: string; data: any }) {
    console.log(`[InvoiceProcessor] Generating PDF invoice for Order: ${job.data.orderId}`);
    return { status: 'generated', pdfUrl: `https://enterprise-ecommerce.internal/invoices/${job.data.orderId}.pdf` };
  }
}
