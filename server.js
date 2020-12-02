const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
class User{
    constructor(email,pass){
        this.email = email;
        this.pass = pass;
    }
}
var users = {}

/* Templating Engine */
app.set('view engine', 'ejs');

/* Middleware */
app.use(express.urlencoded({ extended: true }))

/* Routes */
app.get('/', (req,res)=>{
    res.render('index');
});

app.post('/register', (req,res)=>{
    if(!users[req.body.email]){
    bcrypt.hash(req.body.pass, 10,)
    .then(hash=>{
        var user = { email:req.body.email, pass:hash };
        users[user.email] = user;
        console.log(users);
        res.status(200).send(`Registeration Succesful ${req.body.email}`);
    })
    .catch(err =>{console.error(err); res.status(500).send(err)});
    }else{
        res.status(402).send('User Already Exists');
    }
});

app.post('/login', (req,res)=>{
        if(users[req.body.email]){
        bcrypt.compare(req.body.pass, users[req.body.email].pass)
        .then(function(accepted) {
            if(accepted){
                res.send(`Autenticated ${req.body.email}`)
            }else{
                res.sendStatus(401);
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).send(err);
        });
    }else{
        res.status(404).send("User Not Found");
    }
});

var PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server Listening on port: ${PORT}`)
})