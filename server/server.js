const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const { getTodos, addTodo, updateItem } = require("./ctrl");

app.get('/api/todo', getTodos);
app.post("/api/todo", addTodo);
app.put("/api/todo/:id", updateItem);


const PORT = 5051;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
