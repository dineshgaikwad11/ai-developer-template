import { EmployeeForm } from '../components/EmployeeForm';
import { EmployeeList } from '../components/EmployeeList';

export function EmployeePage() {
  return (
    <div className="row g-4">
      <div className="col-12 col-md-4"><EmployeeForm /></div>
      <div className="col-12 col-md-8"><EmployeeList /></div>
    </div>
  );
}