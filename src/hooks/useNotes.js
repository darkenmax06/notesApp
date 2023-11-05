import { useContext, useMemo, useState } from 'react'
import { noteContext } from '../context/NoteContext'
import { createNote as Cnote, getAllNotes, removeNote as rm, updateNote } from "../services/notesServices"
import useUser from './useUser'

export default function useNotes (search) {
  const [color,setColor] = useState(null)
  const {notes, addNote, removeNote, changeNote, setNotes} = useContext(noteContext)
  const {token} = useUser()

  const getNotes = async ()=>{
    getAllNotes(token)
    .then(res => {
      console.log(res)
      setNotes(res)
    }).catch(err => console.log(err))
  }

  const createNote = ({content, createAt, colorData})=>{
    const newNote = {
      content,
      createAt,
      colorData
    }

    Cnote(newNote,token)
    .then(res => {
      console.log("nota creada!!!!!!!")
      console.log(res)
      addNote(res)
    })
    .catch(err => {
      console.error(err)
    })

  }

  const deleteNote = ({noteId})=>{
    rm({noteId,token})
    .then(() => removeNote(noteId))
    .catch(err  => console.log(err))
  }

  const editNote = ({newValue}) =>{
    updateNote({
      content: newValue.content,
      noteId: newValue.noteId,
      token
    })
    .then(res => {
      changeNote(res)
    })
    .catch(err => console.log(err))
  }

  const filterColor = (color)=>{
    console.log(color)
    setColor(color)
  }

  const filterByColor = useMemo(()=>{
    if (color != null){
      return [...notes].filter(note => note.colorData.code == color)
    } return notes
  },[color,notes])

  const filterNotes = useMemo(()=>{
    if (search && search.length > 0){
      return filterByColor.filter(note=> note.content.includes(search))
    } return filterByColor
  }, [search,filterByColor])

  return {
    notes: filterNotes,
    createNote,
    deleteNote,
    editNote,
    getNotes,
    filterColor
  }
}