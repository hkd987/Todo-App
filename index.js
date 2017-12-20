let todoList = {

  todos: [],

  addTodo (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    })
  },

  changeTodo (position, newTodoText) {
    this.todos[position].todoText = newTodoText
  },

  toggleTodo (position) {
    let todoItem = this.todos[position]
    todoItem.completed = !todoItem.completed
  },

  toggleAll () {
    let totalTodos = this.todos.length
    let completedTodos = 0

    this.todos.forEach((todo) => {
      if (todo.completed === true) {
        completedTodos++
      }
    })

    this.todos.forEach((todo) => {
      if (completedTodos === totalTodos) {
        todo.completed = false
      } else {
        todo.completed = true
      }
    })
  },

  deleteTodo (position) {
    this.todos.splice(position, 1)
  }

}

let handlers = {

  toggleAll () {
    todoList.toggleAll()
    view.displayTodos()
  },

  addTodo () {
    let addTodoTextInput = document.getElementById('addTodoTextInput')
    todoList.addTodo(addTodoTextInput.value)
    addTodoTextInput.value = ''
    view.displayTodos()
  },

  changeTodo () {
    let changeTodoPositionValue = document.getElementById('changeTodoPositionValue')
    let changeTodoNewValue = document.getElementById('changeTodoNewValue')
    todoList.changeTodo(changeTodoPositionValue.valueAsNumber, changeTodoNewValue.value)
    changeTodoNewValue.value = ''
    changeTodoPositionValue.value = ''
    view.displayTodos()
  },

  deleteTodo (position) {
    todoList.deleteTodo(position)
    view.displayTodos()
  },

  toggleTodo () {
    let toggleTodoPositionInput = document.getElementById('toggleTodoPositionInput')
    todoList.toggleTodo(toggleTodoPositionInput.valueAsNumber)
    toggleTodoPositionInput.value = ''
    view.displayTodos()
  }

}

let view = {

  displayTodos () {
    let todosUl = document.querySelector('ul')
    todosUl.innerHTML = ''

    todoList.todos.forEach((todo, position) => {
      let todoLi = document.createElement('li')
      let todoTextWithCompletion = ''

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText
      }

      todoLi.id = position
      todoLi.textContent = todoTextWithCompletion
      todoLi.appendChild(this.createDeleteButton())
      todosUl.appendChild(todoLi)
    }, this)
  },

  createDeleteButton () {
    let deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete Me'
    deleteButton.className = 'deleteButton'
    return deleteButton
  },

  setUpEventListeners () {
    let todosUl = document.querySelector('ul')
    todosUl.addEventListener('click', event => {
      let elementClicked = event.target

      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id))
      }
    })
  }

}

view.setUpEventListeners()
