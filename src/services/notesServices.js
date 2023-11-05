import { noteAdapter } from "../adapters/notes"
import { addNote } from "./local/note"
let URI = "/api/notes"


function createNote (note,token){
  if (navigator.onLine){
    const options = {
      headers: {"content-type": "application/json", "authorization": `Bearer ${token}`},
      body: JSON.stringify(note),
      method: "POST"
    }

    return fetch(URI, options)
    .then(res => res.json())
    .then(res => noteAdapter(res))
  } 
  
  else {
    return addNote(note)
    .then(newNote => {
      console.log("nueva nota")
      console.log(newNote)
      return newNote
    })
  }
}

function getAllNotes (token){
  if (navigator.onLine){
    const options = {
      headers: {"authorization": `Bearer ${token}`}
    }
    return fetch(URI, options)
    .then(res => res.json())
    .then(res => noteAdapter(res))
  } 
  
  else {
    return addNote()
    .then(newNote => {
      console.log("nueva nota")
      console.log(newNote)
      return newNote
    })
  }
}


function updateNote ({content, noteId,token}){
  if (navigator.onLine){
    const options = {
      method : "PATCH",
      body: JSON.stringify({content}),
      headers: {"content-type": "application/json", "authorization": `Bearer ${token}`}
    }

    return fetch(`${URI}/${noteId}`, options)
    .then(res => res.json())
    .then(res => noteAdapter(res))
  }
}

function removeNote ({ noteId,token}){
  if (navigator.onLine){
    const options = {
      method : "DELETE",
      headers: {"authorization": `Bearer ${token}`}
    }

    return fetch(`${URI}/${noteId}`, options)
    .then(res => res.ok ? true :false)
    .then(res => res)
  }
}


export {
  createNote, getAllNotes, removeNote, updateNote
}

