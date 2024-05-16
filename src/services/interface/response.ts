export interface Response {
  message?: string;
  data?: any;
}

export interface ResponseQuery extends Response {
  ok: boolean;
}
