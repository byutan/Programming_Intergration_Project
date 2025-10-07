import HomePage from '../assets/home_page.png'
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className='w-full bg-black text-white h-16 flex items-center justify-between px-6 font-merriweather'>
            <div>
                <Link to='/homepage'>
                    <img src={HomePage} alt='Logo' className='h-10 w-10 rounded-full object-cover' />
                </Link>
            </div>
            <div className='flex items-center gap-x-4'>
                <Link to='/signin'>
                <button className='bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition duration-200 '>Đăng nhập</button>
                </Link>
                <Link to='/signup'>
                <button className='bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition duration-200'>Đăng ký </button>
                </Link>
            </div>
        </div>
    )
};

