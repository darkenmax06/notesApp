import loginService from "../services/loginServices"

import { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { userContext } from '../context/UserContext'
import { createUser } from "../services/usersServices"

export default function useUser () {
  const {user, loginUser,logoutUser} = useContext(userContext)
  const [error,setError] = useState(null)
  const [token,setToken] = useState(user?.token)
  const navigate = useNavigate()

  const clearError = ()=> setError(null)

  const login = ({gmail, password}) => {

    if (!password) return setError("Debes proporcionar tu contraceña para poder loguearte") 
    else if (password.length < 8 || password.length > 50 ) return setError("Las contraceñas deben ser de como minimo 8 caracteres y maximo 50 caracteres")
    else if (password.includes(" ") ) return setError("Las contraceñas no pueden contener espacios")

    else if (!gmail) return setError("Debes proporcionar un gmail para poder loguearte")
    else if (gmail.length < 15 || gmail.length > 64 ) return  setError("El gmail debe poseer un minimo de 15 caracteres y un maximo de 64 caracteres.")
    else if (!gmail.includes("@")) return setError("El correo debe poseer un @")
    else if (gmail.includes(" ")) return setError("El correo no debe contener espacios")

    console.log("A")
    loginService.login({gmail,password})
    .then(res => {
      console.log(res)
      loginUser(res)
      navigate("/notes")
    })
    .catch(err => setError(err))
  }

  const logout = ()=>{
    logoutUser()
  }

  const createAccount = ({gmail,password,name,confirmPassword}) => {

    if (!password) return setError("Debes proporcionar tu contraceña para poder loguearte") 
    else if (password !== confirmPassword) return setError("las contraseñas no coinciden")
    else if (password.length < 8 || password.length > 50 ) return setError("Las contraceñas deben ser de como minimo 8 caracteres y maximo 50 caracteres")
    else if (password.includes(" ") ) return setError("Las contraceñas no pueden contener espacios")

    else if (!gmail) return setError("Debes proporcionar un gmail para poder loguearte")
    else if (gmail.length < 15 || gmail.length > 64 ) return  setError("El gmail debe poseer un minimo de 15 caracteres y un maximo de 64 caracteres.")
    else if (!gmail.includes("@")) return setError("El correo debe poseer un @")
    else if (gmail.includes(" ")) return setError("El correo no debe contener espacios")

    else if(name.length < 2 || name.length > 256) return setError("los nombres deben ser mayores a 2 carateres y menorea a 256 caracteres")

    createUser({name,password,gmail})
    .then(res =>{
      loginUser(res)
      navigate("/notes")
    })
    .catch(err => setError(err))
  }
  
  return {
    user,
    error,
    clearError,
    login,
    logout,
    token,
    createAccount
  }
}