import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/user/RootState";
import { FaSearch, FaEnvelope, FaBell } from 'react-icons/fa';
export const Header = () => {
    const { currentUser } = useSelector((state: RootState) => state.user);


    return (
        <header className="bg-slate-200 shadow-md rounded">
            <div className="flex justify-between max-w-6xl mx-auto p-3 ">
                <div className="text-left text-slate-800 font-bold text-l sm:text-xl mt-3">
                    <Link to="/">
                        {currentUser ? (
                            <h3 className="text-slate-700  hover:underline ">Welcome{currentUser.name}</h3>
                        ) : (
                            <li className="text-slate-700 hover:underline hidden sm:inline ">Welcome</li>
                        )}
                    </Link>
                </div>


                <div className="flex gap-4 text-slate-800 items-center">
                    <form className="bg-slate-100 p-3 rounded-full flex flex-wrap items-center">
                        <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-20 sm:w-56 " />
                        <div>
                            <FaSearch className="text-slate-600 " />
                        </div>

                    </form>
                    <FaBell className="text-slate-600" size={23}/>
                    <FaEnvelope className="text-slate-600" size={23}/>
                    <Link to={`/login`}>
                        {currentUser ? (
                            <img src={currentUser.avatar} className="rounded-full w-7 h-7 object-cover" alt="profile" />
                        ) : (
                            <div className="text-slate-700 hover:underline  font-bold">Sign In</div>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
};
