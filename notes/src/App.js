import Sidebar from './components/Sidebar';
import Editor from './components/Editor'
import './App.css';
import { useState } from 'react';
import nanoId from 'nano-id'
import Split from "react-split"

function App() {

  //states for notes
  const [notes,setNotes] = useState([])
  //check if a note exist and capture id of new appended note or set current note id to be an empty string
  const [currentNoteId, setCurrrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  )

  //creating a new note
  function createNewNote(){
    const newNote = {
      id: nanoId(),
      body: "# Type your markdown note's title here"
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrrentNoteId(newNote.id)
  }
  //finding the the current note we are in
  function findCurrentNote(){
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  //Updating notes
  function updateNote(text){
    //loop through existing notes and check if current note youre in is really the id of the selected note. if so apply update on bidy param
    setNotes(oldNotes => oldNotes.map(oldNote => {
      return oldNote.id ===currentNoteId ? {...oldNote, body:text} : oldNote
    }))
  }
  return (
    <main>
      {
        notes.length > 0 ?
      <Split
        sizes={[30,70]}
        direction="horizontal"
        className='split'>
      <Sidebar 
        notes={notes}
        currentNote={findCurrentNote()}
        setCurrentNoteId = {setCurrrentNoteId}
        newNote={createNewNote}
      />
      {
        currentNoteId && notes.length > 0 &&
        <Editor
          currentNote={findCurrentNote()}
          updateNote = {updateNote}
        />
      }
      </Split>
      :
      <div className="no-notes">
          <h1>You have no notes</h1>
          <button 
              className="first-note" 
              onClick={createNewNote}
          >
              Create one now
          </button>
      </div>
}
    </main>
  );
}

export default App;
