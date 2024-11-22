import type { Dict } from './shared';

export interface HttpResponse<D = unknown> {
  data: D;
  metadata: Dict;
  message: string | null;
  messageCode: string | null;
  statusCode: number;
}

export interface HttpErrorResponse<D = unknown> {
  data: D;
  metadata: Dict;
  message: string | null;
  messageCode: string | null;
  statusCode: number;
}
