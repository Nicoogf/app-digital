"use client"

import { useContext } from "react"
import PropTypes from 'prop-types';
import { FormContext } from ".."
import styles from "./style.module.scss"


const Input = ({ label, name, placeholder = "", type = "text" }) => {
    const { formValue = {}, setFormValues } = useContext(FormContext)

    const handleChange = ({ target: { value } }) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }))
    }

    if (!setFormValues) {
        console.error("FormContext is not available")
        return null
    }

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={formValue[name] || ''}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input

Input.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string
}