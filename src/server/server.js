import express from 'express';
import path from 'path';
import {requestTime, logger} from './middlewares.js';
import serverRoutes from './routes/servers.js';
//import mysql from 'mysql';

const __dirname = path.resolve();
const PORT = process.env.PORT ?? 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './dist/views/pages'));

app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(express.json())
app.use(express.urlencoded({extends: false}))
app.use(requestTime);
app.use(logger);

// // Connection pool
// const pool = mysql.createPool({
// 	connectionLimit : 100,
// 	host						: process.env.DB_HOST,
// 	user						: process.env.DB_USER,
// 	password				: process.env.DB_PASS,
// 	database				: process.env.DB_NAME
// })

// // Connect to DB
// pool.getConnection((err, connection) => {
// 	if(err) throw err; // Not connected
// 	console.log(`Connected ${connection.threadId}`);
// })

app.use(serverRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}...`);
});