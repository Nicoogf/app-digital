"use client" 

import { Notificacion } from "@/components/Notificacion"
import { createContext , useState } from "react"

const defaultState = {
    open : false ,
    status :null ,
    msj: null
}

export const NotificationContext = createContext( {} )

export const NotificactionProvider = ({children}) => {
    const [notificacion,setNotificacion] = useState(defaultState)
    const showModification = (props) => {
        if(props){
        setNotificacion(props)

        setTimeout(() => {
            setNotificacion({open:false ,msj:null , status: null})
        }, 3000)
    }
  }
  return(
    <NotificationContext.Provider value={{...notificacion , showModification}}>
        {children}
        {<Notificacion status={notificacion.status} msj={notificacion.msj} /> }
    </NotificationContext.Provider>
  )
}

export default NotificationContext ;