import React, { Component } from "react";
// import loading from './loading.webp'
import goose from './goose.webp'

export class Spinner extends Component{
 render(){
    return(
        <div className="text-center">
            <img src={goose} alt="loading-img" style={{height:'150px'}}/>
        </div>
    )
 }
}
export default Spinner