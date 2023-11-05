const IdbRequest = indexedDB.open("Notes",3) // -------> investigar para que es el 2do parametro de esto


// =============== EVENTOS DE LA DB ===================
// esto es de cuando se conecta
IdbRequest.addEventListener("success", () =>console.log("%c coneccion exitosa", "background: green; font-size: 20px; padding: 5px;"))

IdbRequest.addEventListener("upgradeneeded", () => {
  console.log("%c database conectada", "background: green; font-size: 20px; padding: 5px;")
  let db = IdbRequest.result
  db.createObjectStore("note",{
    autoIncrement: true // esto es de la id
  })
})

IdbRequest.addEventListener("error", () => console.log("%c database conectada", "background: red; font-size: 20px; padding: 5px;"))

// =========================== FUNCIONES DEL CRUD ===========================

async function addNote (note){
  let db = await IdbRequest.result // se espera el resultado de la coneccion de la db
  const trans = db.transaction("note", "readwrite")
  const objectStore = trans.objectStore("note")

  // se convierte en promesa para que espere el resultado
  // cuando se crea la nota no se crea con la id
  // se busca en la DB y se fltra (Es un proceso asyncrono)
  let returnedNote = new Promise((resolve) => {
    objectStore.add(note)

    trans.addEventListener("complete", () => {  // <=== este es el evento que se espera
      // este es el evento que confirma la creacion de la nota
      readNote()
      .then(notes => {
        console.log(notes.length)
        let noteToReturn = notes.find(value => note.content == value.content)
        resolve(noteToReturn)
      })
    })
  })

  return returnedNote
}

async function readNote (){
  let db = await IdbRequest.result // se espera la conneccion de la db
  const trans = db.transaction("note", "readonly")
  const objectStore = trans.objectStore("note")
  const cursor = objectStore.openCursor()

  // se crea una promesa para que espere a que se lean y se guarden los valores
  const notes = await new Promise( resolve => {
    let notes = []

    cursor.addEventListener("success", () =>{
      if (cursor.result){
        const note = {
          ...cursor.result.value,
          id: cursor.result.key
        }

        notes.push(note)
        cursor.result.continue()
      } 
      
      else{
        resolve(notes)
      }
    })
  })

  console.log(notes)

  return notes
}

function modifyNote (newValue){
  const trans = db.transaction("note", "readwrite")
  const objectStore = trans.objectStore("note")
  const {id, ...restOfNote} = newValue
  objectStore.put(restOfNote,id)
  // trans.addEventListener("success", e => {
  //   console.log("nota modificada")
  // })
}

function deleteNote ({key}){
  const trans = db.transaction("note", "readwrite")
  const objectStore = trans.objectStore("note")
  objectStore.delete(key)
  // trans.addEventListener("success", ()=>{
  //   console.log("nota eliminada")
  // })
}

export {
  addNote,
  deleteNote,
  modifyNote,
  readNote
}

