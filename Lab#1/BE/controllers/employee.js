const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  res.status(204);
  const index = employee.findIndex(employee => employee.id === id);
  employee.splice(index);
};

// TODO
exports.createEmployee = async (req, res, next) => {
  
  const {name, id} = req.body;
  
  const employeeExist = employee.find(employee => employee.id === id);
  if(employeeExist){
    res.status(400).send({message: "ERROR A User with the same ID already exists!"});

  }else{
  employee.push({id, name});
  res.status(201);
  }
};
