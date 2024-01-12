import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Nvbar extends Component {
    constructor(props){
        super(props);
    this.state = {
        lang:'en',
      }
    }

    render() {
        return (
            <>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Kal Tak</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to='/science'>Science</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/world'>World</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/nation'>Nation</Link>
                            </li>
                            <li className="nav-item"><Link className="nav-link" to='/business'>Business</Link></li>
                            <li className="nav-item"><Link className="nav-link" to='/technology'>Technology</Link></li>
                            <li className="nav-item"><Link className="nav-link" to='/entertainment'>Entertainment</Link></li>
                            <li className="nav-item"><Link className="nav-link" to='/sports'>Sports</Link></li>
                            <li className="nav-item"><Link className="nav-link" to='/health'>Health</Link></li>
                        </ul>
                    </div>
                </nav>
            </>
        )
    }
}