import React, { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../request";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );

      function getMoves() {
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ]
        );
      }
      setInterval(getMoves, 30000);
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
        "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: "center center",
      }}
    >
      {/* << background image */}

      <div className="banner_contents">
        {/* title  */}
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.orginal_name}
        </h1>
        {/* div > 2 buttons */}
        <div>
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        {/* description */}
        <h1 className="banner_description">{movie?.overview}</h1>
      </div>

      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
