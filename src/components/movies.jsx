import React from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: { name: "All Genres" },
    currentPage: 1,
    pageSize: 4,
    sortColumn: { columnName: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = (movie) => {
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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    let { length: numberOfMovies } = this.state.movies;
    const {
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn,
      genres,
      movies: allMovies,
    } = this.state;

    if (numberOfMovies === 0)
      return <p>Oops! there are no movies in the database.</p>;

    let filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    console.log("filtered movie ", filtered);

    const sorted = _.orderBy(
      filtered,
      [sortColumn.columnName],
      [sortColumn.order]
    );
    console.log("sorted movies ", sorted);
    const movies = paginate(sorted, currentPage, pageSize);
    console.log("Movie from paginate ", movies);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing the {filtered.length} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
export default Movies;
