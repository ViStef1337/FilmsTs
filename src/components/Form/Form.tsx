import { ChangeEvent, FormEvent, useState } from 'react';
import { FormTypes } from './Form.types.ts';

export const Form = ({ searchFilm }: FormTypes) => {
  const [query, setQuery] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchFilm(query);
    console.log(query);
  };
  return (
    <form onSubmit={handleSubmit} action="">
      <input value={query} onChange={handleChange} name="text" type="text" />
      <button type="submit">Submit</button>
    </form>
  );
};
