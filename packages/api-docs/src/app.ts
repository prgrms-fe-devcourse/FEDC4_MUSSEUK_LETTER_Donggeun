import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__dirname, '../dist/swagger.yaml'), 'utf8');
const swaggerDocument = YAML.parse(file);

const app = express();
const PORT = 5010;

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`API-Docs Server is running on http://localhost:${PORT}`);
});
