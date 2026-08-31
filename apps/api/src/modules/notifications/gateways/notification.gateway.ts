import { Injectable } from '@nestjs/common';
import { NotificationDto } from '@enterprise/types';

@Injectable()
export class NotificationGateway {
  broadcastToUser(userId: string, notification: NotificationDto) {
    console.log(`[WebSocketGateway] Emitting notification to user ${userId}: ${notification.title}`);
  }
}
