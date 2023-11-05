

function noteAdapter (notes) {

  if (notes.length !== undefined){
    const newNotes = notes.map(note => {
      return {
        noteId: note.noteId,
        content: note.content,
        createAt: note.createAt,
        colorData:{
          code: note.codigo,
          name: note.nombre,
          id: note.colorId
        }
      }
    })
  
    return newNotes
  }


  const newNote = {
    noteId: notes.noteId,
    content: notes.content,
    createAt: notes.createAt,
    colorData:{
      code: notes.codigo,
      name: notes.nombre,
      id: notes.colorId
    }
  }

  return newNote

}

export { noteAdapter }
