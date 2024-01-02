import React from 'react'
import IoniaIcon from "../images/Ionia_Crest_icon.webp"
import { faImage, faUser, faMessage, faBookmark, faMagnifyingGlass, faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'


export const leftSidebarOptions = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate("/Ioniagram/Login")
    }

    return (
        <>
            <div className='flex flex-col gap-3 items-end bg-gray-900'>

                <div className='mr-10 mt-5 hover:bg-gray-800' style={{ borderRadius: "50%", width: "50px", height: "50px" }}>
                    <button onClick={() => { navigate("/Ioniagram") }}>
                        <img src={IoniaIcon} className='' alt="" />
                    </button>
                </div>

                <div className='mr-10 flex justify-center items-center hover:bg-gray-800' style={{ borderRadius: "50%", width: "40px", height: "40px" }}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ width: "full", color: "#71f2a8" }} />
                </div>

                <div style={{ borderRadius: "50%", width: "40px", height: "40px" }} className='md:w-1/2 mr-10 flex justify-center items-center hover:bg-gray-800'>
                    <FontAwesomeIcon icon={faMessage} style={{ width: "full", color: "#71f2a8" }} />
                </div>

                <div className='mr-10 flex justify-center items-center hover:bg-gray-800' style={{ borderRadius: "50%", width: "40px", height: "40px" }}>
                    <FontAwesomeIcon icon={faBookmark} style={{ width: "full", color: "#71f2a8" }} />
                </div>

                <div className='mr-10 flex justify-center items-center hover:bg-gray-800' style={{ borderRadius: "50%", width: "40px", height: "40px" }}>
                    <FontAwesomeIcon icon={faUser} style={{ width: "full", color: "#71f2a8" }} />
                </div>

                <button onClick={handleLogout} className="mr-1 md:mr-10 bg-[#cdd9ed] hover:bg-[#a1b0c9] font-bold py-2 px-4 rounded">
                    Logout
                </button>

            </div>
        </>
    )
}

export default leftSidebarOptions