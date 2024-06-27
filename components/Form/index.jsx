"use client"
import React, { createContext, useState } from 'react'
import styles from "./style.module.scss"

export const FormContext = createContext()


export function Form({title,children,onSumbit,description}){
    const [formValues, setFormValues ]= useState({})
    const handleSubmit = (e) => {
        e.preventDefault()
        onSumbit(formValues)
    }
    return(
        <FormContext.Provider value={{formValues,setFormValues}}>
            <form className={styles.form} onSumbit={handleSubmit}>
                <div className={styles.descriptionContainer}>
                    <h2> {title} </h2>
                    {description && <p> {description} </p>}
                </div>
                {children}
            </form>
        </FormContext.Provider>
    )
}

Form.input = Input