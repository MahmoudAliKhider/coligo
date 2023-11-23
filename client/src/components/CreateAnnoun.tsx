import React, { useState, FormEvent } from 'react';

interface CreateAnnouncementFormProps {
    onCreate: (newAnnouncementData: { title: string; content: string }) => void;
}

const CreateAnnouncementForm: React.FC<CreateAnnouncementFormProps> = ({ onCreate }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onCreate({ title, content });
        setTitle('');
        setContent('');
        
    };

    return (
        <div className='w-[300px] bg-white mt-14 mr-10 p-6 h-[400px] rounded-xl'>
            <h1 className="text-2xl font-bold  text-slate-800 ">Create Announcements</h1>

            <form onSubmit={handleSubmit} className='p-5'>
                <label className='text-slate-800 font-bold'>
                    Title:
                    <input className='bg-slate-300 p-2 w-[200px] rounded-lg' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <br />
                <label className='text-slate-800 font-bold'>
                    Content:
                    <textarea className='bg-slate-300 w-[200px] rounded-lg'  value={content} onChange={(e) => setContent(e.target.value)} />
                </label>
                <br />
                <button className='border mt-4 p-1 pl-7 pr-7 bg-slate-900 rounded-xl text-white  ' type="submit">Create Announcement</button>
            </form>
        </div>

    );
};

export default CreateAnnouncementForm;
