import { colorsAdapter } from "../adapters/colors"

const URI = "/api/colors"

function getAll (){
  return fetch(URI)
  .then(res => res.json())
  .then(res => colorsAdapter(res))
}

export { getAll }
