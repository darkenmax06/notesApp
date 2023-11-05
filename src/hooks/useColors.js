import { useEffect, useState } from 'react'
import { getAll } from '../services/colorsService'


export default function useColors() {
  const [colors,setColors] = useState(null)

  useEffect(()=>{
    getAll()
    .then(res => setColors(res))
  },[])
  return {colors}
}