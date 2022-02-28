import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../components/Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const baseUrl = "https://image.tmdb.org/t/p/original/";

  // A code that run based on a specific condition/variable
  useEffect(() => {
    //if [], run once when the row loads, and dont run again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      // console.log(request);
      return request;
    }
    fetchData();

    // if [value], run when many times depanding on the value changes
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movies) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movies?.name || "")
        .then((url) => {
          // get parameter from the link
          //https://www.youtube.com/watch?v=XtMThy8QKqU&t=9592s
          const urlParams = new URLSearchParams(new URL(url).search);
          // get the value of v which is XtMThy8QKqU
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log("error:" + error));
    }
  };

  return (
    <div className="row">
      {/* title */}
      <h2>{title}</h2>

      {/* container -> posters */}
      <div className="row_posters">
        {/* several row_poster(s) */}
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
