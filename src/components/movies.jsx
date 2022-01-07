import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends React.Component {
  state = {
    numberOfMovies: getMovies().length,
    movies: getMovies(),
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
    this.setState({ numberOfMovies: movies.length });
  };

  LikeHandler = (movie) => {
    let movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });

    /*  Can we written in this way too.
    
    let { movies } = this.state;
    let index = movies.indexOf(movie);
    if (movies[index].hasOwnProperty("liked")) {
      delete movies[index].liked;
      this.setState({ movies });
      return;
    }
    movies = this.state.movies.map((m) => {
      if (m._id === movie._id) {
        m.liked = true;
      }
      return m;
    });
    this.setState({ movies });   */
  };

  render() {
    let { numberOfMovies } = this.state;

    if (numberOfMovies === 0)
      return <p>Oops! there are no movies in the database.</p>;

    return (
      <React.Fragment>
        <p>Showing the {numberOfMovies} movies in the database.</p>
        <table className="table  ">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>

          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td> {movie.title} </td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.LikeHandler(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
export default Movies;
