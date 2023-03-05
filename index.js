// run `node index.js` in the terminal
const express = require('express');
const sequelize = require('./util/database');
const csv = require('csv-parser');
const winston = require('winston');
const fs = require('fs');
const app = express();

const PORT = 3000;

const results = [];
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   next();
// });


const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename: 'error.log' })],
});

fs.createReadStream('data.csv')
.on('error', (err) => {
    logger.error(err.stack);
})
.pipe(csv())
.on('data', (data) => {
    results.push(data);
})
.on('end', () => {
    console.log('CSV file successfully processed');
});

// app.use((err, req, res, next) => {
//     logger.error(err.stack);
//     res.status(500).send('Internal Server Error');
// });
//test route
app.get('/', (req, res, next) => {
 return res.send('Hello World');
});

//CRUD routes
app.use('/users', require('./routes/users'));

// app.get('/api/data', (req, res) => {
//   return res.json(results);
// });

// app.listen(PORT, () => {
//   console.log(`API server listening on port ${PORT}`);
// });

sequelize
  .sync()
  .then((result) => {
    console.log('Database connected');
    app.listen(3000);
  })
  .catch((err) => console.log(err));