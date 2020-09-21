import React from "react";

import FilmsListItem from "./FilmsListItem";

export default function FilmsList({ personId, filmsUrls }) {
  const toFilm = (filmUrl, index) => (
    <FilmsListItem
      personId={personId}
      key={filmUrl}
      id={index + 1}
      url={filmUrl}
    />
  );

  return filmsUrls.map(toFilm);
}
