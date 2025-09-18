import { sequelize } from './db';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { OrganizationsModel } from './organizations.model';
import { UsersModel } from './users.model';
import { DbModels } from '.';
import { ModelNames } from './model-names';
import { NotificationAttributes } from '../types/notification';
import { NotificationPriority, NotificationStatus } from '../data/data-types';

// Define the Notification model class
class NotificationModel
  extends Model<InferAttributes<NotificationModel>, InferCreationAttributes<NotificationModel>>
  implements NotificationAttributes
{
  public id!: string;
  public organizationId!: string | null;
  public senderUserId!: string | null;
  public title!: string;
  declare message: string;
  declare priority: NotificationPriority;
  declare status: NotificationStatus;
  declare relatedEntityType: string | null;
  declare relatedEntityId: string | null;
  declare actionRequired: boolean;
  declare actionUrl: string | null;
  declare expiresAt: Date | null;
  declare readAt: Date | null;

  // Association methods
  public readonly Organization?: OrganizationsModel;
  public readonly RecipientUser?: UsersModel;
  public readonly SenderUser?: UsersModel;

  static associate(models: DbModels) {
    // Define associations
    this.belongsTo(models.OrganizationsModel, {
      foreignKey: 'organizationId',
      as: 'Organization',
    });

    this.belongsTo(models.UsersModel, {
      foreignKey: 'senderUserId',
      as: 'SenderUser',
    });

    this.hasMany(models.OrganizationsModel, {
      foreignKey: 'organizationId',
      as: 'Notifications',
    });
  }
}

// Initialize the Notification model
NotificationModel.init(
  {
    id: {
      type: DataTypes.UUID, // Unique identifier for each notification
      defaultValue: DataTypes.UUIDV4, // Auto-generate UUID
      primaryKey: true, // Primary key
      allowNull: false,
    },
    organizationId: {
      type: DataTypes.UUID, // Foreign key to Organization (nullable for system notifications)
      allowNull: true, // Can be null for system-wide notifications
      references: {
        model: 'organizations', // Reference to organizations table
        key: 'id', // Reference to id column
      },
      onUpdate: 'CASCADE', // Update notification if organization changes
      onDelete: 'SET NULL', // Keep notification if organization is deleted
    },
    senderUserId: {
      type: DataTypes.UUID, // Foreign key to User (who sent the notification)
      allowNull: true, // Can be null for system-generated notifications
      references: {
        model: 'users', // Reference to users table
        key: 'id', // Reference to id column
      },
      onUpdate: 'CASCADE', // Update notification if sender user changes
      onDelete: 'SET NULL', // Keep notification if sender user is deleted
    },
    title: {
      type: DataTypes.STRING(255), // Short title for the notification
      allowNull: false, // Required field
      validate: {
        notEmpty: true, // Cannot be empty
        len: [1, 255], // Length between 1 and 255 characters
      },
    },
    message: {
      type: DataTypes.TEXT, // Full message content (can be long)
      allowNull: false, // Required field
      validate: {
        notEmpty: true, // Cannot be empty
      },
    },
    priority: {
      type: DataTypes.STRING(20), // Priority level (low, medium, high, urgent)
      allowNull: false, // Required field
      defaultValue: 'medium', // Default priority
      validate: {
        isIn: [['low', 'medium', 'high', 'urgent']], // Only allowed values
      },
    },
    status: {
      type: DataTypes.STRING(20), // Current status of notification
      allowNull: false, // Required field
      defaultValue: 'unread', // Default status
      validate: {
        isIn: [['unread', 'read', 'archived', 'dismissed']], // Allowed status values
      },
    },
    relatedEntityType: {
      type: DataTypes.STRING(50), // Type of entity this notification relates to
      allowNull: true, // Optional field
      validate: {
        len: [0, 50], // Length up to 50 characters
      },
    },
    relatedEntityId: {
      type: DataTypes.UUID, // ID of the related entity
      allowNull: true, // Optional field
    },
    actionRequired: {
      type: DataTypes.BOOLEAN, // Whether user action is required
      allowNull: false, // Required field
      defaultValue: false, // Default to no action required
    },
    actionUrl: {
      type: DataTypes.STRING(500), // URL for taking action on notification
      allowNull: true,
      validate: {
        len: [0, 500],
        isUrl: true,
      },
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    readAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: ModelNames.Notifications,
    timestamps: true,
    indexes: [
      {
        fields: ['organizationId'],
      },
      {
        fields: ['recipientUserId'], // Index for user-specific notifications
      },
      {
        fields: ['status'], // Index for status-based filtering
      },
      {
        fields: ['priority'], // Index for priority-based sorting
      },
      {
        fields: ['expiresAt'], // Index for expiration queries
      },
    ],
  }
);

export default Notification;
