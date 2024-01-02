import 'dotenv/config';
import '@/configs/redis';
import app from '@/configs/express';
import AppDataSource from '@/configs/database';
import _routerLegacy from './_router_legacy';
import router from './router';

const PORT = process.env.PORT;

app.use('/', _routerLegacy);
app.use('/', router);

AppDataSource.initialize()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
