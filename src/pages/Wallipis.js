import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Helmet } from 'react-helmet';
// import LazyLoad from 'react-lazyload';
import Wallipi from "../components/Wallipi";
import "../css/wallipi.css"
import Shimmer from "../components/ImageShimmer";
import Anchor from "../components/Anchor";

const API_KEY = '34718829-4c9919b223922dd46063bdffd';



const Wallipis = () => {

    const [wallipis, setWallipis] = useState([]);
    const [words, setWords] = useState([]);
    const [orientation, setOrientation] = useState("all");
    const [order, setOrder] = useState("popular")
    const [page, setPage] = useState();
    const [Load, setLoad] = useState(false);

    const numOfWords = 15;
    const numOfImages = 20;

    var query = "";
    let params = useParams();

    if(params.query === ""){
        query = "nature";
    }else{
        query=params.query;
    }

    const history = useHistory();

    function keyword(value){
        history.push(`${value}`)
    }

    const pageNum =(page) =>{
        console.log(page)
        setPage(page)
    }

    let url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&per_page=200&editors_choice=true&orientation=${orientation}&order=${order}&page=${page}`
    // console.log(url);

    useEffect(() =>{
        // window.scrollTo(0,0);
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
            setLoad(true)
            fetch(url)
            .then(response => response.json())
            .then(wallipis => {
                const hits = wallipis.hits;
                let words = [];
                let wordsArray="";
                hits.forEach(element => {
                    words.push(element.tags);
                });
                for(let i=0;i<words.length;i++){
                    wordsArray = wordsArray + ", " + words[i];
                }
                let dics = wordsArray.split(', ');
                dics.shift();
                let uniqueDics = [...new Set(dics)];
                setWallipis(wallipis.hits);
                setWords(uniqueDics);
                setLoad(false);
            })
    }, [query, orientation, order, page]);

    return (
        <>
        <Helmet>
            <title>Wallipi - Wallipis</title>
        </Helmet>
        {/* <div className="anchor"><img src="/images/anchor.svg" /></div> */}
        {
            wallipis.length>0 &&
            <Anchor />
        }
        <div className="wallipi-space h-32"></div>
            <section className='queryCollection flex items-center justify-center'>
            <div className="wallipi-layout py-8">
            {
                Load && [...Array(numOfImages)].map((e,i) => <Shimmer key={i} />)
            }
            {
                !Load && wallipis.map(wallipi => <Wallipi key={wallipi.id} wallipi={wallipi} />)
            } 
            </div>
            </section>
                    {
                        wallipis.length===0 &&
                        <div id="noimg"><img src="/images/noimage.svg" /><h1 className="text-neutral-500 text-2xl">No wallipis Available Here !</h1></div>
                    }
        </>
    )
}

export default Wallipis;
