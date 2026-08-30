export interface ApiResponse<T> {
  success: boolean;
  message?: string | string[];
  data?: T;
  error?: any;
  timestamp: string;
}
