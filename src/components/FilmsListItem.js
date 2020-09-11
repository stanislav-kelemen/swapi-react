import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';


export default function FilmsListItem({url, id, personId}) {
  const [film, setFilm] = useState('');

  useEffect(() => {
    axios.get(url)
      .then(result => {
        setFilm(result.data);
      }).catch(console.log);
  }, [url, setFilm]);


  if (!film) return <br/>;

  return (
    <div>
      <Link to={`/${personId}/${id}/`}>
        {film.title}
      </Link>
    </div>
  );
}