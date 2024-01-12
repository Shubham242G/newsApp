import React, {Component} from "react";
import Spinner from "./Spinner";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component{
    constructor(props){
        super(props);
        this.state={
            articles:[],
            status:true,
            totalResults:0,
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}- Kal Tak`
    }

    static defultProps = {
        lang:'en',
        q:'',
        category:'general'        
    }

    static propTypes = {
        lang : PropTypes.string,
        q : PropTypes.string,
        category: PropTypes.string
    }
    
    async componentDidMount(){
        this.updateNews();
    }

    async updateNews (){
        this.props.setProgress(10);
        let url = `https://gnews.io/api/v4/top-headlines?apikey=${this.props.apiKey}&category=${this.props.category}&lang=${this.props.lang}`
        this.setState({status:true});
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalArticles,status:false})
        this.props.setProgress(100);
    }



    fetchMoreData = async() => {
        let url = `https://gnews.io/api/v4/top-headlines?apikey=${this.props.apiKey}&category=${this.props.category}&lang=${this.props.lang}`
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalArticles})
      };

    capitalizeFirstLetter(str){
       return str.charAt(0).toUpperCase() + str.slice(1);
    }

 

    render(){
        return(
            <>
                <h2 style={{marginTop:'90px'}}> This is Kal Tak. Aaj Tak se zyada tez</h2>
                <h2>{this.capitalizeFirstLetter(this.props.category)} News</h2>
                {this.state.status && <Spinner/>}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner/>}
                    >
                            <div className="container">
                                <div className="row my-4">
                                    {this.state.articles.map((element)=>{
                                    return <div className="col-md-4 col-sm-6 my-4" key={element.url}>
                                                <NewsItem source = {element.source.name} time={element.publishedAt} title={element.title} description={element.description} imageUrl={element.image} newsUrl={element.source.url}/>
                                            </div>
                                    })}
                                </div>
                            </div>
                    </InfiniteScroll>
                
            </>
        )
    }
}