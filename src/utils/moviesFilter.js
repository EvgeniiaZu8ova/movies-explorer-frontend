export default function filterMovies(data, keyword) {
  const filteredMovies = data.filter((el) => {
    const filmNameRU = el.nameRU && el.nameRU.toLowerCase();
    const filmNameEN = el.nameEN && el.nameEN.toLowerCase();

    return (
      (filmNameRU && filmNameRU.includes(keyword)) ||
      (filmNameEN && filmNameEN.includes(keyword))
    );
  });

  return filteredMovies;
}
