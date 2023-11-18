import { AlertTriangle, X } from "lucide-react"
import "./formError.css"

function FormError  ({error,handleClose}) {
  return (
    <div className="form-error">
      <i className="form-error__icon">
        <AlertTriangle size={25} />
      </i>
      <p className="form-error">
        {error}
      </p>
      <i className="form-error__close" onClick={handleClose} >
        <X size={25} />
      </i>
    </div>
  )
}

export default FormError