import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../services/httpClient';
import type { CreateEmployeeInput, Employee } from '../types';

const employeesQueryKey = ['employees'] as const;

async function getEmployees(): Promise<Employee[]> {
  const { data } = await httpClient.get<Employee[]>('/employees');
  return data;
}

async function createEmployee(input: CreateEmployeeInput): Promise<Employee> {
  const { data } = await httpClient.post<Employee>('/employees', input);
  return data;
}

export function useGetEmployees() {
  return useQuery({ queryKey: employeesQueryKey, queryFn: getEmployees });
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: employeesQueryKey }),
  });
}