import routes from './routes.mjs';
import express from 'express';
import morgan from 'morgan';

const app = express();
const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '3000');

app.use(express.json({ extended: false }));
app.use(morgan('dev'));
app.use(routes);

app.listen(PORT, async () => {
    console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});