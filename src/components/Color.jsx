
function Color ({data, handleCreate}){
  return (
    <li 
      className="menu__color" 
      style={{"--color": data.code }} 
      onClick={()=> handleCreate({data})}
      title={data.name}
    ></li>
  )
}

export default Color