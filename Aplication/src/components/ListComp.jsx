import React, { useState } from 'react';
import logo2 from '../assets/logo2.png';
import './ListComp.css';
import jsPDF from 'jspdf';

function ListComp({ vacations, deleteVacation }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedVacation, setEditedVacation] = useState({});
  const [editMessage, setEditMessage] = useState('');

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedVacation(vacations[index]);
  };

  const handleSave = () => {
    const updatedVacations = [...vacations];
    updatedVacations[editingIndex] = editedVacation;

    saveData(updatedVacations);
    setEditMessage('Sucess.');
    setEditingIndex(null);
    setEditedVacation({});
    setTimeout(() => {
      setEditMessage('');
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedVacation({ ...editedVacation, [name]: value });
  };

  const saveData = (updatedVacations) => {
    fetch('url_do_seu_endpoint', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedVacations),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Dados atualizados com sucesso.');
          response.json().then((data) => {
            setVacations(data);
          });
        } else {
          console.error('Falha ao salvar os dados.');
        }
      })
      .catch((error) => {
        console.error('Erro ao salvar os dados:', error);
      });
  };

  const printDataToPDF = () => {
    const doc = new jsPDF();
    let yPos = 10;
    vacations.forEach((vacation, index) => {
      doc.text(`Título: ${vacation.title}`, 10, yPos);
      doc.text(`Descrição: ${vacation.description}`, 10, yPos + 5);
      doc.text(`Data: ${vacation.date}`, 10, yPos + 10);
      doc.text(`Local: ${vacation.location}`, 10, yPos + 15);
      doc.text(`Participantes: ${vacation.participants}`, 10, yPos + 20);
      yPos += 30;
      if (yPos >= doc.internal.pageSize.height - 20) {
        doc.addPage();
        yPos = 10;
      }
    });
    doc.save("VacationPlan.pdf");
  };

  return (
    <div>
      <img src={logo2} className='logo2' alt="vacation" />
      <ul className='inform'>
        {vacations.map((vacation, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  name="title"
                  value={editedVacation.title}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="description"
                  value={editedVacation.description}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="date"
                  value={editedVacation.date}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="location"
                  value={editedVacation.location}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="participants"
                  value={editedVacation.participants}
                  onChange={handleChange}
                />
                <button onClick={handleSave}>Save</button>
              </div>
            ) : (
              <div>
                <h3>{vacation.title}</h3>
                <p>{vacation.description}</p>
                <p>Data: {vacation.date}</p>
                <p>Local: {vacation.location}</p>
                <p>Participantes: {vacation.participants}</p>
                <button onClick={() => deleteVacation(index)}>Delete</button>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {editMessage && <p>{editMessage}</p>}
      {editingIndex !== null && (
        <div>
          <h3>Valores editados:</h3>
          <p>Título: {editedVacation.title}</p>
          <p>Descrição: {editedVacation.description}</p>
          <p>Data: {editedVacation.date}</p>
          <p>Local: {editedVacation.location}</p>
          <p>Participantes: {editedVacation.participants}</p>
        </div>
      )}
      <button className='printPdf' onClick={printDataToPDF}>Print PDF</button>
    </div>
  );
}

export default ListComp;
