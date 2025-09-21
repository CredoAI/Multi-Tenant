import { NotificationPriority, NotificationStatus, RelatedEntityType, RequestStatus } from '../data/data-types';

export interface NotificationAttributes {
  id: string;
  organizationId: string | null; // The tenant organization sending the request
  senderUserId: string | null; // User from tenant organization who sent the request
  requestId: string | null;
  recipientType: 'tenant' | 'admin';
  title: string;
  message: string;
  status: `${NotificationStatus}`;
  relatedEntityType: RelatedEntityType;
  priority: NotificationPriority;
  readAt: Date | null;
}

export interface RequestAttributes {
  id: string;
  organizationId: string;
  requesterUserId: string;
  title: string;
  description: string;
  status: `${RequestStatus}`;
  data: Record<string, any>;
  approvedByUserId: string | null;
  approvalNotes: string | null;
  approvedAt: Date | null;
  rejectedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}
