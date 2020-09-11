import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, Route, Switch, useParams} from 'react-router-dom';
import styled from 'styled-components';

import FilmsList from './FilmsList';
import Film from './Film';

const FLEX_CENTER = `
  display: flex;
  justify-content: center;
  align-items: center
`;

const PersonInfoPage = styled.article`
  ${FLEX_CENTER};

  position: absolute;
  
  width: 100%;
  height: 87%;

  flex-direction: column;
  
  text-align: center;
  
  h3 { color: ${props => props.theme.blueOrange} }
  
  h1 { color: ${props => props.theme.blueOrange} }
`;

const PersonSection = styled.section`
  table { 
    border-collapse: collapse; 
    margin-top: 30px;
  }
  
  table, th, td {
    border: 1px solid ${props => props.theme.blackWhite};
    padding: 5px;
  }
  
  th { color: ${props => props.theme.orangeBlue}; }
`;

const FilmsSection = styled.section`
  margin-top: 10px;
`;


export default function Person( {match} ) {
  const [person, setPerson] = useState('');
  let {personId} = useParams();

  useEffect(() => {
    axios.get(`https://swapi.dev/api/people/${personId}/`)
      .then(result => {
        setPerson(result.data);
      }).catch(console.log);
  }, [setPerson, personId]);

  if (!person) return <div className='loading'>Loading...</div>;

  // fix mixed content errors on GitHub pages which occur due to insecure http requests
  const filmsUrls = person.films.map(str => str.replace('http', 'https'));

  return (
    <Switch>

      <Route exact path={`/${personId}/`}>
        <div>
          <PersonInfoPage>
            <PersonSection>
              <h3>Person</h3>
              <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>height</th>
                    <th>mass</th>
                    <th>hair</th>
                    <th>skin</th>
                    <th>eyes</th>
                    <th>birth</th>
                    <th>gender</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{person.name}</td>
                    <td>{person.height}</td>
                    <td>{person.mass}</td>
                    <td>{person.hair_color}</td>
                    <td>{person.skin_color}</td>
                    <td>{person.eye_color}</td>
                    <td>{person.birth_year}</td>
                    <td>{person.gender}</td>
                  </tr>
                </tbody>
              </table>
            </PersonSection>

            <FilmsSection>
              <h3>Films with {person.name}</h3>
              <FilmsList personId={personId} filmsUrls={filmsUrls} />
            </FilmsSection>

          </PersonInfoPage>
          <Link className='back' to="/">Back</Link>
        </div>
      </Route>


      <Route exact path={`/${personId}/:filmId/`}>
        <Film />
        <Link className='back' to={`/${personId}/`}>Back</Link>
      </Route>

    </Switch>
  );
}

