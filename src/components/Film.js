import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

const FLEX_CENTER = `
  display: flex;
  justify-content: center;
  align-items: center
`;

const FilmContainer = styled.article`
  ${FLEX_CENTER};

  position: absolute;

  width: 100%;
  height: 70%;

  flex-direction: column;
  
  text-align: center;
      
  .crawl { width: 70%; }
   
`;

const FilmDetails = styled.div`
  width: 55%;

  display: flex;
  justify-content: space-around;
  align-items: center;
  
  text-align: center;
`;

export default function Film() {
  const [film, setFilm] = useState('');
  let {filmId} =  useParams();

  useEffect(() => {
    axios.get(`https://swapi.dev/api/films/${filmId}/`)
      .then(result => {
        setFilm(result.data);
      }).catch(console.log);
  }, [setFilm, filmId]);

  if (!film) return <div className="loading">Loading...</div>;

  return (
     <FilmContainer>
      <h1>{String(film.title).toUpperCase()}</h1>
      <div className={'crawl'}>
        <h3>Opening crawl</h3>
        <p>{film.opening_crawl}</p>
      </div>
      <FilmDetails>
        <div>
          <h3>Director</h3>
          <p>{film.director}</p>
        </div>
        <div>
          <h3>Producer</h3>
          <p>{film.producer}</p>
        </div>
        <div>
          <h3>Release date</h3>
          <p>{film.release_date}</p>
        </div>
      </FilmDetails>
    </FilmContainer>
  );
}