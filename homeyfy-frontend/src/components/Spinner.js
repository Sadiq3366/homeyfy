import React from 'react';
import Loading from "../images/loading.png"
const Spinner = ()=> {
    return (
        <div className="text-center spinner">
            <img src={Loading} alt="Spinner"/>
        </div>
    );
}

export default Spinner;
