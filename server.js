const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path=require("path")
const candidateModel = require('./userModel'); 

const app = express();
const  port=process.env.port||5000

// Use CORS middleware

app.use(express.json());



// Create a new candidate
app.post("/create", async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.body.pic)
        console.log(req.body.pic)
        console.log(req.body.pic)
        console.log(req.body.pic)
        console.log(req.body.pic) 
        console.log(req.body.pic)
        const candidate = await candidateModel.create(req.body);
        console.log("response sended")
        res.json({ data: candidate });
    } catch (error) {
        console.log(error)

        
        res.status(500).json({ error: error.message });
    }
});

// Fetch all candidates
app.get('/alldata', async (req, res) => {
    try {
        const candidates = await candidateModel.find();
      
        res.json({ data: candidates });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching candidates' });
    }
});

// Update candidate data
app.patch("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedCandidate = await candidateModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ data: updatedCandidate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a candidate
app.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const deletedUser = await candidateModel.findByIdAndDelete(id);
        res.json({ data: deletedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use(express.static('frontend/build'));

// Catch-all route to serve the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,"frontend", "build", "index.html"))
  
  
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
