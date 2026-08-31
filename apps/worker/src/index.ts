import { EmailProcessor } from './processors/email.processor';
import { InvoiceProcessor } from './processors/invoice.processor';
import { StockAlertProcessor } from './processors/stock-alert.processor';
import { AnalyticsProcessor } from './processors/analytics.processor';

console.log('🚀 BullMQ Worker Process Started. Listening on queues: email, invoices, stock-alerts, analytics...');

const emailProc = new EmailProcessor();
const invoiceProc = new InvoiceProcessor();
const stockProc = new StockAlertProcessor();
const analyticsProc = new AnalyticsProcessor();

export { emailProc, invoiceProc, stockProc, analyticsProc };
