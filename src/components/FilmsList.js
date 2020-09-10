import React, {useCallback} from "react";

import FilmsListItem from "./FilmsListItem";

export default function FilmsList({personId, filmsUrls}) {
  const toFilm = useCallback((filmUrl, index) => {
    return (
      <FilmsListItem personId={personId} key={filmUrl} id={index + 1} url={filmUrl}/>
    );
  }, [personId]);


  return (
    filmsUrls.map(toFilm)
  );
}