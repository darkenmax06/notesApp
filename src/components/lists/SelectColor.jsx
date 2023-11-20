import { useRef } from "react"
import useColors from "../../hooks/useColors"
import "./selectColor.css"

function SelectColor  ({filterColor}) {
  const selectRef = useRef()
  const {colors} = useColors()

  function handleShow (){
    if (selectRef.current){
      selectRef.current.classList.toggle("active")
    }
  }

  function handleChangeColor ({color}){
    filterColor(color)
    document.querySelector(".current").style.background =  color
    selectRef.current.classList.remove("active")
  }

  return (
    <div className="select-color" >
      <div className="select-color__box first" onClick={handleShow}>
        <div className="select-color__color current" style={{"--color": "#fff"}} ></div>
        <p>filtrar por color</p>
      </div>

      <ul className="select-color__container" ref={selectRef} >
         <li className="select-color__box" onClick={()=> handleChangeColor({color: null})}  >
            <div className="select-color__color" style={{"--color": "white"}} ></div>
            <p>ninguno</p>
          </li>
        {colors && colors.map(color => (
          <li key={color.code} className="select-color__box" onClick={()=> handleChangeColor({color: color.code})} >
            <div className="select-color__color" style={{"--color": color.code}} ></div>
            <p> {color.name} </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SelectColor