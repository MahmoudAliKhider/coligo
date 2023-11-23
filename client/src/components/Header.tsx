import { Link } from "react-router-dom";
import { RootState } from "../Redux/user/RootState";
import { FaSearch, FaEnvelope, FaBell } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUserStart, signOutUserSuccess, signOutUserFailure } from "../Redux/user/userSlice";

export const Header = () => {
    const { currentUser } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch('/api/auth/signout');
            const data = await res.json();
            if (data.success === false) {
                dispatch(signOutUserFailure(data.message));
                return;
            }
            dispatch(signOutUserSuccess(data));
        } catch (error) {
            dispatch(signOutUserFailure(error));
        }
    };

    return (
        <header className="bg-slate-200 shadow-md rounded  ">
            <div className="flex justify-between max-w-6xl mx-auto p-3 ">
                <div className=" text-slate-800 font-bold text-l sm:text-xl mt-4 ml-28">

                    {currentUser ? (
                        <h1 className="font-bold text-l sm:text-xl flex flex-wrap ">
                            <span className="text-slate-500 ">Welcome</span>

                            <span className="text-slate-700 ml-3">{currentUser.name}</span>
                        </h1>
                    ) : (
                        <li className="text-slate-700 hover:underline hidden sm:inline ">Welcome</li>
                    )}
                </div>

                <div className="flex gap-4 text-slate-800 items-center">
                    <form className="bg-slate-100 p-3 rounded-full flex flex-wrap items-center">
                        <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-20 sm:w-56 " />
                        <div>
                            <FaSearch className="text-slate-600 " />
                        </div>

                    </form>
                    <FaBell className="text-slate-600" size={23} />
                    <FaEnvelope className="text-slate-600" size={23} />
                    <Link to={`/login`}>
                        {currentUser ? (
                            <img onClick={handleSignOut} src={currentUser.avatar} className="rounded-full w-7 h-7 object-cover" alt="profile" />
                        ) : (
                            <div className="text-slate-700 hover:underline  font-bold">Sign In</div>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
};
