import 'dotenv/config';
import express from 'express';
import { connectDB } from './models';
import { appConfig } from './config';
import { organizationRoute } from './routes/organization.route';
import { userRoute } from './routes/users.route';
import { WhatSappRoute } from './routes/whatsapp-settings.route';

const app = express();
app.use(express.json());

// routes
app.use('/api/user', userRoute);
app.use('/api/organization', organizationRoute);
app.use('/api/whatsapp-settings', WhatSappRoute);

const PORT = appConfig.port;
app.listen(PORT, async () => {
  await connectDB();
});
