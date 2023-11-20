import { useContext, useEffect } from 'react'
import { colorContext } from '../context/ColorContext'
import { getAll } from '../services/colorsService'


export default function useColors() {
  const {colors,changeColors} = useContext(colorContext)

  useEffect(()=>{
    if (!colors){

    getAll()
    .then(res => changeColors(res))
    }
  },[])
  return {colors}
}