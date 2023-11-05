import { LockKeyhole, Mail } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import ColorCicle from "../components/ColorCicle"
import FormError from "../components/FormError"
import useColors from "../hooks/useColors"
import useUser from "../hooks/useUser"
import "./login.css"

function Login  () {
  const [user,setUser] = useState({
    gmail: "",
    password: ""
  })
  const {colors} = useColors()
  const {error,clearError,login} = useUser()

  const handleChange = e => {
    setUser(prevUser => ({
      ...prevUser,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    
    const {gmail,password } = user

    const passwordToSend = password.trim()
    const gmailToSend = gmail.trim()

    login({
      gmail: gmailToSend,
      password: passwordToSend
    }) 
  }

  const changeBackground = (color) => {
    document.querySelector(".login").style.background = color
  }

  return (
    <section className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title"> Iniciar sesion </h2>

        <div className="login__inputs">
          <div className="login__input-container">
            <Mail size={30} />
            <input 
              type="email" 
              placeholder="gmail" 
              className="login__input"
              value={user.gmail} 
              name="gmail"
              onChange={handleChange} />
          </div>

          <div className="login__input-container">
            <LockKeyhole size={30} />
            <input 
              type="password"  
              placeholder="contraseña" 
              className="login__input"
              value={user.password}
              name="password"
              onChange={handleChange} />
          </div>
        </div>

        {error && <FormError error={error} handleClose={clearError} />}

        <span className="login__signin" >¿No tienes una cuenta?, <NavLink to="/signin" >Crea una</NavLink></span>

        <button className="login__button">iniciar sesion</button>
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

export default Login