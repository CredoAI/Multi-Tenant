import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from './db';
import { DbModels } from '.';
import { WhatSappConnectionStatus } from '../data/data-types';

class WhatSappSettingsModel extends Model<
  InferAttributes<WhatSappSettingsModel>,
  InferCreationAttributes<WhatSappSettingsModel>
> {
  declare organizationId: string | null;
  declare whatsappBusinessId: string;
  declare whatsappPhoneNumberIds: string[];
  declare connectionStatus: `${WhatSappConnectionStatus}`;
  declare whatsappTemplates: string[];
  static associate(models: DbModels) {
    // belongsTo → The foreign key is on this model (the one calling belongsTo).
    // A WABA belongs to one organization (employee/staff)
    this.belongsTo(models.OrganizationsModel, {
      foreignKey: 'organizationId',
      as: 'organization',
    });
  }
}

WhatSappSettingsModel.init(
  {
    organizationId: { type: DataTypes.UUID, allowNull: true },
    whatsappBusinessId: { type: DataTypes.STRING, allowNull: false },
    whatsappPhoneNumberIds: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false, defaultValue: [] },
    connectionStatus: {
      type: DataTypes.ENUM,
      values: Object.values(WhatSappConnectionStatus),
      defaultValue: 'not-connected',
    },
    whatsappTemplates: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false, defaultValue: [] },
  },
  {
    sequelize,
    tableName: 'Whatsappsettings',
    indexes: [
      {
        fields: ['organizationId'],
      },
    ],
  }
);

export { WhatSappSettingsModel };
