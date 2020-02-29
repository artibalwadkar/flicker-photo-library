import React, { Component } from "react";
class PhotoLibrary extends Component {
  pageNum = 1;
  key = "fda8922284b87b4f38775239ea65f173";
  secret = "60f4b8039d57b683";
  constructor() {
    super();
    this.state = {
      photos: <React.Fragment></React.Fragment>
    };
  }

  fetchImages(pageNumber) {
    fetch(
      "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" +
        this.key +
        "&license=&orientation=landscape,portrait,square,panorama&safe_search=1&url_o&per_page=10&page=" +
        pageNumber +
        "&format=json&nojsoncallback=1"
    )
      .then(data => data.json())
      .then(data => {
        const photos = data.photos.photo.map(obj => {
          const imageUrl =
            "https://farm" +
            obj.farm +
            ".staticflickr.com/" +
            obj.server +
            "/" +
            obj.id +
            "_" +
            obj.secret +
            "_z.jpg?zz=1";
          obj.imageUrl = imageUrl;
          return obj;
        });

        let displayHtml = (
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              {photos.map((obj, index) => {
                let className = "";
                if (index === 0) {
                  className = "active";
                }
                return (
                  <li
                    key={index}
                    data-target="#carouselExampleIndicators"
                    data-slide-to={index}
                    className={className}
                  ></li>
                );
              })}
            </ol>
            <div className="carousel-inner">
              {photos.map((obj, index) => {
                let className = "";
                if (index === 0) {
                  className = "carousel-item active";
                } else {
                  className = "carousel-item";
                }
                return (
                  <div className={className} key={obj.id}>
                    <img
                      className="d-block w-100"
                      src={obj.imageUrl}
                      alt={obj.title}
                      width="640px"
                      height="640px"
                    />
                  </div>
                );
              })}
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        );

        this.setState({ photos: displayHtml });
      });
  }
  handleClick = event => {
    event.preventDefault();
    this.fetchImages(this.pageNum++);
  };
  render() {
    return (
      <div>
        <button
          className="btn btn-sm btn-primary m-2"
          onClick={this.handleClick}
        >
          Fetch Images
        </button>
        <br />
        {this.state.photos}
      </div>
    );
  }
}
export default PhotoLibrary;
