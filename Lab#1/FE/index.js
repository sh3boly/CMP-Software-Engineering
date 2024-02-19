function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
const submitButton = document.getElementById("submitBtn");
submitButton.addEventListener("click", createEmployee);
// TODO
// add event listener to delete button
const dataTB = document.getElementById("dataTable");
dataTB.addEventListener('click', function(event) {
  if(event.target.classList.contains('btn-sm')){
    deleteEmployee(event);
  }
 
})
// TODO
function createEmployee (event){
  // get data from input field
  // send data to BE
  // call fetchEmployees
  event.preventDefault();
  const ID = document.getElementById("id").value; 
  const Name = document.getElementById("name").value;

  const employeeData = {
    id: ID,
    name: Name
  };
  //console.log(employeeData);
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employeeData)
  })
    .catch(error => console.log(error));
  fetchEmployees();

}

// TODO
function deleteEmployee (event){
  // get id
  // send id to BE
  // call fetchEmployees
  //event.preventDefault();
  const clickedDeleteCell = event.target.closest('td');
  
  const clickedRow = clickedDeleteCell.parentNode;
  
  const clickedIDCell = clickedRow.querySelector('td:first-child');

  const employeeID = clickedIDCell.textContent;
  fetch('http://localhost:3000/api/v1/employee/' + employeeID, {
    method: 'DELETE',
    
  })
    .catch(error => console.log(error));

fetchEmployees();
  

}


fetchEmployees();
