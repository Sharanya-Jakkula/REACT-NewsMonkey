import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

//rce
export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter=(string)=> {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}

  constructor(props) {
    super();
    // console.log("Hello,I am a constructor from news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0

    }
    console.log(props.category);
    document.title=`NewsMonkey - ${this.capitalizeFirstLetter(props.category)}`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.props.setProgress(70);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
   
    });
    this.props.setProgress(100);
  }
  //  lifecycle method
  //runs after render
  async componentDidMount() {
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bdaaba1c9d3c4b17ac48e8af339f8dd7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data=await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles:parsedData.articles,
    //   totalResults:parsedData.totalResults,
    //   loading:false})
    this.updateNews();
  }

  //handlers
  handleNextClick = async () => {
    // console.log("Next")
    // if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bdaaba1c9d3c4b17ac48e8af339f8dd7&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    //   let data=await fetch(url);
    //   let parsedData = await data.json();
    //   // console.log(parsedData);
    //   this.setState(
    //    { page :this.state.page+1 ,
    //     articles:parsedData.articles,
    //     loading:false
    //    }
    //   )
    // }
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  };

  handlePrevClick = async () => {
    // console.log("Previous")
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bdaaba1c9d3c4b17ac48e8af339f8dd7&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});

    // let data=await fetch(url);
    // let parsedData = await data.json();
    // // console.log(parsedData);
    // this.setState(
    //  { page :this.state.page-1 ,
    //   articles:parsedData.articles,
    //   loading:false
    //  }
    // )
    this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
  };

  fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
   this.setState({page:this.state.page+1})
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
   let data = await fetch(url);
   let parsedData = await data.json();
   console.log(parsedData);
   this.setState({
     articles:this.state.articles.concat(parsedData.articles),
     totalResults: parsedData.totalResults,
     loading: false,
  
   });
  };

  render() {
    // console.log("render")
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
  dataLength={this.state.articles.length}
  next={this.fetchMoreData}
  hasMore={this.state.articles.length !== this.state.totalResults}
  loader={<Spinner/>}
>
  <div className="container">
        <div className="row">
          {this.state.articles?.map((element, index) => (
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
              Math.ceil(this.state.totalResults / this.props.pageSize)
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
}

export default News;
