import { Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import useNotes from "../hooks/useNotes"
import Note from "./Note"
import NotesModal from "./NotesModal"
import SelectColor from "./SelectColor"
import "./notesContainer.css"

function NotesContainer({colors}) {
  const noteModalRef = useRef()
  const [search,setSearch] = useState("")
  const {notes, getNotes, deleteNote, filterColor} = useNotes(search)

  useEffect(()=>{
    getNotes()
  },[])

  const handleChange = e => setSearch(e.target.value)

  const toggleEditModal = ({noteInfo})=>{
    noteModalRef.current.changeVisibility({noteInfo})
  }

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
          <SelectColor colors={colors} filterColor={filterColor} />
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
        <NotesModal ref={noteModalRef} />
    </section>
  )
}

export default NotesContainer