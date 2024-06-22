import React from "react";
// import loading from './loading.webp'
import goose from './goose.webp'

function Spinner(){
    return(
        <div className="text-center">
            <img src={goose} alt="loading-img" style={{height:'150px'}}/>
        </div>
    )
 
}
export default Spinner