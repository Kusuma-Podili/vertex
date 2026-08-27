import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsService {
  async sendSms(phoneNumber: string, message: string) {
    console.log(`[SmsService] Sent SMS to ${phoneNumber}: "${message}"`);
    return true;
  }
}
