import React, { useState } from "react";

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("");

  const handleNoteChanges = (e) => {
    setNewNote(e.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    //props: function
    createNote({
      content: newNote,
      important: false,
    });
    setNewNote("");
  };

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input
          
          value={newNote}
          onChange={handleNoteChanges}
          placeholder="Write some notes"
        />
        <button 
          type="submit">
          save
        </button>
      </form>
    </div>
  );
};
export default NoteForm;
