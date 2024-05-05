//dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

//express Operation
const app = express();
const port = 3200;

//define CORS - Cross origin for receiving the data in JSON format 
app.use(cors());
app.use(bodyParser.json());

//establish connection with the Database

const db2 = mysql.createConnection({
    host : 'localhost',
    user : 'root', //DB mysql username
    password : 'password', //DB mysql password
    database : 'db2'
})

//Verify whether the DB is connected or not
db2.connect(err=>{
    if(err){
        console.log("Connection is not established with the Meeting database");
    }else{
        console.log('Connected to Meeting DataBase')
    }
});


//Database connection has been established now lets get all the details in client table
app.get('/meetings',(req,res)=>{
    const sql = 'SELECT * FROM meetings';
    db2.query(sql ,(err, result)=>{
        if(err){
            console.error("Error in fetching the Meeting data" ,err);
            res.status(500).json({error : 'An Error Occured'});
        }else{
            console.log("Meeting list fetched Successfully");
            res.status(200).json(result);
        }
    })
});




//to Insert Meeting Data in database 
app.post('/addmeeting',(req,res)=>{
    const {meeting_id,meeting_agenda,no_of_people,meeting_date,meeting_time} = req.body;
    const sql = 'INSERT INTO meetings VALUES(?,?,?,?,?)';
    db2.query(sql ,[meeting_id,meeting_agenda,no_of_people,meeting_date,meeting_time], (err,result)=>{
        if(err){
            console.error("Error in adding meeting data in DB2");
            res.status(500).json({error : 'Meeting data not added'});
        }
        else{
            console.log('Meeting added' ,result)
            res.status(200).json({message : 'Meeting added Successfully'});
        }
    });
});


//Update of Meeting.
app.put('/updatemeeting' ,(req, res)=>{
    const {MeetingId,MeetingAgenda,NoOfPeople,MeetingDate,MeetingTime} = req.body;
    console.log(req.body);
    console.log(MeetingId);

    //Sql Query to Update data in Database 
    const sql = 'UPDATE meetings SET meeting_agenda = ?, no_of_people = ?, meeting_date = ? , meeting_time = ? WHERE meeting_id = ?';

    db2.query(sql, [MeetingAgenda, NoOfPeople, MeetingDate, MeetingTime, MeetingId] , (err , result)=>{
        if(err){
            console.error('Error in updating Meeting', err);
            res.status(500).json({error : 'An Error Occured'});
        }else{
            console.log('Meeting Updated');
            res.status(200).json({message : 'Meeting Updated Successfully'});
        }
    })
})


//Delete the Meeting
app.delete('/deletemeeting/:id', (req, res)=>{
    const id = req.params.id;
    const sql = 'DELETE FROM meetings WHERE meeting_id = ?';
    db2.query(sql , [id] , (err , result)=>{
        if(err){
            console.error('Error in deleting the Product');
            res.status(500).json({error : 'An Error occured'});
        }else{
            console.log('Meeting Data Deleted Successfully');
            res.status(200).json({message : 'Meeting Deleting Successfully'});
        }
    })
});

//Get Meeting with ID
app.get('/getmeeting/:id',(req ,res)=>{
    const id = req.params.id;
    const sql = 'SELECT * FROM meetings WHERE meeting_id = ?';

    db2.query(sql , [id], (err, result)=>{
        if(err){
            console.error('Error in fetching meeting', err);
            res.status(500).json({error : 'An Error Occured'});
        }
        else{
            if(result.length ===0){
                res.status(404).json({error : 'Meeting not found'});
            }
            console.log('Meeting Data Fetched Successfully');
            res.status(200).json(result[0]); // Send the client data in the response
        }
    })
});



app.listen(port , ()=>console.log(`Server Connection Established on the port  ${port} for Meeting`));