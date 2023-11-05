import { createContext, useState } from "react";


export const userContext = createContext()

function UserContext ({children}){
  const localUser =  localStorage.getItem("user") 
  const [user,setUser] = useState(()=> localUser ? JSON.parse(localUser) : null)

  const loginUser = (user) =>{
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  const logoutUser = () =>{
    setUser(null)
    localStorage.setItem("user", null)
  }

  return (
    <userContext.Provider value={{
      user,
      loginUser,
      logoutUser
    }}>
      {children}
    </userContext.Provider>
  )
}

export default UserContext