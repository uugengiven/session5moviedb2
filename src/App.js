import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      movie: {}
    };

    this.loadMovies = this.loadMovies.bind(this);
    this.loadMovie = this.loadMovie.bind(this);
  }

  componentDidMount()
  {
    this.loadMovies();
  }

  loadMovies()
  {
    axios
      .get("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b6fbc7f3f313bd395902af464ef47262")
      .then((res) => {
        let temp = res.data.results;
        temp.splice(0, 1);
        this.setState({ movies: temp});
        console.log(res);
      });
  }

  loadMovie(id)
  {
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=b6fbc7f3f313bd395902af464ef47262`
    axios
      .get(apiUrl)
      .then((res) => {
        let temp = res.data;
        this.setState({ movie: temp});
        console.log("I loaded movie: " + temp.title);
      });
  }

  drawMovie()
  {
    if(!this.state.movie.title)
    {
      return <div>No movie selected!</div>;
    }
    else
    {
      return <div>{this.state.movie.title} is selected!</div>;
    }
  }

  render() {
    return (
      <div className="App">
          {this.state.movies.map((movie, index) => {
            if(index < 3) {
              return (<h1 onClick={() => {this.loadMovie(movie.id)}}>{movie.title}</h1>);
            }
            else if(index < 10) {
              return (<h2>{movie.title}</h2>);
            }
            else
            {
              return (<h3>{movie.title}</h3>);
            }
          })}
          {this.drawMovie()}  
      </div>
    );
  }
}

export default App;
