import React, { useState } from 'react';
import FormComp from './components/FormComp';
import ListComp from './components/ListComp';

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
      <h1>Vacation Plan Manager</h1>
      <FormComp addVacatioData={addVacatioData} />
      <ListComp vacations={vacations} deleteVacation={deleteVacation} />
    </div>
  );
}

export default App;