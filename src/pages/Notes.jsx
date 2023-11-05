import { useRef } from 'react'
import '../App.css'
import Color from '../components/Color'
import NotesContainer from '../components/NotesContainer'
import NoteModal from "../components/NotesModal"
import Menu from '../components/menu'
import "../services/local/note"

const colors = [
  {
    name: "rojo",
    code: "#FA9696",
    id: 1
  },  {
    name: "naranja-oscuro",
    code:   "#FABA96",
    id: 2
  },  {
    name: "naranja-claro",
    code:   "#FADE96",
    id: 3
  },  {
    name: "amarillo",
    code: "#F8FA96",
    id: 4
  },  {
    name: "verde-claro",
    code:"#DAFA96",
    id: 5
  },  {
    name: "verde-oscuro",
    code:  "#C2FA96",
    id: 6
  },  {
    name: "aqua",
    code: "#96FACA",
    id: 7
  },  {
    name: "azul-claro",
    code: "#96D6FA",
    id: 8
  },  {
    name: "azul-oscuro",
    code: "#96A6FA",
    id: 9
  },  {
    name: "purpura",
    code:  "#C296FA",
    id: 10
  },  {
    name: "lila",
    code:  "#EC96FA",
    id: 11
  }
]


function Notes() {
  const togableRef = useRef()
  const handleCreate = ({data})=> togableRef.current.changeVisibility({colorData: data})

  return (
    <section id="App">
      <Menu>{
        colors.map(
          data => <Color 
            key={data.code} 
            data={data}
            handleCreate={handleCreate}/>
        )
      }</Menu>
      <NotesContainer colors={colors} />
      <NoteModal ref={togableRef}/>
    </section>
  )
}

export default Notes