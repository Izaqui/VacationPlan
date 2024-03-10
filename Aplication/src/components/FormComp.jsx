import React, { useState } from 'react';
import './FormComp.css';

function FormComp({ addVacatioData }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [participants, setParticipants] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !date || !location) {
      alert('All fields are mandatory.');
      return;
    }
    addVacatioData({ title, description, date, location, participants });
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
    setParticipants('');
  };

  return (
    <form className='formStyles' onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Participants"
        value={participants}
        onChange={(e) => setParticipants(e.target.value)}
      />
      <button type="submit">To Add</button>
    </form>
  );
}

export default FormComp;