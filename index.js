const todos = document.getElementById("todos");
const todoForm = document.getElementById("add");
let item = document.querySelector("#newTodo");
const submitBtn = document.querySelector('#submit');

let myItems = [];
let editing = false;
let editId = 0;

function editTodo(id){
  editing = true;
  submitBtn.textContent = 'save';
  myItems.forEach((obj, i) => {
    if(obj.id === id){
      item.value = obj.item;
      editId = id;
    }
  });
}

function displayItems(obj){
  const listItem = document.createElement("li");
  listItem.className = "item";
  listItem.innerHTML = `
    <p>${obj.item}</p>
    <button onClick='editTodo(${obj.id})'>edit</button>
    `;
  todos.appendChild(listItem);
  todos.appendChild(document.createElement("br"))

}

function clear(){
  todos.innerHTML = '';
  submitBtn.textContent = 'add';
  editing = false;
}

function getTodos(){
  clear();
  axios.get("http://localhost:5051/api/todo").then((result) => {
    result.data.forEach(todo => displayItems(todo));
    myItems = result.data;
  }).catch(err => console.log({err, message: "Problem getting todos"}));
};

function addTodo(e){
  e.preventDefault();
  clear();
  axios.post("http://localhost:5051/api/todo", {item: item.value}).then(result => {
    result.data.forEach(todo => displayItems(todo));
  }).catch(err => console.log(err));
};

function saveItem(e){
  e.preventDefault();
  console.log("hit save item");
  axios.put(`http://localhost:5051/api/todo/${editId}`, {item: item.value}).then(result => {
    console.log(result.data);
  }).catch(err => console.log(err));
}

getTodos();
todoForm.addEventListener("submit", (e) => editing? saveItem(e): addTodo(e));
