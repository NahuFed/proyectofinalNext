"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchMovies,
  resetMovies,
  addRating,
  addComment,
  selectMovieById,
  selectCommentsByMovie,
  selectCommentsByUser,
  hasUserRatedMovie,
} from "@/store/slices/moviesSlice";

export default function TestMoviesUI() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const scores = useSelector((state) => state.movies.scores);
  const comments = useSelector((state) => state.movies.comments);

  const [query, setQuery] = useState("");
  const [userId, setUserId] = useState("u001");
  const [movieId, setMovieId] = useState(movies[0]?.id || "");
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState("");

  //  HANDLERS 
  const handleSearch = () => {
    dispatch(searchMovies(query));
  };

  const handleReset = () => {
    dispatch(resetMovies());
    setQuery("");
    console.log("Lista reseteada:");
  };

  const handleRating = () => {
    dispatch(addRating({ userId, movieId, score: Number(score) }));
  };

  const handleComment = () => {
    dispatch(addComment({ userId, movieId, text: comment }));
    setComment("");
    console.log("💬 Comentarios actualizados:");
  };

  //  SELECTORS 
  const selectedMovie = useSelector(selectMovieById(movieId)); // película seleccionada
  const movieComments = useSelector(selectCommentsByMovie(movieId)); // comentarios de esa película
  const userComments = useSelector(selectCommentsByUser(userId)); // comentarios de ese usuario
  const alreadyRated = useSelector(hasUserRatedMovie(userId, movieId)); // bool si ya puntuó

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
      <h2> Test de Funciones del Slice</h2>

      {/* Búsqueda */}
      <div style={{ marginBottom: "1rem" }}>
        <strong>Películas en estado:</strong> {movies.length}{" "}
        <input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} style={{ marginLeft: "0.5rem" }}>
          Buscar
        </button>
        {" | "}
        <button onClick={handleReset}>Resetear filtro</button>
      </div>

      <hr />

      {/* Rating */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Usuario:
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          >
            <option value="u001">Walter-u001</option>
            <option value="u002">Laura-u002</option>
            <option value="u003">Carlos-u003</option>
            <option value="u004">María-u004</option>
            <option value="u005">Pedro-u005</option>
          </select>
        </label>
        <br />
        <label>
          Película:
          <select
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          >
            {movies.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}-{m.id}-{m.averageScore}
              </option>
            ))}
          </select>
        </label>
        <br />
        <input
          type="number"
          min="1"
          max="5"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={handleRating}>Agregar Puntaje</button>
      </div>

      {/* Comentario */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Comentario"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={handleComment}>Agregar Comentario</button>
      </div>

      <hr />

      {/*  Ejemplos de uso de los SELECTORS */}
      <div style={{ marginTop: "1rem" }}>
        <h3>Selectors en acción</h3>

        <p>
          <strong>Película seleccionada:</strong>{" "}
          {selectedMovie ? selectedMovie.title : "Ninguna"}
        </p>

        <p>
          <strong>¿El usuario ya calificó esta película?</strong>{" "}
          {alreadyRated ? "✅ Sí" : "❌ No"}
        </p>

        <p>
          <strong>Comentarios de esta película:</strong>
        </p>
        <ul>
          {movieComments.map((c, i) => (<li key={i}>{c.userId}: {c.text}</li>))}
        </ul>

        <p>
          <strong>Comentarios del usuario {userId}:</strong>
        </p>
        <ul>
          {userComments.map((c, i) => (
            <li key={i}>
              {c.movieId}: {c.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
