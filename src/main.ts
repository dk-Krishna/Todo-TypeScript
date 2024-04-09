import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Todo[] = []; // creating an todo array
const todosContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;
const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const myForm = document.getElementById("myForm") as HTMLFormElement;

// ALL FUNCTIONS
const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  renderTodos(todos);
};

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";

  //   checkbox
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((item) => {
      if (item.id === id) item.isCompleted = checkBox.checked;
    });
    paragraph.className = checkBox.checked ? "textCut" : "";
  };

  //   p tag
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;
  paragraph.className = isCompleted ? "textCut" : "";

  //   delete button
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {
    deleteTodo(id);
  };

  todo.append(checkBox, paragraph, btn);
  todosContainer.append(todo);
};

const renderTodos = (todos: Todo[]) => {
  todosContainer.innerText = "";
  todos.forEach((item) => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  });
};

// MAIN FUNCTION
myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000),
  };

  todos.push(todo);
  todoInput.value = "";
  console.log(todos);

  renderTodos(todos);
};
