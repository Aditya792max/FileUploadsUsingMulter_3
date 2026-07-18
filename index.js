// Importing all dependencies and also using CommonJS for connectivity and simplicity

const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


// const express = require("express");  .
// const mongoose = require("mongoose");.
// const dotenv = require("dotenv");    .
// const cors = require("cors");        
// const path = require("path");    

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


app.use(express.urlencoded({extended : true}));

// app.use(express.urlencoded({extended: true/false}));
// This is a built-in middleware function in Express that parses incoming requests 
// with URL-encoded payloads. URL-encoded data is what you typically get from 
// HTML form submissions (e.g., <form method="POST">).


const PORT = parseInt(process.env.PORT, 10) || 8080;
const HOST = process.env.HOST || '127.0.0.1';

// Use absolute paths relative to this file to avoid cwd issues
const uploadsDir = path.resolve(__dirname, 'uploads');
const viewsDir = path.resolve(__dirname, 'views');

// This one is going to be our static folder
app.use('/uploads', express.static(uploadsDir));

// EJS
app.set('view engine', 'ejs');
app.set('views', viewsDir);

app.get('/', (req, res) => {
    res.render('homepage');
});

// Start server and attach error handlers
const server = app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
});
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled rejection:', reason);
});



