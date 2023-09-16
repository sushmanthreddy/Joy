import express from "express";
import { employeeData, saveData } from "./db.js";

const router = express.Router();

// Routes for employees
router.get("/employees", (req, res) => {
  res.json(employeeData.employees);
});

router.get("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employeeData.employees.find((emp) => emp.id === id);
  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }
  res.json(employee);
});

router.post("/employees", (req, res) => {
  const newEmployee = req.body;
  newEmployee.id = employeeData.employees.length + 1;
  employeeData.employees.push(newEmployee);
  saveData(employeeData); // Update the data directly in db.js
  res.status(201).json(newEmployee);
});

router.put("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedEmployee = req.body;
  const employeeIndex = employeeData.employees.findIndex(
    (emp) => emp.id === id
  );
  if (employeeIndex === -1) {
    return res.status(404).json({ error: "Employee not found" });
  }
  employeeData.employees[employeeIndex] = updatedEmployee;
  saveData(employeeData); // Update the data directly in db.js
  res.json(updatedEmployee);
});

router.delete("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employeeIndex = employeeData.employees.findIndex(
    (emp) => emp.id === id
  );
  if (employeeIndex === -1) {
    return res.status(404).json({ error: "Employee not found" });
  }
  employeeData.employees.splice(employeeIndex, 1);
  saveData(employeeData); // Update the data directly in db.js
  res.status(204).send();
});

export default router;
