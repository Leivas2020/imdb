import express, { Request, Response } from 'express';
const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is your server on port 3000!');
});

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:${3000}`);
});
