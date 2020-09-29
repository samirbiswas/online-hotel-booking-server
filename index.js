const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const port = 4000
const app = express();
app.use(cors());
app.use(bodyParser.json());


const pass = 'Arab1234';
app.get('/', (req, res) => {
  res.send('testing ')
});

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://alArab:Arab1234@cluster0.0nyzj.mongodb.net/burjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("burjAlArab").collection("bookings");
  
  app.post('/addbooking',(req, res)=>{
      const newBooking = req.body;
     collection.insertOne(newBooking)
     .then(result=>{
         res.send(result.insertedCount > 0);
     })
     console.log(newBooking);
  })

  app.get('/bookings',(req, res)=>{
      collection.find({email: req.query.email}) 
      .toArray((error, documents)=>{
          res.send(documents);
      })
  })
  
});


app.listen(port)