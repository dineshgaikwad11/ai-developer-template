import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../services/httpClient';
import type { HealthCheckResponse } from '../types/health';

async function getHealth(): Promise<HealthCheckResponse> {
  const { data } = await httpClient.get<HealthCheckResponse>('/v1/health');
  return data;
}

export function useHealthQuery() {
  return useQuery({ queryKey: ['health'], queryFn: getHealth });
}
