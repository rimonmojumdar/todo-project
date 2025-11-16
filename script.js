const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', addTask);


taskInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
});


function addTask() {
  const taskText = taskInput.value.trim();
  
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

 
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = taskText;


  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('actions');


  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-btn');
  editBtn.innerHTML = '<i class="fas fa-edit"></i>';
  editBtn.addEventListener('click', () => {
    editTask(span, li); 
  });


  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'; 
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
  });

  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actionsDiv);

  taskList.appendChild(li);

  taskInput.value = "";
}



function editTask(taskSpan, listItem) {

  if (listItem.querySelector('input[type="text"]')) {
    return;
  }

  const originalText = taskSpan.textContent;
  

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = originalText;
  editInput.style.flexGrow = '1';
  editInput.style.padding = '5px';
  editInput.style.border = '1px solid #2196f3';
  editInput.style.borderRadius = '4px';

 
  listItem.replaceChild(editInput, taskSpan);
  
  editInput.focus();
  editInput.setSelectionRange(editInput.value.length, editInput.value.length);
  
  const saveChanges = () => {
    const newText = editInput.value.trim();
    if (newText !== "") {
      taskSpan.textContent = newText;
    } 

    listItem.replaceChild(taskSpan, editInput);
  };
  

  editInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveChanges();
    }
  });


  editInput.addEventListener('blur', saveChanges);
}
