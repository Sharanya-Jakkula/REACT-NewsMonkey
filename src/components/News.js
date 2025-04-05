import React, { useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

//rce
const News=(props)=>{
  const [articles,setArticles]=useState([]);
  const [loading,setLoading]=useState(true);
  const [page,setPage]=useState(1);
  const [totalResults,setTotalResults]=useState(0);
  const capitalizeFirstLetter=(string)=> {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}

 

  const  updateNews=async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    // console.log(parsedData);
    props.setProgress(70);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults)
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(()=>{
  document.title=`NewsMonkey - ${capitalizeFirstLetter(props.category)}`;

    // eslint-disable-next-line
    updateNews();
  },[])



  //handlers
  // const handleNextClick = async () => {
   
 
  //   setPage(page+1);
  //   updateNews();
  // };

  // const handlePrevClick = async () => {
  //   setPage(page-1);
  //   updateNews();
   
  // };

  const fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
   setPage(page+1);
   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
   let data = await fetch(url);
   let parsedData = await data.json();
  //  console.log(parsedData);
  setArticles(articles.concat(parsedData.articles));
  setTotalResults(parsedData.totalResults);
  setLoading(false);
   
  };


    // console.log("render")
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px",marginTop:'90px' }}>
          NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
  dataLength={articles.length}
  next={fetchMoreData}
  hasMore={articles.length !==totalResults}
  loader={<Spinner/>}
>
  <div className="container">
        <div className="row">
          {articles?.map((element, index) => (
              <div className="col-md-4" key={element.url || index}>
                <NewsItem
                  title={element.title ? element.title : "No Title Available"}
                  description={
                    element.description?.slice(0, 88) ||
                    "No Description Available"

                  }
                  imageUrl={
                    element.urlToImage ||
                    "https://i0.wp.com/electrek.co/wp-content/uploads/sites/3/2024/12/Hyundai-new-EVs-tech.jpeg?resize=1200%2C628&quality=82&strip=all&ssl=1"
                  }
                  newsUrl={element.url}
                  author={element.author || "Unknown"}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
        </div>
        </div>
       
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr;Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next&rarr;
          </button>
        </div> */}
      </>
    );
  }


News.defaultProps = {
  country: "us",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
