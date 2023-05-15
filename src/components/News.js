import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

 
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    console.log("cdm");
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    // props.setProgress(30);
    let parsedData = await data.json();
    // props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    // props.setProgress(100);
  };

  useEffect(() => {
     document.title = `${capitalizeFirstLetter(props.category)} : Anand News Studio`;
    updateNews();
  }, []);

  const handlePrevClick = async () => {
    console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    // }&category=${
    //     this.props.category
    // }&apiKey=f46dea9a9236468dba03417d34ce79a8&page=${
    //     this.state.page - 1
    // }&pageSize=${  this.props.pageSize}`;

    //   this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    //   this.setState({
    //   page:   this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    setPage(page - 1);
    updateNews();
  };

  const handleNextClick = async () => {
    // console.log("Next");
    // if (
    //   !(
    //     state.page + 1 >
    //     Math.ceil(state.totalResults / props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     props.country
    //   }&category=${
    //     props.category
    //   }&apiKey=f46dea9a9236468dba03417d34ce79a8&page=${
    //     state.page + 1
    //   }&pageSize=${props.pageSize}`;

    //   setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //     this.setState({
    //     page:   this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }
    setPage(page + 1);
    updateNews();
  };

  const fetchMoredata = async () => {
    setPage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px" }}
      >
        News - Top Headlines from {capitalizeFirstLetter(props.category)}&nbsp;
        category
      </h1>
      {loading && <Spinner />}
      <div className="row">
        {!loading &&
          articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={handlePrevClick}
        >
          &larr; Previous
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalResults / page)}
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 20,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
