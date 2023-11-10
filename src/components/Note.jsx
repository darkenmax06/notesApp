import { Check, Edit } from "lucide-react"
import { parsedDate } from "../utils/parsedDate"
import "./note.css"

function Note ({content,colorData, noteId, createAt, deleteNote, editNote}) {
  const style = {background: colorData.code}

  const handleDelete = () => {
    console.log(noteId)
    deleteNote({noteId})
  }

  const handleEdit = ()=> {
    const noteInfo = {
      content, colorData, noteId, createAt
    }

    editNote({noteInfo})
  }

  const parsedContent = content.split("\n")
  const date = parsedDate(createAt)
  
  return (
    <li className="note" style={style} >
      <p className="note__content" >{
        parsedContent.map(res => <span className="note__line" key={res} >{res}</span>)
      }</p>
      <div className="note__info" >
        <span className="note__date" >{date}</span>
        <div className="note__actions">

          <button className="note__btn secondary" onClick={handleEdit} >
            <Edit strokeWidth={3} />
          </button>
          <button className="note__btn primary" onClick={handleDelete} >
            <Check strokeWidth={3} />
          </button>
        </div>
      </div>
    </li>
  )
}

export default Note