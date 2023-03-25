import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import Wallipi from "../components/Wallipi";
import '../css/wallipi.css';
// import PageNav from "../components/PageNavigation";
import { useRef } from 'react'
import Anchor from "../components/Anchor"

const API_KEY = '34718829-4c9919b223922dd46063bdffd';


const Home = () => {
    window.scrollTo(0,0);

    const [wallipis, setWallipis] = useState([]);

    const firstItemRef = useRef(null);

    useEffect(() =>{
        // console.log("component mounted.......");
        fetch(`https://pixabay.com/api/?key=${API_KEY}&per_page=100&editors_choice=true`)
        .then(response => response.json())
        .then(wallipis => {
            setWallipis(wallipis.hits);
        })
    }, []);

    return(
        <>
        <Helmet>
          <title>Wallipi - Home</title>
        </Helmet>
        <Anchor />
            <div className="home-space"></div>
            <div className="container-1 container mx-auto flex items-center py-8 justify-center">
                <div className="container-1-1 w-1/2 flex flex-col justify-center items-center h-96 ">
                    <div className="container-1-1-1 w-2/3">
                        <h2 className="text-zinc-400 font-extrabold text-4xl tracking-wide">Picture It What You Think!</h2>
                        <div className="border-l-4 border-zinc-400 rounded-lg pl-6 mt-12">
                            <p className="text-zinc-500 tracking-wider">What are you searching for ? HD images ? Well, your search ends here.
                            Get the best free stock wallipis, royalty free images and videos shared by creators.
                            Join the community. </p>
                        </div>
                    </div>
                </div>
                <div className="container-1-2 w-1/2 mt-24">
                    <img id="hero-img" className="" src="/images/hero1.svg" alt="hero" />
                </div>
            </div>
            <section className='collections flex items-center justify-center'>
                <div className="wallipi-layout py-16">
                {
                wallipis.map(wallipi => <Wallipi key={wallipi.id} wallipi={wallipi} />)
                }
                </div>
            </section>
            {/* <PageNav /> */}
            <div ref={firstItemRef}></div>
        </>
    )
}

export default Home;
