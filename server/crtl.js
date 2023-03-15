const todos = [
  { 
    id: 1,
    item: "wash dishes",
    completed: false
  }, 
  {
    id: 2,
    item: "vacuum",
    completed: false
  }, 
  {
    id: 3,
    item: "take out garbage",
    completed: true
  }, 
  {
    id: 4,
    item: "walk the dog",
    completed: false
  }, 
  {
    id: 5,
    item: "grocery shopping",
    completed: false
  }
];
let globalId = 6;

module.exports = {
  getTodos: (req, res) => {
    res.status(200).send(todos);
  },

  addTodo: (req, res) => {
    const { item } = req.body;
  
    if(!item){
      res.sendStatus(400);
    }else{
      todos.push({id: globalId, item, completed: false});
      globalId++;
      res.status(200).send(todos);
    }
  },

  updateItem: (req, res) => {
    console.log("hit update items");
  }
}