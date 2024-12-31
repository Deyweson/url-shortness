import express, { Request, Response } from 'express';
import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import path from 'path';

const prisma = new PrismaClient();
const server = express();

server.use(express.json());

cron.schedule('* * * * *', async () => {
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - 1); // Define a data limite como 1 dia antes da data atual
  console.log(dataLimite);
  await prisma.urls.deleteMany({
    where: {
      created_at: {
        lt: dataLimite, // Filtra registros criados há mais de 1 minuto
      },
    },
  });
  console.log('Cron job executed');
});

server.get('/', async (__req: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, 'front', 'index.html'));
});

server.get('/:url', async (request: Request, response: Response) => {
  const { url } = request.params;

  const original_url = await prisma.urls.findUnique({ where: { shortness_url: url } });

  if (original_url) {
    return response.redirect(original_url.original_url);
  }

  return response.status(404).json({ message: 'Link not found' });
});

server.post('/short-url/:url', async (req: Request, res: Response) => {
  const { url } = req.params;

  const original_url = await prisma.urls.findUnique({ where: { original_url: url } });
  if (original_url) {
    return res.status(400).json({ message: 'Link already in database', shortUrl: original_url.shortness_url });
  }

  const shortUrl = nanoid(10);
  const shortURLExists = await prisma.urls.findUnique({ where: { shortness_url: shortUrl } });
  if (shortURLExists) {
    return res.status(400).json({ message: 'Short URL already exists' });
  }

  await prisma.urls.create({ data: { original_url: url, shortness_url: shortUrl } });
  return res.status(201).json({ shortUrl });
});

server.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});
