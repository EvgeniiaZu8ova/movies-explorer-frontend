export default function filterShortMovies(data) {
  const filteredShortMovies = data.filter((el) => {
    const { duration = 0 } = el;
    return duration <= 40;
  });

  return filteredShortMovies;
}
