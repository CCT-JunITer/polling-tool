import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

// Setup cors
app.use(
  cors({
    origin: process.env.NODE_ENV === 'test' ? '*' : (process.env.FRONTEND_HOST as string),
  }),
);

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
