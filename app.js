import express from 'express';
import { createReservation } from './database.js';
import { getReservation } from './database.js';

//creating route that calls createReservation and handle errors it returns
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Reservation API! Use /reserve to create a reservation, or /reservation/:id to retrieve one.');
});

app.post('/reserve', (req,res) => {
    createReservation(req.body, (error,result) => {
        if(error) {
            return res.status(500).json({ message: error });
        }
        res.status(201).json({ message: 'Reservation sucessful', data: result});
    });
});

app.get('/reservation/:id', async (req,res) => {
    try {
        const result = await getReservation(req.params.id);
        res.status(200).json({ message: 'Reservation found', data: result});
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

//Error-handling middleware 
app.use((error, req, res, next) => {
    console.error("Error: ", error.message || error);
    if ( error.message && error.message.includes('Database')){
      res.status(500).json({ message: 'Database is on vacation'});  
    } else {
        res.status(500).json({ message: 'something went wront on the server' });
    }
    
});

app.get('/broken-route', (req,res,next) => {
    const error = new Error('This route is broken on purpose');
    next(error);
});

app.listen(3000, () => console.log('Server running on port 3000'));

