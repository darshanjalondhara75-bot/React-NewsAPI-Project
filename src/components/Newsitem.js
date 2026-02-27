import React from "react";

const Newsitem = (props) => {
  let { title, description, imgUrl, newsUrl, author, date } = props;
  return (
    <div className="my-3 h-100">
      <div className="news-card h-100 d-flex flex-column">
        <div style={{ position: "relative", overflow: "hidden", height: "200px" }}>
          <span
            className="badge rounded-pill bg-primary"
            style={{
              position: "absolute",
              zIndex: "1",
              top: "10px",
              right: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
            }}
          >
            {props.source || "News"}
          </span>
          <img
            src={imgUrl}
            className="card-img-top"
            alt={title}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&h=250&fit=crop";
            }}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold line-clamp-2" style={{ height: "3rem" }}>{title}</h5>
          <p className="card-text small flex-grow-1 line-clamp-3 text-secondary">
            {description}
          </p>
          <div className="mt-auto pt-3">
            <p className="card-text mb-3">
              <small className="text-secondary">
                By {!author ? "Unknown" : author} •{" "}
                {date ? new Date(date).toLocaleDateString() : "N/A"}
              </small>
            </p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-primary-modern w-100 mt-2"
            >
              Read Full Article
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginLeft: "4px" }}>
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsitem;
