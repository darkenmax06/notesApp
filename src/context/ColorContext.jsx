import { createContext, useState } from "react";


export const colorContext = createContext()

function ColorProvider ({children}){
  const [colors,setColors] = useState(null)

  const changeColors = colors => setColors(colors)
  return (
    <colorContext.Provider value={{
      colors,changeColors
    }} >
    {children}
    </colorContext.Provider>
  )
}

export default ColorProvider