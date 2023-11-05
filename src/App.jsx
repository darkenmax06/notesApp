import { Navigate, Route, Routes } from "react-router-dom"
import Redirect from "./components/Redirect"
import Login from "./pages/Login"
import Notes from "./pages/Notes"
import Signin from "./pages/Signin"

function App (){
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/notes" element={
        <Redirect>
          <Notes/>
        </Redirect>
      } />
    </Routes>
  )
}

export default App
