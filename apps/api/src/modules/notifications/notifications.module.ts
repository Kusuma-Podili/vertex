import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './services/notifications.service';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';
import { NotificationGateway } from './gateways/notification.gateway';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, EmailService, SmsService, NotificationGateway],
  exports: [NotificationsService, EmailService],
})
export class NotificationsModule {}
