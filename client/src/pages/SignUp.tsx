import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OAuth } from '../components/OAuth';
import { RootState } from "../Redux/user/RootState";
import { useDispatch, useSelector } from 'react-redux';
import { signUpStart, signUpSuccess, signUpFailure } from "../Redux/user/userSlice";

export const SignUp = () => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const { loading, error } = useSelector((state: RootState) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            dispatch(signUpStart());
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.user.success === false) {
                dispatch(signUpFailure(data.user.message));
                return;
            }
            dispatch(signUpSuccess(data.user));
            navigate('/dashboard')
        } catch (err) {
            dispatch(signUpFailure(error || "An error occurred"));
        }

    }

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
            <form onSubmit={handelSubmit} className="flex flex-col gap-4">
                <input type="text" placeholder="name" className="border p-3 rounded-lg " id="name" onChange={handelChange}></input>
                <input type="email" placeholder="email" className="border p-3 rounded-lg " id="email" onChange={handelChange}></input>
                <input type="password" placeholder="password" className="border p-3 rounded-lg " id="password" onChange={handelChange}></input>

                <button disabled={loading} className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? "Loading..." : "Sing UP"}
                </button>
                <OAuth />
            </form>

            <div className='flex gap-2 mt-2'>
                <p>Have an account?</p>
                <Link to={"/login"}>
                    <span className='text-blue-600'>Sign in</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}