const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/projectRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "MY APP";


app.use(cors()); 
app.use(express.json()); 

app.use('/api/projects', routes);

app.listen(PORT, () => {
  console.log(`${APP_NAME} IS RUNNING ON PORT ${PORT}`);
});