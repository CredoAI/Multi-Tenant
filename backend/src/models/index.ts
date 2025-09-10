import { OrganizationsModel } from './organizations.model';
import { BranchesModel } from './branches.model';
import { UsersModel } from './users.model';
import { sequelize } from './db';

interface DbModels {
  OrganizationsModel: typeof OrganizationsModel;
  BranchesModel: typeof BranchesModel;
  UsersModel: typeof UsersModel;
}

const models: DbModels = {
  OrganizationsModel,
  BranchesModel,
  UsersModel,
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
