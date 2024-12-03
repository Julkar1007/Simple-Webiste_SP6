const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');


app.use(cors({
    origin:'http://127.0.0.1:5500'
}));

app.use(bodyParser.json());
app.use(express.static('public'));

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'project'
})


db.connect(err =>{
    if (err) {
       throw err 
    }
    console.log('projectDB is connected');
})

app.get('/api/users', (req , res) =>{
    db.query('SELECT * FROM users' , (err , result) => {
        if (err) {
         throw err   
        }
        console.log(result);
        res.json(result);
    })
})

app.post('/api/users' , (req, res) =>{
   const user = req.body;
   db.query('INSERT INTO users SET ?' , user ,(err) =>{
    if(err) throw err;
    res.sendStatus(201);
   }) 
})
app.post('/api/login', (req, res) => {
    const { username, password } = req.body; 
    // Query to check if the user exists and password matches
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        console.log(results);
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        else {
            // Invalid credentials
            res.status(201).json({ message: 'login successfull', data:results });
        }
    });
});

app.delete('/api/users/:id', (req, res)=>{
    db.query('DELETE FROM users WHERE id = ?' , [req.params.id] , (err) =>{
        if(err) throw err;
        res.sendStatus(201);
    })
})

app.get('/api/users/:id' , (req , res) =>{
    db.query('SELECT * FROM users  WHERE id = ?', [req.params.id] ,(err , result) =>{
        if(err) throw err ;
        res.json(result[0]);
    });
})


app.put('/api/users/:id' , (req , res) =>{
    const {id} = req.params;
    const updatedUser = req.body ;
    db.query('UPDATE users SET ? WHERE id = ? ' , [updatedUser , id] , (err)=>{
        if(err) throw err;
        res.sendStatus(201);
    })
})

app.listen(port , ()=> console.log(`server is runnnig at ${port}`)
)
