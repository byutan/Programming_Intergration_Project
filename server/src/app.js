import express from 'express';
import serveFavicon from 'serve-favicon';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'
import signUpRouter from './routes/signUp.js'

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const app = express();

app.use(serveFavicon(path.join(__dirName, '../public', 'favicon.ico')));
app.use(express.json())
app.use(cors());

app.use('/api', signUpRouter)

app.get('/', function (req, res) {
    res.send('Hello World!');
});


export default app;
