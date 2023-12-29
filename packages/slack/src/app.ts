import 'dotenv/config';
import '@/configs/redis';
import app from '@/configs/express';
import AppDataSource from '@/configs/database';
import router from '@/_routes';

const PORT = process.env.PORT;

app.use('/', router);

AppDataSource.initialize()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
