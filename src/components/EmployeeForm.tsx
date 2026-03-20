
import { useState, useEffect } from "react";
import type { Employee } from "../types";

interface EmployeeFormProps {
  onSubmit: (employee: Employee) => void;
  initialEmployee?: Employee;
  isEditing?: boolean;
}

export const EmployeeForm = ({
  onSubmit,
  initialEmployee,
  isEditing,
}: EmployeeFormProps) => {
  const [formData, setFormData] = useState<Employee>(
    initialEmployee || {
      id: "",
      name: "",
      email: "",
      position: "",
      department: "",
      salary: 0,
    },
  );

  useEffect(() => {
    if (initialEmployee) {
      setFormData(initialEmployee);
    }
  }, [initialEmployee]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "salary" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id && !isEditing) {
      formData.id = Date.now().toString();
    }
    onSubmit(formData);
    if (!isEditing) {
      setFormData({
        id: "",
        name: "",
        email: "",
        position: "",
        department: "",
        salary: 0,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-8 mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {isEditing ? "Edit Employee" : "Add New Employee"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter employee name"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Position
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Salary
          </label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter annual salary"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
      >
        {isEditing ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
};
