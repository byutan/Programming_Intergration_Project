import HomePage from '../assets/home_page.png'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate('/signin');
    };

    return (
        <div className='w-full bg-black text-white h-16 flex items-center justify-between px-6 font-merriweather'>
            <div>
                <Link to='/homepage'>
                    <img src={HomePage} alt='Logo' className='h-10 w-10 rounded-full object-cover' />
                </Link>
            </div>
            <div className='flex items-center gap-x-4'>
                {isLoggedIn ? (
                    <>
                        <Link to='/profile'>
                            <button className='bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition duration-200'>
                                Hồ sơ
                            </button>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200'
                        >
                            Đăng xuất
                        </button>
                    </>
                ) : (
                    <>
                        <Link to='/signin'>
                            <button className='bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition duration-200'>
                                Đăng nhập
                            </button>
                        </Link>
                        <Link to='/signup'>
                            <button className='bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition duration-200'>
                                Đăng ký
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
