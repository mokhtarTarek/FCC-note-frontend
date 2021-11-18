import React, { useState, useEffect, useRef } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import Togglable from "./components/Togglable";
import Footer from "./components/Footer";
import noteService from "./services/notes";
import loginService from "./services/login";

function App() {
//------------------------STATES----------------------------
const noteFormRef = useRef();
const [notes, setNotes] = useState([]);
const [showAll, setShowAll] = useState(true);
const [errorMessage, setErrorMessage] = useState(null);
const [user, setUser] = useState(null);

//--------------------EFFECT--------------------------------

//FETCH NOTES FROM SERVER
useEffect(() => {
  noteService
  .getAll()
  .then((initialNotes) => {
    setNotes(initialNotes);
  });
}, []);

//FETCH USER INFOS FORM LOCAL STORAGE
useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    setUser(user);
    noteService.setToken(user.token);
  }
}, []);

///////////////////////// EVENTS HANDLERS //////////////////////////
const handleLogin = async (username,password) => {
  
  try {
    const user = await loginService.login({
      username,
      password,
    });
    window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
    noteService.setToken(user.token);
    setUser(user);

  } catch (exception) {
    setErrorMessage("wrong credentials");
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }
};

const addNote = (noteObj) => {
  noteFormRef.current.toggleVisibility()
  noteService
  .create(noteObj)
  .then((returnedNote) => {
    //apend notes arr
    setNotes([...notes, returnedNote]);
  });
};


const toggleImportanceOf = (id) => {
  const note = notes.find((n) => n.id === id);
  const changedNote = { ...note, important: !note.important };
  noteService
    .update(id, changedNote)
    .then((returnedNote) => {
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
    })
    .catch((err) => {
      setErrorMessage(
        `the note ${note.content} was already deleted from server`
      );
      //disable error message after 5 sec
      setTimeout(() => setErrorMessage(null), 5000);
      //filter the notes state
      setNotes(notes.filter((n) => n.id !== id));
    });

const notesToWhow = showAll
  ? notes
  : notes.filter((note) => note.important === true);


///////////////////////////// FORMS ////////////////////////////////
const loginForm = () => (
<Togglable buttonLabel="log in">
  <LoginForm
    
    handleSubmit={handleLogin}
  />
</Togglable>
);

const noteForm = () => (
  <Togglable buttonLabel="new note" ref={noteFormRef} >
    <NoteForm
      createNote={addNote}
    />
  </Togglable>
);






//////////////////////////////// RENDER ////////////////////////////
return (
  <div>
    <h3>Notes-App</h3>
    <Notification message={errorMessage} />
    {/* if the first statement is falsy 
    the second statement is not executed at all */}

    {/* {user === null && loginForm()}
    {user !== null && noteForm()} */}
    
    {user === null ? (
      loginForm()
    ) : (
      <div>
        <p> {user.name} logged-in </p>
        {noteForm()}
      </div>
    )}

    <div onClick={() => setShowAll(!showAll)}>
      <button>show {showAll ? "important" : "all"} </button>
    </div>
    <ul>
      {notesToWhow.map((note) => (
        <Note
          key={note.id}
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
        />
      ))}
    </ul>

    <Footer />
  </div>
);
}

export default App;
