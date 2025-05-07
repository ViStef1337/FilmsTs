import { ErrorTypes } from './Error.types.ts';

export const Error = ({ error }: ErrorTypes) => {
  return <h1 style={{ color: 'red' }}>{error}</h1>;
};
