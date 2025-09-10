import { DataTypes, Model } from 'sequelize';
import { sequelize } from './db';
import { DbModels } from '.';

class BranchesModel extends Model {
  static associate(models: DbModels) {
    this.belongsTo(models.OrganizationsModel, { foreignKey: 'organizationId' });
  }
}

BranchesModel.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    organizationId: { type: DataTypes.UUID, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    deliveryTime: { type: DataTypes.DATE, allowNull: false },
    takeAwayTime: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize, modelName: 'Branches', timestamps: true }
);

export { BranchesModel };
