import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import useNotes from "../../hooks/useNotes"
import NotesModal from "../forms/NotesModal"
import Note from "./Note"
import SelectColor from "./SelectColor"
import "./notesContainer.css"

function NotesContainer() {
  const [search,setSearch] = useState("")
  const {notes, getNotes, deleteNote, filterColor} = useNotes(search)
  const [noteData,setNoteData] = useState(null)

  useEffect(()=>{
    getNotes()
  },[])

  const handleChange = e => setSearch(e.target.value)
  const toggleEditModal = ({noteInfo})=> setNoteData(noteInfo)
  const handleClose = () => setNoteData(null)

  return (
    <section className="notes">
      <h1 className="notes__title" >Notes App</h1>

      <div className="notes__search-box">
        <div className="notes__input">
          <Search/>
          <input 
            type="text"   
            placeholder="buscar"
            value={search}
            onChange={handleChange} />
        </div>
          <SelectColor filterColor={filterColor} />
      </div>

      <div className="notes__container">
      {
        notes?.length > 0 && notes.map(
          ({noteId,content,colorData, createAt}) => 
            <Note  
              key={noteId}
              noteId={noteId}
              content={content} 
              createAt={createAt}
              colorData={colorData}
              editNote={toggleEditModal}
              deleteNote={deleteNote}/>
        )
        }
      </div>
        {notes?.length < 1 && "No hay notas que mostrar"}
        {notes === null && "cargando..."}
        {noteData && <NotesModal noteData={noteData} handleClose={handleClose} />}
    </section>
  )
}

export default NotesContainer