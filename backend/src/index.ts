import 'dotenv/config';
import express from 'express';
import { connectDB } from './models';
import { appConfig } from './config';
import { organizationRoute } from './routes/organization.route';
import { userRoute } from './routes/users.route';
import { WhatSappRoute } from './routes/whatsapp-settings.route';
import { zoneRoute } from './routes/zone.route';
import { branchRoute } from './routes/branch.route';
import { areaRoute } from './routes/area.route';
import { productRoute } from './routes/product.route';

const app = express();
app.use(express.json());

// routes
app.use('/api/user', userRoute);
app.use('/api/organization', organizationRoute);
app.use('/api/whatsapp-settings', WhatSappRoute);
app.use('/api/organization/zone', zoneRoute);
app.use('/api/organization/area', areaRoute);
app.use('/api/organization/branch', branchRoute);
app.use('/api/organization/product', productRoute);

const PORT = appConfig.port;
app.listen(PORT, async () => {
  await connectDB();
});
