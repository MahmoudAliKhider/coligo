import { FaHome, FaCalendar, FaBook, FaTable, FaChartBar, FaBullhorn } from 'react-icons/fa';
import { Link } from "react-router-dom";

 const Navbar = () => {
    return (
        <div className="bg-gray-800 p-6  shadow-md rounded w-60 h-screen items-center relative z-10 bottom-20">

            <div className='  text-center sm:text-xl'>
                <h2 className=' text-white font-bold text-xl sm:text-2xl mt-6' >Coligo</h2>
            </div>

            <ul className="text-white text-left mt-11 space-y-9 font-bold  sm:text-l ">
                <Link to='/dashboard'>
                <li className=" p-4 rounded transition duration-300  hover:bg-white hover:text-slate-500  cursor-pointer">
                    <FaHome className="inline-block mr-6 " size={23} />
                    Dashboard
                </li>
                </Link>
               

                <li className=" p-4 rounded transition duration-300  hover:bg-white hover:text-slate-500  cursor-pointer">
                    <FaCalendar className="inline-block mr-6" size={23} />
                    Schedule
                </li>
                <li className=" p-4 rounded transition duration-300  hover:bg-white hover:text-slate-500  cursor-pointer">
                    <FaBook className="inline-block mr-7" size={23} />
                    Courses
                </li>
                <li className=" p-4 rounded transition duration-300  hover:bg-white hover:text-slate-500  cursor-pointer">
                    <FaTable className="inline-block mr-6" size={23} />
                    Gradebook
                </li>
                <li className=" p-4 rounded transition duration-300  hover:bg-white hover:text-slate-500  cursor-pointer">
                    <FaChartBar className="inline-block mr-6" size={23} />
                    Performance
                </li>
                <li className=" p-4 rounded transition duration-300  hover:bg-white hover:text-slate-500  cursor-pointer">
                    <FaBullhorn className="inline-block mr-5" size={23} />
                    Announcement
                </li>
            </ul>

        </div>
    );
};

export default Navbar