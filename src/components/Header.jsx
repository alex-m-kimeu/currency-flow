import { useState, useEffect } from 'react';
import logoLight from '../assets/logo-light.png';
import logoDark from '../assets/logo-dark.png';
import { FaSun } from "react-icons/fa";

export const Header = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const localData = localStorage.getItem("darkMode");
        return localData ? JSON.parse(localData) : false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <header className="bg-primary-light dark:bg-variant-dark pt-4 pb-2 px-[20px] md:px-[120px]">
            <div className='flex items-center justify-between'>
                <img src={darkMode ? logoLight : logoDark} alt="logo" className="h-10" />
                <div className='flex items-center'>
                    {darkMode ? (
                        <button
                            onClick={() => setDarkMode(false)}>
                            <FaSun
                                className="w-[25px] h-[25px] fill-primary-light hover:cursor-pointer"
                            />
                        </button>
                    ) : (
                        <button
                            onClick={() => setDarkMode(true)}>
                            <FaSun
                                className="w-[25px] h-[25px] fill-variant-dark hover:cursor-pointer"
                            />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};