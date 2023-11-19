import { useContext, useMemo, useState } from 'react'
import { noteContext } from '../context/NoteContext'
import { createNote as Cnote, getAllNotes, removeNote as rm, updateNote } from "../services/notesServices"
import { validateNote } from '../utils/validateNote'
import useUser from './useUser'

export default function useNotes (search) {
  // este es para filtrar las notas
  const [color,setColor] = useState(null)
  const [error,setError] = useState(null)
  const {notes, addNote, removeNote, changeNote, setNotes} = useContext(noteContext)
  const {token} = useUser()

  const getNotes = async ()=>{
    getAllNotes(token)
    .then(res => {
      setNotes(res)
    }).catch(err => console.log(err))
  }

  const clearError = () => setError(null)

  const createNote = ({content, createAt, colorData})=>{
    const validation = validateNote({content})

    if (validation){
      setError(validation.error)
      return "a"
    }

    const newNote = {
      content,
      createAt,
      colorData
    }

    Cnote(newNote,token)
    .then(res => {
      addNote(res)
    })
    .catch(err => {
      setError(err)
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
    filterColor,
    error,
    clearError
  }
}