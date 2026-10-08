export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  department: string;
  salary: number;
  hireDate: string;
  createdAt: string;
  isDeleted: boolean;
}

export interface CreateEmployeeInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  department: string;
  salary: number;
  hireDate: string;
}