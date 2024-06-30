import Link from 'next/link'
import React from 'react'

const Footer = ({description,link,textLink}) => {
  return (
    <footer className='w-full flex mt-3'>
        <span className='text-[12px]'>
            {description}
        <Link href={link} className='font-bold ml-3'> 
            { textLink }
        </Link>
        </span>
    </footer>
  )
}

export default Footer