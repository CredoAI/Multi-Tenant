import { DataTypes, Model } from 'sequelize';
import { sequelize } from './db';
import { DbModels } from '.';
import { supportedBusinessTypes, WhatSappConnectionStatus } from '../data/business-type';

class OrganizationsModel extends Model {
  static associate(models: DbModels) {
    //hasMany The foreign key is on the other model (the one being linked).
    this.hasMany(models.BranchesModel, { foreignKey: 'organizationId' });

    //hasMany The foreign key is on the other model (the one being linked).
    // Organization has many users
    this.hasMany(models.UsersModel, {
      foreignKey: 'organizationId',
      as: 'users',
    });

    // belongsTo → The foreign key is on this model (the one calling belongsTo).
    // Organization has one owner
    this.belongsTo(models.UsersModel, {
      foreignKey: 'ownerId',
      as: 'owner',
    });
  }
}

OrganizationsModel.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    ownerId: { type: DataTypes.UUID, allowNull: false }, // special owner link
    name: { type: DataTypes.STRING, allowNull: false },
    brandTone: { type: DataTypes.STRING, defaultValue: '' },
    businessType: { type: DataTypes.ENUM, values: supportedBusinessTypes },
    whatsappBusinessId: { type: DataTypes.STRING, allowNull: true },
    whatsappPhoneNumberId: { type: DataTypes.STRING, allowNull: true },
    whatsappStatus: {
      type: DataTypes.ENUM,
      values: Object.values(WhatSappConnectionStatus),
      defaultValue: 'not-connected',
    },
    whatsappTemplates: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false, defaultValue: [] },
    AIAssistantName: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, modelName: 'Organizations', timestamps: true }
);

export { OrganizationsModel };
