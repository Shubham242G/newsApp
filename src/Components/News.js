import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import App from "../App";



const News = (props) => {


    const [articles, setArticles] = useState([]);
    const [status, setStatus] = useState(true);
    const [totalResults, setTotalResults] = useState(0);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(false);
    const [whatError, setWhatError] = useState('');


    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    document.title = `${capitalizeFirstLetter(props.category)}- Kal Tak`




    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://gnews.io/api/v4/top-headlines?apikey=${props.apiKey}&category=${props.category}&lang=${props.lang}`
        setStatus(true);
        let data = await fetch(url);
        if (data.status == 403) {
            setError(true);
            setWhatError('Daily request limit has reached');
            props.setProgress(100);
            console.log(whatError)
        } else if (data.status == 500) {
            setError(true);
            setWhatError('Internal server error');
            props.setProgress(100);
            console.log(whatError)
        } else if (data.status == 200) {
            props.setProgress(30);
            let parsedData = await data.json();
            props.setProgress(70);
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
            setStatus(false)
            props.setProgress(100);
        }

    }

    useEffect(() => {
        updateNews();
    }, [App])




    const fetchMoreData = async () => {

        let url = `https://gnews.io/api/v4/top-headlines?apikey=${props.apiKey}&category=${props.category}&lang=${props.lang}`
        let data = await fetch(url);
        if(data.status != 200){
            setError(true);
            setWhatError('Could not load more news');
            props.setProgress(100);
        }
        let parsedData = await data.json();
        setError(false)
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults);
    };

    const searchData = async () => {
        props.setProgress(10);
        let url = `https://gnews.io/api/v4/top-headlines?apikey=${props.apiKey}&category=${props.category}&lang=${props.lang}&q=${search}`
        setStatus(true);
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setStatus(false)
        props.setProgress(100);
    }



    return (
        <>
            {error ? <h1>{whatError}</h1> :
                (
                    <>
                        <h2 style={{ marginTop: '90px' }}> This is Kal Tak. Aaj Tak se zyada tez</h2>
                        <h2>{capitalizeFirstLetter(props.category)} News</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <form onSubmit={(e) => e.preventDefault()} className="form-inline my-2 my-lg-0">
                                <input onChange={(e) => (setSearch(e.target.value))} value={search} className="form-control mr-sm-2" type="search" placeholder="Search" id="searchInput" aria-label="Search" />
                                <button onClick={() => searchData()} className="btn btn-outline-success my-2 my-sm-0" type="submit" id="search">Search</button>
                            </form>
                        </div>
                        {status && <Spinner />}
                        {search.length === 0
                            ?
                            (<InfiniteScroll
                                dataLength={articles.length}
                                next={fetchMoreData}
                                hasMore={articles.length !== totalResults}
                                loader={<Spinner />}
                            >
                                <div className="container">
                                    <div className="row my-4">
                                        {articles.map((element) => {
                                            return <div className="col-md-4 col-sm-6 my-4" key={element.url}>
                                                <NewsItem source={element.source.name} time={element.publishedAt} title={element.title} description={element.description} imageUrl={element.image} newsUrl={element.source.url} />
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </InfiniteScroll>)
                            : (<div className="container">
                                <div className="row my-4">
                                    {articles.map((element) => {
                                        return <div className="col-md-4 col-sm-6 my-4" key={element.url}>
                                            <NewsItem source={element.source.name} time={element.publishedAt} title={element.title} description={element.description} imageUrl={element.image} newsUrl={element.source.url} />
                                        </div>
                                    })}
                                </div>
                            </div>)
                        }</>)
            }
        </>
    )

}

News.defaultProps = {
    lang: 'en',
    q: '',
    category: 'general'
};

News.propTypes = {
    lang: PropTypes.string,
    q: PropTypes.string,
    category: PropTypes.string
}

export default News;