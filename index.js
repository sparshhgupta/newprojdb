const express = require('express')
const bodyParser = require('body-parser')
const app = express().use(express.static(__dirname + '/'))

var http = require('http').Server(app)
const db = require('./queries')
const port = 3003
app.set("view engine","ejs");
app.use(express.static('public'));

app.get("",(req,res)=>{
  res.render('index');
})

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

app.get('/',(req,res)=>{
  res.send("hello for the express server");
});

app.get('/view', db.getUsers)
app.post('/add_person', db.createUser)
app.post('/addbloodreport', db.createBloodReport)
app.post('/add_donor',db.createDonor)
app.post('/add_recipient',db.createRecipient)    //giving no available stock everytime entry doesnt match
app.get('/searchbycomp',db.getByComponents)
app.get('/searchbycity',db.getByCity)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})