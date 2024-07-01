import React from 'react'
import styles from "./style.module.scss"
import Loader from './loader/Loader'


const SubmitButton = ({buttonText, isLoading}) => {
  return (
    <button className={styles.submitButton} type='submit' disabled={isLoading}>
        {isLoading ? <Loader /> : buttonText }
    </button>
  )
}

export default SubmitButton