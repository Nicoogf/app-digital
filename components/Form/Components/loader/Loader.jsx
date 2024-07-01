import React from 'react'
import style from "./styles.modules.scss"

const Loader = ({size = 25 }) => {
  return (
    <div style={{with:size, height : size }} clasName={style.spinner}/>
  )
}

export default Loader