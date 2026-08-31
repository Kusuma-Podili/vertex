import { Injectable } from '@nestjs/common';
import { NotificationDto } from '@enterprise/types';
import { NotificationGateway } from '../gateways/notification.gateway';

@Injectable()
export class NotificationsService {
  private notifications: NotificationDto[] = [
    {
      id: 'notif-1',
      title: 'Order Confirmed',
      message: 'Your order #ORD-9824-AX7 has been confirmed and is being prepared for dispatch.',
      type: 'ORDER_UPDATE',
      isRead: false,
      linkUrl: '/account/orders/ORD-9824-AX7',
      createdAt: new Date().toISOString(),
    }
  ];

  constructor(private readonly wsGateway: NotificationGateway) {}

  async getUserNotifications(userId: string): Promise<NotificationDto[]> {
    return this.notifications;
  }

  async markAsRead(id: string) {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) notif.isRead = true;
    return { success: true };
  }

  async sendPushNotification(userId: string, title: string, message: string, type: 'INFO' | 'ORDER_UPDATE') {
    const notif: NotificationDto = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    this.notifications.unshift(notif);
    this.wsGateway.broadcastToUser(userId, notif);
    return notif;
  }
}
