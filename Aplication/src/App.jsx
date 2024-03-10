import React, { useState } from 'react';
import FormComp from './components/FormComp';
import ListComp from './components/ListComp';
import './App.css'
import logo from './assets/Logo.png'

function App() {
  const [vacations, setVacations] = useState([]);

  const addVacatioData = (vacation) => {
    setVacations([...vacations, vacation]);
  };

  const deleteVacation = (index) => {
    const newVacations = [...vacations];
    newVacations.splice(index, 1);
    setVacations(newVacations);
  };

  return (
    <div className="App">
      <img src={logo} alt="vacation" />
      <FormComp addVacatioData={addVacatioData} />
      <ListComp vacations={vacations} deleteVacation={deleteVacation} />
    </div>
  );
}

export default App;