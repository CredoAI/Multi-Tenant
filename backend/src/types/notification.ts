import { NotificationPriority, NotificationStatus, RequestStatus } from "../data/data-types";

export interface NotificationAttributes {
  id: string;
  organizationId: string | null; // The tenant organization sending the request
  senderUserId: string | null; // User from tenant organization who sent the request
  title: string;
  message: string;
  priority: string;
  status: string;
  relatedEntityType: string | null;
  relatedEntityId: string | null;
  actionRequired: boolean;
  actionUrl: string | null;
  expiresAt: Date | null;
  readAt: Date | null;
}

export interface TenantRequest {
  id: string;
  organizationId: string;
  requesterUserId: string;
  title: string;
  description: string;
  status: RequestStatus;
  priority: string;
  data: Record<string, any>;
  assignedToUserId: string | null;
  approvedByUserId: string | null;
  approvalNotes: string | null;
  completedAt: Date | null;
  rejectedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestComment {
  id: string;
  requestId: string;
  userId: string;
  comment: string;
  isInternal: boolean;
  createdAt: Date;
}

export interface NotificationPreferences {
  userId: string;
  emailEnabled: boolean;
  inAppEnabled: boolean;
  pushEnabled: boolean;
}