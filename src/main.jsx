import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import NoteContext from './context/NoteContext.jsx'
import UserContext from './context/UserContext.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContext>
    <NoteContext>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </NoteContext>
  </UserContext>,
)
