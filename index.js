const countOfFilms = +prompt('Сколько фильмов ты пересмотрел?', []);

let personalMovieDB = {
    count: countOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

const a = prompt('Один из последних просмотренных фильомв?', '');
const b = prompt('На сколько оцените его?', '');
const c = prompt('Один из последних просмотренных фильомв?', '');
const d = prompt('На сколько оцените его?', '');

personalMovieDB.movies[a] = b;
personalMovieDB.movies[c] = d;

console.log(personalMovieDB);