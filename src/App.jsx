import { Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Redirect from "./components/navigations/Redirect"

const Login = lazy(() => import("./pages/Login"))
const Signin = lazy(() => import("./pages/Signin"))
const Notes = lazy(() => import("./pages/Notes"))

function App (){
  return (

    <Suspense fallback={'cargando...'}>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={
            <Login/>
        } />
        <Route path="/signin" element={<Signin/>} />
          <Route path="/notes" element={
            <Redirect>
              <Notes/>
            </Redirect>
          } />

      </Routes>
    </Suspense>
  )
}

export default App
