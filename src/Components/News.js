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
            page:1,
            totalResults:0,
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}- Kal Tak`
    }

    static defultProps = {
        pageSize:7,
        category:'general',
        country:'in',
        page:1,
                
    }

    static propTypes = {
        pageSize : PropTypes.number,
        category : PropTypes.string,
        country : PropTypes.string,
    }
    
    async componentDidMount(){
        this.updateNews();
    }

    async updateNews (){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({status:true});
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,status:false})
        this.props.setProgress(100);
    }

    fetchMoreData = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        this.setState({page: this.state.page + 1})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults})
      };

    capitalizeFirstLetter(str){
       return str.charAt(0).toUpperCase() + str.slice(1);
    }

    previousPage = async()=>{
        this.setState({page: this.state.page -1})
        this.updateNews();
        
    }

    nextPage = async()=>{
        this.setState({page: this.state.page +1})
        this.updateNews();
        
    } 

    render(){
        return(
            <>
                <h2 style={{marginTop:'90px'}}> This is Kal Tak. Aaj Tak se zyada tez</h2>
                <h2>{this.capitalizeFirstLetter(this.props.category)} top headlines</h2>
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
                                                <NewsItem source = {element.source.name} time={element.publishedAt} author={element.author} title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
                                            </div>
                                    })}
                                </div>
                            </div>
                    </InfiniteScroll>
                
            </>
        )
    }
}