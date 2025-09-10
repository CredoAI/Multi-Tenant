import 'dotenv/config';
import express from 'express';
import { connectDB } from './models';
import { appConfig } from './config';
import { route as organizationRoute } from './routes/organization.route';
import { userRoute } from './routes/users.route';

const app = express();
app.use(express.json());

// routes
app.use('/api/user', userRoute);
app.use('/api/organization', organizationRoute);

const PORT = appConfig.port;
app.listen(PORT, async () => {
  await connectDB();
});
