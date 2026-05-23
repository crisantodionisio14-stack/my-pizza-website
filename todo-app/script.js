// Initialize app
let todos = [];
let filter = 'all';

// Load todos from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
  loadTodos();
  renderTodos();
  document.getElementById('todoInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  });
});

// Add a new todo
function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();

  if (text === '') {
    alert('Please enter a task!');
    return;
  }

  const todo = {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date().toLocaleString()
  };

  todos.push(todo);
  saveTodos();
  renderTodos();
  input.value = '';
  input.focus();
}

// Toggle todo completion
function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  }
}

// Delete a todo
function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  renderTodos();
}

// Clear all completed todos
function clearCompleted() {
  if (todos.some(t => t.completed)) {
    if (confirm('Are you sure you want to delete all completed tasks?')) {
      todos = todos.filter(t => !t.completed);
      saveTodos();
      renderTodos();
    }
  } else {
    alert('No completed tasks to clear!');
  }
}

// Filter todos
function filterTodos(filterType) {
  filter = filterType;
  
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  renderTodos();
}

// Render todos in the UI
function renderTodos() {
  const todoList = document.getElementById('todoList');
  const todoCount = document.getElementById('todoCount');
  
  let filteredTodos = todos;
  
  if (filter === 'active') {
    filteredTodos = todos.filter(t => !t.completed);
  } else if (filter === 'completed') {
    filteredTodos = todos.filter(t => t.completed);
  }

  // Clear list
  todoList.innerHTML = '';

  if (filteredTodos.length === 0) {
    todoList.innerHTML = '<div class="empty-state"><p>No tasks yet! 🎉</p></div>';
  } else {
    filteredTodos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      li.innerHTML = `
        <input 
          type="checkbox" 
          class="todo-checkbox" 
          ${todo.completed ? 'checked' : ''} 
          onchange="toggleTodo(${todo.id})"
        >
        <span class="todo-text">${escapeHtml(todo.text)}</span>
        <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
      `;
      todoList.appendChild(li);
    });
  }

  // Update counter
  const activeTodos = todos.filter(t => !t.completed).length;
  todoCount.textContent = `${activeTodos} ${activeTodos === 1 ? 'task' : 'tasks'} remaining`;
}

// Save todos to local storage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Load todos from local storage
function loadTodos() {
  const stored = localStorage.getItem('todos');
  if (stored) {
    todos = JSON.parse(stored);
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}