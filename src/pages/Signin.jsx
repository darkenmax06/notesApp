import { LockKeyhole, Mail, User } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import ColorCicle from "../components/ColorCicle"
import FormError from "../components/FormError"
import useColors from "../hooks/useColors"
import useUser from "../hooks/useUser"
import "./signin.css"

function Signin  () {
  const [user,setUser] = useState({
    name: "",
    gmail: "",
    password: "",
    confirmPassword: ""
  })
  const {colors} = useColors()
  const {error,clearError,createAccount} = useUser()

  const handleChange = e => {
    setUser(prevUser => ({
      ...prevUser,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    
    const {gmail,password, confirmPassword, name } = user

    const passwordToSend = password.trim()
    const gmailToSend = gmail.trim()
    const confirmPasswordToSend = confirmPassword.trim()
    const nameToSend = name.trim()

    createAccount({
      gmail: gmailToSend,
      password: passwordToSend,
      name: nameToSend,
      confirmPassword: confirmPasswordToSend
    }) 
  }

  const changeBackground = (color) => {
    document.querySelector(".signin").style.background = color
  }

  return (
    <section className="signin">
      <form className="signin__form" onSubmit={handleSubmit}>
        <h2 className="signin__title"> Crear una cuenta </h2>

        <p className="signin__slogan" >
          Create una cuenta en la aplicacion web de notas divertida del navegador.
        </p>

        <div className="signin__inputs">
        <div className="signin__input-container">
            <User size={30} />
            <input 
              type="text" 
              placeholder="nombre" 
              className="signin__input"
              value={user.name} 
              name="name"
              onChange={handleChange} />
          </div>

          <div className="signin__input-container">
            <Mail size={30} />
            <input 
              type="email" 
              placeholder="gmail" 
              className="signin__input"
              value={user.gmail} 
              name="gmail"
              onChange={handleChange} />
          </div>

          <div className="signin__input-container">
            <LockKeyhole size={30} />
            <input 
              type="password"  
              placeholder="contraseña" 
              className="signin__input"
              value={user.password}
              name="password"
              onChange={handleChange} />
          </div>

          <div className="signin__input-container">
            <LockKeyhole size={30} />
            <input 
              type="password"  
              placeholder="confirmar contraseña" 
              className="signin__input"
              value={user.confirmPassword}
              name="confirmPassword"
              onChange={handleChange} />
          </div>
        </div>

        {error && <FormError error={error} handleClose={clearError} />}

        <span className="signin__signin" >¿Ya tienes una cuenta?, <NavLink to="/login" >Inicia sesion</NavLink></span>

        <button className="signin__button">Crear cuenta</button>
      </form>

      {colors != null &&
        <ul className="colors" >
          {colors.map(color => 
            <ColorCicle 
              key={color.id} 
              handleClick={changeBackground} 
              color={color}
            />)}
        </ul>
      }
    </section>
  )
}

export default Signin