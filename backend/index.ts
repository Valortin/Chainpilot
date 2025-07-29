import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { NoditController } from './controllers/noditController';
import { NoditService, StreamEvent } from './services/noditService';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
});

app.use(cors());
app.use(express.json());

app.get('/api/balance/:address', NoditController.getBalance);
app.get('/api/transfers/:address', NoditController.getTokenTransfers);
app.post('/api/query', NoditController.processQuery);

io.on('connection', (socket) => {
  console.log('New client connected');
  const unsubscribe = NoditService.subscribeToTransactions('0x1234...abcd', (event: StreamEvent) => {
    socket.emit('transaction', event);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    unsubscribe();
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} at ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' })}`);
});