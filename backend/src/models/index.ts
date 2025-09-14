import { OrganizationsModel } from './organizations.model';
import { BranchesModel } from './branches.model';
import { UsersModel } from './users.model';
import { sequelize } from './db';
import { WhatSappSettingsModel } from './whatsapp-settings.model';
import { ProductModel } from './products.model';
import { BranchInventoryModel } from './branch-inventory.model';
import { ZoneModel } from './zones.model';
import { AreaModel } from './area.model';

interface DbModels {
  OrganizationsModel: typeof OrganizationsModel;
  WhatSappSettingsModel: typeof WhatSappSettingsModel;
  BranchesModel: typeof BranchesModel;
  UsersModel: typeof UsersModel;
  ProductModel: typeof ProductModel;
  ZoneModel: typeof ZoneModel;
  AreaModel: typeof AreaModel;
  BranchInventoryModel: typeof BranchInventoryModel;
}

const models: DbModels = {
  UsersModel,
  OrganizationsModel,
  WhatSappSettingsModel,
  ProductModel,
  BranchesModel,
  ZoneModel,
  AreaModel,
  BranchInventoryModel,
};

Object.values(models).forEach((model: any) => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { models, DbModels, connectDB };
