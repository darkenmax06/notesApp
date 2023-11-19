import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import useNotes from "../../hooks/useNotes"
import FormError from '../errors/FormError'
import "./notesModal.css"

const NoteModal =  ({colorData, noteData, handleClose}) => {
  const [color,setColor] = useState(noteData?.colorData || colorData)
  const [value,setValue] = useState(noteData?.content || "")
  const {createNote,editNote,error, clearError} = useNotes()
  const limit = useRef(300)
  const [noteInfo,setNoteInfo] = useState(noteData)
  console.log(noteInfo)

  const modalColor = {background: color != null ?color.code: "none" }

  const date = new Date().toLocaleDateString()

  const handleSubmit = event => {
    event.preventDefault()
    const newNote =  {
      content: value,
      createAt: date,
      colorData: color,
      noteId: noteInfo?.noteId 
    }

    if(noteInfo == null) {
      const isCreated = createNote(newNote)
      if (isCreated) return 
    }
    else editNote({newValue: newNote})

    setValue("")
    setNoteInfo(null)
    setColor(null)
    handleClose()
  }

  const handleChange = (e) => {
    const {value} = e.target
    if (value.length > limit.current) return null
    setValue(value)
  }

  return (
    <div  className="modal" >
    <form className="modal__box" style={modalColor} onSubmit={handleSubmit} >
      <textarea 
        className="modal__input" 
        autoFocus 
        value={value}
        onChange={handleChange}
        maxLength={limit.current}></textarea>

      <div className="modal__dates">
        <span>{noteInfo?.createAt ?? date}</span>
        <span className="modal__length" >{value.length}/{limit.current}</span>
      </div>

      {error && <FormError error={error} handleClose={clearError} />}

      <div className="modal__actions">
        <button className="modal__button principal" >{ noteInfo ? "editar": "crear"}</button>
        <span onClick={handleClose} className="modal__button secondary" >
          Cancelar
        </span>
      </div>

    </form>
  </div>
  )
}

export default createPortal(
  NoteModal,
  document.body
 )