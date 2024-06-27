"use client"

import { useContext } from "react"
import { FormContext } from ".."
import styles from "./style.module.scss"

export function Input({label,name,placeholder,type}){
    const {formValue,setFormValues} = useContext(FormContext)
    const handleChange = (e) => {
        const { value } = e.target
        setFormValues(prevValues => ({
            ...prevValues,
            [name] : value
        }))
    }
    return(
        <div>
            <label> { label } </label>
            <input type={type} id={name} name={name} value={formValue[name]} onChange={handleChange} placeholder={placeholder}/> 
        </div>
    )
}