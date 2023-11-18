import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { createPortal } from "react-dom"
import useNotes from "../../hooks/useNotes"
import FormError from '../errors/FormError'
import "./notesModal.css"

const NoteModal =  (_, ref) => {
  const [visibility,setVisibility] = useState(false)
  const [color,setColor] = useState("none")
  const [value,setValue] = useState("")
  const {createNote,editNote,error, clearError} = useNotes()
  const limit = useRef(300)
  const [noteInfo,setNoteInfo] = useState(null)

  const elementVisibility = {display: visibility ? "grid" : "none"}
  const modalColor = {background: color != null ?color.code: "none" }

  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const  changeVisibility = (data) => {
    console.log(data)
    clearError()
    if (data){
      if (data?.noteInfo == null) setColor(data.colorData)
      else {
    console.log(data.noteInfo)
        setNoteInfo(data.noteInfo)
        setColor(data.noteInfo.colorData)
        setValue(data.noteInfo.content)
      }
    }

    setVisibility(!visibility)
  }

  useImperativeHandle(ref, ()=>{
    return {
      changeVisibility
    }
  })

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

    changeVisibility(null)
    setValue("")
    setNoteInfo(null)
    setColor(null)
  }

  const handleChange = (e) => {
    const {value} = e.target
    if (value.length > limit.current) return null
    setValue(value)
  }

  return createPortal(
    <div style={elementVisibility} className="modal" >
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
          <span onClick={changeVisibility} className="modal__button secondary" >
            Cancelar
          </span>
        </div>

      </form>
    </div>,
   document.body
  )
}

export default forwardRef(
  NoteModal
) 