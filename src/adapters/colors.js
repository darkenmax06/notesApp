


function colorsAdapter(data){
  if (data?.length){
    return data.map(color => ({
      name: color.nombre,
      code: color.codigo,
      id: color.colorId
    }))
  }

  return {
    name: data.nombre,
    code: data.codigo,
    id: data.colorId
  }
}


export { colorsAdapter }
