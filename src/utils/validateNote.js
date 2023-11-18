

function validateNote (note){
  if (!note.content) return {error : "Las notas deben tener algo escrito"}
  return null
}

export { validateNote }
