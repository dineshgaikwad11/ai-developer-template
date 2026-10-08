export interface HealthCheckResponse {
  status: 'Healthy' | 'Degraded' | 'Unhealthy' | string;
  checkedAt: string;
}
