import './App.css';
import React from 'react';
import Calendar from './components/Calendar/Calendar';

function App() {
  const now = new Date(); // Какую дату выводить, пример использования: new Date(2017, 2, 8);

  return (
    <Calendar date={now} />
  );
}

export default App;
