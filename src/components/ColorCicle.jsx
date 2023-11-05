import "./colorCicle.css"

function ColorCicle  ({handleClick,color}) {
  return (
    <li 
      onClick={()=> handleClick(color.code)} 
      className="color" 
      style={{"--color": color.code}}
    ></li>
  )
}

export default ColorCicle