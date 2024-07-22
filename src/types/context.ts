export type Action<T, P = void> = P extends void
  ? { type: T }
  : { type: T; payload: P };
