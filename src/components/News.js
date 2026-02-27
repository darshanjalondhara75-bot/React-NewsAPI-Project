import React, { useState, useEffect, useCallback } from "react";
import Newsitem from "./Newsitem";
import LoadingBar from "react-top-loading-bar";
import Skeleton from "./Skeleton";
import { defaultImages, defaultArticles } from './NewsData';

const pageSize = 33;

function News(props) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [progress, setProgress] = useState(0);

  const fetchNews = useCallback(async (pageNum, append = false) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setLoading(true);
      setArticles([]);
    }
    setProgress(10);
    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const todayString = today.toISOString().split('T')[0];
      const yesterdayString = yesterday.toISOString().split('T')[0];

      let url = `https://newsapi.org/v2/everything?q=${props.category}&from=${yesterdayString}&to=${todayString}&sortBy=publishedAt&apiKey=ebf60ee223af41518a56279f7bfe1f7e&page=${pageNum}&pageSize=${pageSize}`;

      setProgress(30);
      let apiArticles = [];
      try {
        let data = await fetch(url);
        let parsedData = await data.json();
        if (parsedData.status === "ok" && parsedData.articles) {
          apiArticles = parsedData.articles;
        }
      } catch (e) {
        console.log("NewsAPI fetch failed, using local fallback data.");
      }
      setProgress(70);

      // Strict Fallback: IF API fails OR returns empty, FORCE the specific requested category's local data
      if (!apiArticles.length) {
        // We guarantee the category exists because we just built all 9 of them
        apiArticles = defaultArticles[props.category.toLowerCase()] || defaultArticles['general'];
      }

      const articlesWithImages = apiArticles.map((article) => ({
        ...article,
        imgUrl: article.urlToImage || (defaultImages && defaultImages[props.category.toLowerCase()]) || (defaultImages && defaultImages['defaultFallback']) || "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&h=250&fit=crop",
      }));

      setProgress(100);
      setArticles(prev => append ? [...prev, ...articlesWithImages] : articlesWithImages);
      setHasMore(articlesWithImages.length === pageSize);
      setPage(pageNum);
      setLoading(false);
      setIsLoadingMore(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, [props.category]);

  const handleScroll = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      fetchNews(page + 1, true);
    }
  }, [isLoadingMore, hasMore, page, fetchNews]);

  useEffect(() => {
    fetchNews(1);
  }, [fetchNews]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="container mt-4">
      <LoadingBar
        color="var(--primary)"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
        <h2 className="fw-bold m-0" style={{ color: 'var(--text-light)' }}>
          {props.category.charAt(0).toUpperCase() + props.category.slice(1)} <span className="text-primary">News</span>
        </h2>
        <span className="badge bg-primary rounded-pill px-3 py-2">{articles.length} Articles</span>
      </div>

      {loading && (
        <div className="row">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      )}

      {!loading && (
        <>
          <div className="row">
            {articles.map((article, index) => (
              <div key={`${page}-${index}`} className="col-md-4 mb-4">
                <Newsitem
                  title={article.title || ""}
                  description={article.description || ""}
                  imgUrl={article.imgUrl}
                  author={article.author}
                  date={article.publishedAt}
                  newsUrl={article.url}
                  source={article.source?.name || article.source}
                />
              </div>
            ))}
          </div>

          {isLoadingMore && (
            <div className="row">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} />
              ))}
            </div>
          )}

          {!hasMore && articles.length > 0 && (
            <div className="text-center my-5 py-4 border-top border-secondary opacity-25">
              <p className="text-secondary m-0">You've reached the end of the news feed.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default News;
