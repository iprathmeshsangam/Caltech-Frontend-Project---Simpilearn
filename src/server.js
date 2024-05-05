//dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

//express Operation
const app = express();
const port = 3100;

//define CORS - Cross origin for receiving the data in JSON format 
app.use(cors());
app.use(bodyParser.json());

//establish connection with the Database

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'db'
})

db.connect(err=>{
    if(err){
        console.log("Connection  is not established with the database");
    }else{
        console.log('Connected to Database')
    }
})


//Database connection has been established now lets get all the details in client table
app.get('/clients',(req,res)=>{
    const sql = 'SELECT * FROM clients';
    db.query(sql ,(err, result)=>{
        if(err){
            console.error("Error in fetching the client data" ,err);
            res.status(500).json({error : 'An Error Occured'});
        }else{
            console.log("Client list fetched Successfully");
            res.status(200).json(result);
        }
    })
});


//to insert client data into the DB;
app.post('/addclient', (req ,res)=>{
    const {clientId, clientName,clientEmail,clientAddress,clientPhone} = req.body;
    const sql = `INSERT INTO clients  VALUES(?,?,?,?,?)`;
    db.query(sql , [clientId,clientName,clientEmail,clientAddress,clientPhone] ,(err ,result)=>{
        if(err){
            console.error('Error in adding client in Database',err);
            res.status(500).json({error : 'An Error occured'});
        }
        else{
            console.log("Client added to the Database");
            res.status(200).json({message : 'Product added Successfully'});
        }
    })

})

//update of Product
app.put('/updateclient',(req, res)=>{
    const {id,clientName,clientEmail,clientAddress,clientPhone} = req.body;
    console.log(req.body);
    console.log(id);
    // console.log(client_name);
    // console.log(client_email);  
    // console.log(client_address);
    // console.log(client_phone);
    const sql ='UPDATE clients SET client_name = ? , client_email = ? , client_address = ? ,client_phone = ? WHERE client_id = ? ';
    db.query(sql, [clientName, clientEmail, clientAddress, clientPhone, id] , (err , result)=>{
        if(err){
            console.error('Error in Updating Client',err);
            res.status(500).json({error : 'An Error occured', err});
        }else{  
            console.log('Client Successfully Updated');
            res.status(200).json({message : 'Product Updated Successfully'});
        }
    }); 
});


//Delete the Client
app.delete('/deleteclient/:id',(req,res)=>{
    const id = req.params.id;
    const sql ='DELETE FROM clients WHERE client_id = ?';
    db.query(sql,[id],(err,result)=>{
        if(err){
            console.error('Error in deleting the product',err);
            res.status(500).json({error : 'An Error Occured'});
        }else{
            console.log("Client Data Deleted Successfully");
            res.status(200).json({message : 'Product Deleted Successfully'});
        }
    })
})


//get a Client With ID  
app.get('/getclient/:id',(req,res)=>{
    const id = req.params.id;

    //validate id (example if it's Number)
    if(isNaN(id)){
        return res.status(400).json({error : 'Invalid client ID'});
    }

    //SQL Query 
    const sql ='SELECT * FROM clients WHERE client_id = ?';

    db.query(sql,[id],(err,result)=>{
        if(err){
            console.error('Error in fetching client',err);
            res.status(500).json({error : 'An Error Occurred'});
        }
        else{
            if (result.length === 0) {
                res.status(404).json({error : 'Client not found'});
            } else {
                console.log("Client Data Fetched Successfully");
                res.status(200).json(result[0]); // Send the client data in the response
            }
        }
    });
});


app.listen(port , ()=>console.log(`Server Connection Established on the port  ${port}`));

