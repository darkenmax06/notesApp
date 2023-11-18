import "./colorCicle.css"

function ColorCicle  ({handleClick,color}) {
  return (
    <li 
      onClick={ ()=> handleClick( {color} ) } 
      className="color" 
      style={{"--color": color.code}}
      title={color.name}
    ></li>
  )
}

export default ColorCicle