// ================== MOVIES ==================
const movies = [
  {
    id: "m001",
    title: "Inception",
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    synopsis:
      "Un ladrón especializado en robar secretos mediante sueños compartidos recibe la tarea de implantar una idea en la mente de un empresario.",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    averageScore: 8.8,
    image: "https://m.media-amazon.com/images/I/51K8ouYrHeL._AC_.jpg",
  },
  {
    id: "m002",
    title: "The Shawshank Redemption",
    year: 1994,
    genre: ["Drama"],
    synopsis:
      "Un hombre es encarcelado por un crimen que no cometió y encuentra amistad y esperanza mientras cumple su condena.",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    averageScore: 9.3,
    image: "https://m.media-amazon.com/images/I/519NBNHX5BL._AC_.jpg",
  },
  {
    id: "m003",
    title: "The Godfather",
    year: 1972,
    genre: ["Crime", "Drama"],
    synopsis:
      "La saga de la familia mafiosa Corleone y su lucha por mantener el poder y la lealtad dentro del crimen organizado.",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    averageScore: 9.2,
    image: "https://m.media-amazon.com/images/I/41+eK8zBwQL._AC_.jpg",
  },
  {
    id: "m004",
    title: "Interstellar",
    year: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    synopsis:
      "Un grupo de exploradores viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    averageScore: 8.6,
    image: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",
  },
  {
    id: "m005",
    title: "Pulp Fiction",
    year: 1994,
    genre: ["Crime", "Drama"],
    synopsis:
      "Historias entrelazadas de criminales en Los Ángeles que muestran violencia, humor y redención.",
    cast: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
    averageScore: 8.9,
    image: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
  },
  {
    id: "m006",
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    synopsis:
      "Batman debe enfrentarse al Joker, un criminal caótico que amenaza con sumir a Gotham en el caos.",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    averageScore: 9.0,
    image: "https://m.media-amazon.com/images/I/51k0qa6qD8L._AC_.jpg",
  },
  {
    id: "m007",
    title: "Forrest Gump",
    year: 1994,
    genre: ["Drama", "Romance"],
    synopsis:
      "La vida extraordinaria de Forrest Gump, un hombre con un cociente intelectual bajo que presencia hechos históricos mientras sigue su corazón.",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    averageScore: 8.8,
    image: "https://m.media-amazon.com/images/I/61Kc0xwXQeL._AC_SY679_.jpg",
  },
  {
    id: "m008",
    title: "The Matrix",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    synopsis:
      "Un hacker descubre que el mundo que conoce es una simulación creada por máquinas y se une a la resistencia humana.",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    averageScore: 8.7,
    image: "https://m.media-amazon.com/images/I/51vpnbwFHrL._AC_.jpg",
  },
  {
    id: "m009",
    title: "Gladiator",
    year: 2000,
    genre: ["Action", "Drama"],
    synopsis:
      "Un general romano traicionado busca venganza mientras se convierte en gladiador en el Coliseo.",
    cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
    averageScore: 8.5,
    image: "https://m.media-amazon.com/images/I/51A4oFqhdGL._AC_.jpg",
  },
  {
    id: "m010",
    title: "Titanic",
    year: 1997,
    genre: ["Drama", "Romance"],
    synopsis:
      "Historia de amor entre Jack y Rose durante el trágico hundimiento del RMS Titanic.",
    cast: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane"],
    averageScore: 7.9,
    image: "https://m.media-amazon.com/images/I/71rNJQ2g-EL._AC_SY679_.jpg",
  },
];


// ================== USERS ==================
const users = [
  {
    id: "u001",
    name: "Walter",
    email: "walter@example.com",
    password: "walter123",
  },
  {
    id: "u002",
    name: "Laura",
    email: "laura@example.com",
    password: "laura123",
  },
  {
    id: "u003",
    name: "Carlos",
    email: "carlos@example.com",
    password: "carlos123",
  },
  {
    id: "u004",
    name: "María",
    email: "maria@example.com",
    password: "maria123",
  },
  {
    id: "u005",
    name: "Pedro",
    email: "pedro@example.com",
    password: "pedro123",
  },
];
    

// ================== SCORES ==================
const scores = [
  { userId: "u001", movieId: "m001", score: 5 },
  { userId: "u001", movieId: "m002", score: 4 },
  { userId: "u001", movieId: "m003", score: 5 },
  { userId: "u001", movieId: "m004", score: 4 },
  { userId: "u001", movieId: "m005", score: 3 },
  { userId: "u002", movieId: "m001", score: 2 },
  { userId: "u002", movieId: "m006", score: 1 },
  { userId: "u002", movieId: "m007", score: 2 },
  { userId: "u002", movieId: "m008", score: 5 },
  { userId: "u002", movieId: "m010", score: 4 },
  { userId: "u003", movieId: "m002", score: 1 },
  { userId: "u003", movieId: "m003", score: 3 },
  { userId: "u003", movieId: "m004", score: 1 },
  { userId: "u003", movieId: "m009", score: 4 },
];

// ================== COMMENTS ==================
const comments = [
  { userId: "u001", movieId: "m001", text: "Me voló la cabeza" },
  { userId: "u001", movieId: "m001", text: "Increíble historia y efectos" },
  { userId: "u001", movieId: "m001", text: "Quiero verla otra vez" },
  { userId: "u001", movieId: "m002", text: "Muy emotiva" },
  { userId: "u001", movieId: "m002", text: "Bien actuada" },
  { userId: "u001", movieId: "m003", text: "Un clásico que nunca falla" },
  { userId: "u001", movieId: "m004", text: "Visualmente impresionante" },
  { userId: "u001", movieId: "m004", text: "Emocionante" },
  { userId: "u001", movieId: "m005", text: "Diálogos geniales" },
  { userId: "u001", movieId: "m005", text: "Trama entretenida" },

  { userId: "u002", movieId: "m001", text: "Buena película" },
  { userId: "u002", movieId: "m001", text: "Un poco confusa" },
  { userId: "u002", movieId: "m006", text: "Heath Ledger es increíble" },
  { userId: "u002", movieId: "m007", text: "Historia conmovedora" },
  { userId: "u002", movieId: "m008", text: "Clásico de la ciencia ficción" },
  { userId: "u002", movieId: "m010", text: "Romántica pero triste" },

  { userId: "u003", movieId: "m002", text: "Una de mis favoritas" },
  { userId: "u003", movieId: "m002", text: "Emotiva" },
  { userId: "u003", movieId: "m003", text: "Excelente dirección" },
  { userId: "u003", movieId: "m003", text: "Actuaciones impecables" },
  { userId: "u003", movieId: "m004", text: "Gran viaje espacial" },
  { userId: "u003", movieId: "m004", text: "Muy emocionante" },
  { userId: "u003", movieId: "m009", text: "Acción épica" },
  { userId: "u003", movieId: "m009", text: "Algo predecible" },
];

// ================== EXPORT ==================
export { movies, users, scores, comments };
