import React, {Component} from "react";

export default class NewsItem extends Component{
    render(){
        let {source,title, description, imageUrl,time, newsUrl} = this.props;
        let t = new Date(time).toUTCString()
        return(
            <div className="container" style={{width: '77%'}}>
                        <span className="badge badge-pill badge-primary">{source}</span>
                        <div className="card" style={{width: '18rem'}}>
                            <img src={imageUrl ? imageUrl : 'https://deadline.com/wp-content/uploads/2023/09/GettyImages-164230595-e1694969128971.jpg?w=655'} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">{description && description.slice(0,72)}</p>
                                <small className="text-muted">{t}</small>
                                <a href={newsUrl} className="btn btn-sm btn-primary">Read more</a>
                            </div>
                        </div>
            </div>
        )
    }
}