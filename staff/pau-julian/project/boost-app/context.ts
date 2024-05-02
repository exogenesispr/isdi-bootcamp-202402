import { createContext, useContext as useReactContext } from 'react'
//@ts-ignore
export const Context = createContext()

export const useContext = () => useReactContext(Context)