const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

app.use(cors());
app.use(express.json());


//create
app.post("/todos",async(req,res)=>{
    try {
        const {description} = req.body;
        const newToDo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]);
        res.json(newToDo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})
//get a todo

app.get("/todos/:id",async(req,res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);

        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

//get all
app.get("/todos",async(req,res)=>{
    try {
        const allToDos = await pool.query("SELECT * FROM todo");
        res.json(allToDos.rows);
    } catch (error) {
        console.log(error.message)
    }
})
//update
app.put("/todos/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateToDo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);
        res.json("TODO was UPDATED");
    } catch (error) {
        console.log(error)
    }
})

//delete
app.delete("/todos/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteToDo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
        res.json("TODO deleted!");
    } catch (error) {
        console.log(error)
    }
})

app.listen(5000,()=>{
    console.log("Server has started on port 5000 123213");
})

