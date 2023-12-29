import 'dotenv/config';
import '@/configs/redis';
import app from '@/configs/express';
import AppDataSource from '@/configs/database';
import router from '@/_routes';
import authController from '@/domains/auth/auth.controller';

const PORT = process.env.PORT;

app.use('/', router);
app.use('/auth', authController);

AppDataSource.initialize()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
