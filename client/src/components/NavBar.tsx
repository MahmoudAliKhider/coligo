import { FaHome, FaCalendar, FaBook, FaTable, FaChartBar, FaBullhorn } from 'react-icons/fa';

const Navbar = () => {
    return (
        <div className="bg-gray-800 p-6 shadow-md rounded w-80 h-screen items-center">

            <div className='  text-center '>
                <h2 className=' text-white font-bold text-xl sm:text-2xl mt-6' >Coligo</h2>
            </div>

            <ul className="text-white text-left mt-6 space-y-9 font-bold  sm:text-l ">
                <li className=" p-4 rounded transition duration-300  hover:bg-white hover:text-slate-500 text-center cursor-pointer">
                    <FaHome className="inline-block mr-3" size={23} />
                    Dashboard
                </li>

                <li className=" p-4 rounded transition duration-300  hover:bg-white hover:text-slate-500 text-center cursor-pointer">
                    <FaCalendar className="inline-block mr-3" size={23} />
                    Schedule
                </li>
                <li className=" p-4 rounded transition duration-300  hover:bg-white hover:text-slate-500 text-center cursor-pointer">
                    <FaBook className="inline-block mr-3" size={23} />
                    Courses
                </li>
                <li className=" p-4 rounded transition duration-300  hover:bg-white hover:text-slate-500 text-center cursor-pointer">
                    <FaTable className="inline-block mr-3" size={23} />
                    Gradebook
                </li>
                <li className=" p-4 rounded transition duration-300  hover:bg-white hover:text-slate-500 text-center cursor-pointer">
                    <FaChartBar className="inline-block mr-3" size={23} />
                    Performance
                </li>
                <li className=" p-4 rounded transition duration-300  hover:bg-white hover:text-slate-500 text-center cursor-pointer">
                    <FaBullhorn className="inline-block mr-3" size={23} />
                    Announcement
                </li>
            </ul>

        </div>
    );
};

export default Navbar;
