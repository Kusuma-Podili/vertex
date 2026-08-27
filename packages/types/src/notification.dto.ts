export interface NotificationDto {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'ORDER_UPDATE' | 'PROMOTION' | 'SECURITY';
  isRead: boolean;
  linkUrl?: string;
  createdAt: string;
}
