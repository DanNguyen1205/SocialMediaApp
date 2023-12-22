import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'


export const Navbar = () => {
  const [isOpen, setOpen] = useState(false)

  let links = [
    // {name:"Om Vina Systue", link:"/AboutUs"},
    {name:"Home", link:"/Ioniagram/"},
    {name:"Explore", link:"/Ioniagram/Explore"},
    {name:"Search", link:"/Ioniagram/Search"},
  ]

  return (  
    <>
      <header className='bg-teal-800 text-white'>
        <div className="flex justify-center items-center text-white">
          <div className="flex flex-row-reverse h-full">
            <a href="/">
              <img src="" className='mt-3 h-32' />
            </a>
          </div>
          <div className='md:hidden'>
            <button onClick={() => {setOpen(!isOpen)}} style={{ height: "1.5rem", width: "1.5rem" }}>
            {isOpen ? <FontAwesomeIcon icon={faX}  style={{ width: "75%", height: "75%", color: "#b2b2b2", }} />
            : <FontAwesomeIcon icon={faBars} style={{ width: "100%", height: "100%", color: "#b2b2b2", }} />}
            </button>
          </div>

          <ul id='md-links' className='hidden md:flex sm:space-x-8'>
            {
            links.map((link) => (
              <li>
                <a href={link.link}>{link.name}</a>
              </li>
            ))
            }
          </ul>


        </div>

        {/* Lazy hamburger menu because we have double the links could use a better implementation */}
        {isOpen &&
          <ul id='hamburger-links' className='flex-col ml-6 pb-6'>
            {
            links.map((link) => (
              <li className='mt-1 px-2 py-1 rounded hover:bg-teal-700'>
                <a className='' href={link.link}>{link.name}</a>
              </li>
            ))
            }
          </ul>}
      </header>

    </>

  
  )
}

export default Navbar