import React, { useState } from 'react';
import cityData from './ocity.json';
export const TercerComponente = () => {
    const [showLocalDescription, setShowLocalDescription] = useState(false);
    const [buttonText, setButtonText] = useState("Change to Local Language");

    const toggleDescription = () => {
        setShowLocalDescription(!showLocalDescription);
        setButtonText(showLocalDescription ? "Change to Local Language" : "Change to English");
    };
    return (
        <div className='container max-width'>
                <div className='flex flex-col mt-10'>
                        <h1>{cityData.data[0].manifestation_name}({cityData.data[0].city_name_aux})</h1>
                        <h2><a href='google.com'>View on OCity map</a></h2>
                </div>
                <div className='flex flex-row'>
                        <img src={`https://o-city.org/manifestations_media/${cityData.data[0].image}`} alt='imagen' className='w-1/2'></img>
                        <div>
                        <button onClick={toggleDescription}>{buttonText}</button>
                    <p>{showLocalDescription ? cityData.data[0].manifestation_description_local : cityData.data[0].manifestation_description}</p>
                </div>
                        
                </div>
        </div>
    )
}
