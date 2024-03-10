import React from 'react';

function ListComp({ vacationsList, deleteData }) {
  return (
    <div>
      <h2>Planos de Férias</h2>
      <ul>
        {vacationsList.map((vacation, index) => (
          <li key={index}>
            <h3>{vacation.title}</h3>
            <p>{vacation.description}</p>
            <p>Data: {vacation.date}</p>
            <p>Local: {vacation.location}</p>
            <p>Participantes: {vacation.participants}</p>
            <button onClick={() => deleteData(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListComp;