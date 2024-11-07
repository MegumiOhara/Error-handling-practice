import express from 'express';
import { createReservation } from './database.js';

//creating route that calls createReservation and handle errors it returns
const app = express();
app.use(express.json());

app.post('/reserve', (req,res) => {
    createReservation(req.body, (error,result) => {
        if(error) {
            return res.status(500).json({ message: error });
        }
        res.status(201).json({ message: 'Reservation sucessful', data: result});
    });
});

app.listen(3000, () => console.log(`Server running on port 3000`));