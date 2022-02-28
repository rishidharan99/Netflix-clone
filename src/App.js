import "./App.css";
import React from "react";
import Row from "./components/Row";
import request from "./request";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
function App() {
  return (
    <div className="app">
      {/* Nav  */}
      <Nav />
      {/* banner */}
      <Banner />

      {/* isLargeRow => default true */}
      <Row
        title="Netflix Originals"
        fetchUrl={request.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={request.fetchTrending} />
      <Row title="Top Rated" fetchUrl={request.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={request.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={request.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={request.fetchDocumantaries} />
    </div>
  );
}

export default App;
