"use strict";

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

mongoose.connect(
  "mongodb+srv://gustavo:gustavo123@cluster0-grgdl.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  err => {
    err ? console.log(err) : console.log("DB connected");
  },
);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client/build")));

const TodoSchema = new mongoose.Schema({
  task: String,
});
const Todo = mongoose.model("Todo", TodoSchema);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/", "index.html"));
});

app.get("/api/todos", (req, res) => {
  Todo.find({}, (err, todos) => res.send(err ? "Error finding" : todos));
});

app.post("/api/todos/", (req, res) => {
  Todo.create({ task: req.body.task }, (err, created) =>
    res.send(err ? "Error creating" : created),
  );
});

app.get("/api/todos/:id", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => res.send(err ? {} : todo));
});

app.delete("/api/todos/:id", (req, res) => {
  Todo.findOneAndDelete({ _id: req.params.id }, (err, deletedTodo) => {
    res.send({ success: err || !deletedTodo ? "false" : "true" });
  });
});

app.put("/api/todos/:id", (req, res) => {
  Todo.findOneAndUpdate(
    { _id: req.params.id },
    { task: req.body.task },
    (err, updatedTodo) => {
      res.send({ success: err ? "false" : "true" });
    },
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running at ${port}...`));
