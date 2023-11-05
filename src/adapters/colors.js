


function colorsAdapter(data){
  if (data?.length){
    return data.map(color => ({
      name: color.nombre,
      code: color.codigo,
      id: color.id
    }))
  }

  return {
    name: data.nombre,
    code: data.codigo,
    id: data.id
  }
}


export { colorsAdapter }
