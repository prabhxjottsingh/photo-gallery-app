import "../css/anchor.css"
import { useState } from 'react';

const Anchor = () => {
    const [anchor,setAnchor] = useState(false);
    const dropAnchor = () =>{
        if(window.scrollY > 1000){
            setAnchor(true);
        }else{
            setAnchor(false);
        }
    }
    window.addEventListener("scroll", dropAnchor);

    // function anchorClicked(){
    //     window.scrollTo(0,0)
    // }
    function anchorClicked(){
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
        });
    }

    
  return (
    <>
        <div className={anchor ? 'anchorActive' : 'anchorInactive'} onClick={() => anchorClicked()}>
            <img src="/images/anchor.svg" alt="anchor" />
        </div>
    </>
  )
}

export default Anchor;