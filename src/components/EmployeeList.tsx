
import { useState } from "react";
import type { Employee } from "../types";
import { ConfirmDialog } from "./ConfirmDialog";

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export const EmployeeList = ({
  employees,
  onEdit,
  onDelete,
}: EmployeeListProps) => {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );

  const handleDeleteClick = (employee: Employee) => {
    setDeleteConfirm(employee.id);
    setEmployeeToDelete(employee);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm) {
      onDelete(deleteConfirm);
      setDeleteConfirm(null);
      setEmployeeToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
    setEmployeeToDelete(null);
  };
  if (employees.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm p-8 text-center">
        <p className="text-gray-600 text-lg">
          No employees found. Add one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 border-b border-gray-300">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
              Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
              Email
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
              Position
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
              Department
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
              Salary
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="border-b border-gray-200 hover:bg-white transition"
            >
              <td className="px-6 py-4 text-gray-900">{employee.name}</td>
              <td className="px-6 py-4 text-gray-700">{employee.email}</td>
              <td className="px-6 py-4 text-gray-700">{employee.position}</td>
              <td className="px-6 py-4 text-gray-700">{employee.department}</td>
              <td className="px-6 py-4 text-gray-700 font-semibold">
                ${employee.salary.toLocaleString()}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onEdit(employee)}
                  className="bg-gray-600 text-white px-3 py-1 rounded mr-2 hover:bg-gray-700 transition text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(employee)}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        title="Delete Employee"
        message={`Are you sure you want to delete ${employeeToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};
