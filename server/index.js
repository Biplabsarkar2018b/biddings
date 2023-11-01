import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import { getUserData, login } from './controllers/authController.js';
import { addBid, addProduct, getAllProducts, getProduct } from './controllers/productController.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Replace with the origin of your frontend app
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(cors());

app.post('/login', login);
app.post('/addProduct', addProduct);
app.post('/addBid', addBid);
app.post('/getProduct', getProduct);
app.post('/getUserData', getUserData);
app.get('/getAllProducts', getAllProducts);
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Everything is fine' });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(3000, () => {
      console.log('Server running on port 3000');
    });

    const changeStream = mongoose.connection.collection('products').watch();

    changeStream.on('change', (change) => {
      io.sockets.emit('dataChange', change);
    });
  })
  .catch((error) => {
    console.error('Could not start the server:', error);
  });
