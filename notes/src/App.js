import Sidebar from './components/Sidebar';
import Editor from './components/Editor'
import './App.css';
import { useState,useEffect } from 'react';
import nanoId from 'nano-id'
import Split from "react-split"

function App() {

  //states for notes
  const [notes,setNotes] = useState(JSON.parse(localStorage.getItem("notes"))||[])
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
    setNotes(oldNotes => {
      //create a new array
      const newArray = []
      //loop over array
      for(let i =0; i<oldNotes.length;i++){
        //if id of editing note matches id of old note
        if(oldNotes[i].id === currentNoteId){
        //put updated note at the beginning of the array
        newArray.unshift({...oldNotes[i],body:text})
        }
      //else push oldnotes down
      else{
        newArray.push(oldNotes[i])
      }
      }
      //return the new araay
      return newArray
    }
      
    )
    //this does not rearrange the notes
    // oldNotes.map(oldNote => {
    //   return oldNote.id ===currentNoteId ? {...oldNote, body:text} : oldNote
  }

  //saving notes into local storage. Use useEffect because we are going to manipulate the DOM which is out of the reach of react
  //for every change in notes, we save to local storage.
  useEffect(() =>{
    localStorage.setItem("notes",JSON.stringify(notes))
  },[notes])
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
