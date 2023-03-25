import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';

const Navigation = () => {

    //change color of navbar on scrolling
    const [color,setColor] = useState(false);
    const changeColor = () =>{
        if(window.scrollY > 50){
            setColor(true);
        }else{
            setColor(false);
        }
    }
    window.addEventListener("scroll", changeColor);

    // search functionality
    const [query, setQuery] =  useState("");

    const history = useHistory();

    const onSubmit = (e)=>{
        e.preventDefault();
        var queries = "";

        if(query==""){
            queries = "nature";
        }else{
            queries  = query.split(" ").join("+");
        }

        history.push(`/search/${queries}`);
    }


    return (
        <>
            <div className={color ? 'headeractive' : 'header'}>
            <nav className= "container mx-auto flex items-center py-4 justify-between">
                <div className='logo-div w-1/4 flex flex-col justify-center items-center'>
                    <Link to="/">
                        <img className='logo-img' style={{ height: 90 }} src='/images/logo.jpg' alt='logo' />
                    </Link>
                </div>
                <div className='search-div w-1/2 flex justify-center'>
                    <form className='w-full flex justify-center' onSubmit={onSubmit}>
                        <input id='search-input' className='w-3/4 rounded-xl bg-neutral-700 focus:outline-none ' type="text"
                            name='search' placeholder='Type here' value={query} onChange={(e) => setQuery(e.target.value)} />
                        <button id='search-icon' className='rounded-xl bg-neutral-700 px-6 ml-1' type="submit"><i className="fas fa-search"></i></button>
                    </form>
                </div>
                <div className='nav-extra w-1/4 flex justify-center'>
                    <ul className='flex'>
                        <li id='nav-list' className='text-gray-300 tracking-widest'><a href="#bottom">  Contact </a></li>
                        <li id='nav-list' className='text-gray-300 ml-12 tracking-widest'>About</li>
                    </ul>
                </div>
            </nav>
            </div>
        </>
    )
}

export default Navigation;
