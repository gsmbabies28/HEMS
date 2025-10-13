import React from 'react'
import { Power, PowerOff } from 'lucide-react';
import { useState } from 'react';


const ToggleSwitch = ({setIsOff, isOff}) => {
    

    const toggleSwitch = () => {
        setIsOff(prev => !prev);
    };

  return (
    <div
        onClick={toggleSwitch}
        className="w-3 h-20 bg-gray-400 rounded-full cursor-pointer flex flex-col items-center py-1 transition-colors duration-300 fixed bottom-4 left-1/2 transform -translate-x-1/2 relative mt-5"
        >
        <div
            className={`w-[30px] h-[30px] bg-white rounded-full absolute transition-all duration-300 flex items-center justify-center
            ${isOff ? 'bottom-[5px]' : 'top-[5px]'}`}
        >
            {isOff ? <PowerOff size={18} color="#facc15" /> : <Power size={18} color="#64748b" />}
        </div>
        </div>

  )
}

export default ToggleSwitch