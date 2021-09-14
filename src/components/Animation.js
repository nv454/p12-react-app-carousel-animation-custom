import React,{useState,useRef,useEffect} from 'react';
import './Animation.css';
import { ImageData } from './Data';

function Animation() {

    const [current,setCurrent] = useState(1);
    const length = ImageData.length;
    const timeout= useRef(null);

    const onValueChange = (event) => {  
       // console.log(event.target.value +" "+ event.target.id);       
    }

    const nextSlide =(value)=>{
        if (value!==current)
        {
        if(timeout.current){clearTimeout(timeout.current)};
        setCurrent(value);
        }
    }
    
    useEffect(
        ()=>{
        const nextSlide =()=>
        {
        setCurrent(current=>(current===length ? 1: current +1));
        //console.log(current);
        };
        timeout.current = setTimeout(nextSlide,3000);
        return function(){
        if(timeout.current){clearTimeout(timeout.current);}
        };
        },[current, length]);  

    return (
        <div className="carousel-wrapper">  

            <div className="legend-img">
                Selected option is : {current}
            </div>          
    
            <div className="radio-button-wrapper">
                {ImageData.map((item)=>(

                <div key ={item.id} className="radio-button">
                    <label>
                        <input                   
                        type="radio"
                        value={item.label}
                        checked={current === item.id}
                        //onChange={onValueChange}
                        onClick={()=>nextSlide(item.id)}
                        />
                        {/* {item.label} */}
                    </label>         
                </div>
                ))}
            </div>

            <div className="image-wrapper">
                {ImageData.map((item)=>(
                    <div key ={item.id} className={current === item.id ? 'visible':'hidden'}>
                        <img className="image" src={item.src} alt={item.label}></img>
                    </div>
                ))}            
            </div>  

        </div>
    )
}

export default Animation
