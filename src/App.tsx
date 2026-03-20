/** @format */

import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { EmployeeForm } from "./components/EmployeeForm";
import { EmployeeList } from "./components/EmployeeList";
import type { Employee } from "./types";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      position: "Senior Developer",
      department: "IT",
      salary: 120000,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      position: "HR Manager",
      department: "HR",
      salary: 95000,
    },
  ]);

  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const handleAddEmployee = (employee: Employee) => {
    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editingEmployee.id ? employee : emp)),
      );
      setEditingEmployee(null);
    } else {
      setEmployees((prev) => [...prev, employee]);
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleCancel = () => {
    setEditingEmployee(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="w-full px-4 py-8">
        <div className="w-full">
          <EmployeeForm
            onSubmit={handleAddEmployee}
            initialEmployee={editingEmployee || undefined}
            isEditing={!!editingEmployee}
          />

          {editingEmployee && (
            <button
              onClick={handleCancel}
              className="mb-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Cancel Edit
            </button>
          )}

          <EmployeeList
            employees={employees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
