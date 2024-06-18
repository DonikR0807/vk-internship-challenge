import { SearchedMovie } from "../Redux/Entities/SearchedMovies/searchedMoviesSlice";

export const saveRecentSearch = (searchResult: SearchedMovie) => {
  const recentSearch = localStorage.getItem("recentSearch");

  if (recentSearch) {
    const recentSearchedMovies: SearchedMovie[] = JSON.parse(recentSearch);

    if (
      !recentSearchedMovies.find((recentMovie) => {
        return recentMovie.id === searchResult.id;
      })
    ) {
      recentSearchedMovies.unshift(searchResult);
    }

    if (recentSearchedMovies.length > 10) {
      recentSearchedMovies.pop();
    }

    localStorage.setItem("recentSearch", JSON.stringify(recentSearchedMovies));
  } else {
    const newRecentSearchArr = [];
    newRecentSearchArr.push(searchResult);
    localStorage.setItem("recentSearch", JSON.stringify(newRecentSearchArr));
  }
};
