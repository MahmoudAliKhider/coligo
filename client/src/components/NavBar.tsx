import { FaHome, FaCalendar, FaBook, FaTable, FaChartBar, FaBullhorn } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useState } from 'react';

type NavbarItem = 'Dashboard' | 'Schedule' | 'Courses' | 'Gradebook' | 'Performance' | 'Announcement';

const Navbar = () => {
    const [selectedItem, setSelectedItem] = useState<NavbarItem>();
    const handleItemClick = (item: NavbarItem) => {
        setSelectedItem(item);
    };

    return (
        <div className="bg-gray-800 p-6  shadow-md rounded w-60  items-center h-full relative z-10 bottom-24">

            <div className='  text-center sm:text-xl'>
                <h2 className=' text-white font-bold text-xl sm:text-2xl mt-6' >Coligo</h2>
            </div>

            <ul className="text-white text-left mt-14  font-bold  sm:text-l ">
               
                <Link to='/dashboard'>
                    <li
                        className={`p-4 mb-5 rounded transition duration-300 hover:bg-white hover:text-slate-500  cursor-pointer ${selectedItem === 'Dashboard' ? 'border bg-white text-slate-600 ' : ''
                            }`}
                        onClick={() => handleItemClick('Dashboard')}
                    >
                        <FaHome className="inline-block mr-6" size={23} />
                        Dashboard
                    </li>
                </Link>


                <Link to='/schedule'>
                    <li
                        className={`p-4 mb-5 rounded transition duration-300 hover:bg-white hover:text-slate-500  cursor-pointer ${selectedItem === 'Schedule' ? 'border bg-white text-slate-600' : ''
                            }`}
                        onClick={() => handleItemClick('Schedule')}
                    >
                        <FaCalendar className="inline-block mr-6" size={23} />
                        Schedule
                    </li>
                </Link>

                {/* <Link to='/courses'> */}
                    <li
                        className={`p-4 mb-5 rounded transition duration-300 hover:bg-white hover:text-slate-500  cursor-pointer ${selectedItem === 'Courses' ? 'border bg-white text-slate-600' : ''
                            }`}
                        onClick={() => handleItemClick('Courses')}
                    >
                        <FaBook className="inline-block mr-7" size={23} />
                        Courses
                    </li>
                {/* </Link> */}

                {/* <Link to='/gradebook'> */}
                    <li
                        className={`p-4 mb-5 rounded transition duration-300 hover:bg-white hover:text-slate-500  cursor-pointer ${selectedItem === 'Gradebook' ? 'border bg-white text-slate-600' : ''
                            }`}
                        onClick={() => handleItemClick('Gradebook')}
                    >
                        <FaTable className="inline-block mr-6" size={23} />
                        Gradebook
                    </li>
                {/* </Link> */}

                {/* <Link to='/performance'> */}
                    <li
                        className={`p-4 mb-5 rounded transition duration-300 hover:bg-white hover:text-slate-500  cursor-pointer ${selectedItem === 'Performance' ? 'border bg-white text-slate-600' : ''
                            }`}
                        onClick={() => handleItemClick('Performance')}
                    >
                        <FaChartBar className="inline-block mr-6" size={23} />
                        Performance
                    </li>
                {/* </Link> */}

                <Link to='/announcement'>
                    <li
                        className={`p-4 mb-5 rounded transition duration-300 hover:bg-white hover:text-slate-500  cursor-pointer ${selectedItem === 'Announcement' ? 'border bg-white text-slate-600' : ''
                            }`}
                        onClick={() => handleItemClick('Announcement')}
                    >
                        <FaBullhorn className="inline-block mr-5" size={23} />
                        Announcement
                    </li>
                </Link>

            </ul>

        </div>
    );
};

export default Navbar