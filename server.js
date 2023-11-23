const express = require("express");
const {ObjectId} =require("mongodb");
const { MongoClient } = require("mongodb");
const root = __dirname
const app = express();
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const url = "mongodb+srv://ismaelbentatou:blabla123@cluster0.pnvb5it.mongodb.net/ToDoList?retryWrites=true&w=majority";
let db;

MongoClient.connect(url)
  .then((client) => {
    db = client.db("ToDoList")
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
      
    });
  })
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root })
    
    
})

app.get('/todos', (req, res) => {
    let todos = []
    db.collection('todos')
    .find()
    .forEach((todo) => {
        todos.push(todo)
    })
    .then(() => {
        res.render('index', {todos})
    })
    .catch(() => {
        res.status(500).json({error : 'could not fetch the documents'})
    })
})

app.post('/todos', (req, res) => {
    const newToDo = req.body.newToDo
    console.log(req.body);
    if (!newToDo) {
        return res.status(400).json({ error: 'newToDo field is missing in the request body' });
    }
    db.collection('todos')
    .insertOne({content : newToDo})
    .then((result) => {
        res.json(result)
    })
    .catch((error) => {
        console.error('Error inserting new ToDo:', error);
        res.status(500).json({ error: 'An error occurred while inserting new ToDo' });
    })
})

app.delete('/todos/:id', (req, res) => {
    const todelete = req.params.id

    db.collection('todos')
    .deleteOne({_id : new ObjectId(todelete)})
    .then(() => {
        res.json({msg : "Todo deleted"})
    })
    .catch((err) => res.json({msg : "Could not delete the todo"}))
})
