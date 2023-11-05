import { LogOut, Plus } from "lucide-react"
import { useRef } from "react"
import useUser from "../hooks/useUser"
import "./menu.css"


function Menu  ({children}) {
  const {logout} = useUser()
  const colorsRef = useRef()
  const btnRef = useRef()
  
  const handleShow = ()=>{
    if (colorsRef.current && btnRef.current){
      colorsRef.current.classList.toggle("active")
      btnRef.current.classList.toggle("active")
    }
  }

  return (
    <nav className="menu" >
      <div className="menu__create-container" >
        <button ref={btnRef}  className="menu__btn"  onClick={handleShow} >
          <Plus strokeWidth={3} />
        </button>
        <ul className="menu__colors" ref={colorsRef} >
          {children}
        </ul>
      </div>
      <button className="menu__logout" onClick={logout} >
        <LogOut/>
      </button>
    </nav>
  )
}

export default Menu