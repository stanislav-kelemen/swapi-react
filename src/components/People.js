import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

export default function People({filterPhrase}) {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios.get('https://swapi.dev/api/people/')
      .then(result => {
        setPeople(result.data.results);
      }).catch(console.log);
  }, [setPeople]);

  const filterPeople = useCallback(person => {
    const name = person.props.name.toLowerCase();
    const filter = filterPhrase.toLowerCase();

    return !filter ? true : name.indexOf(filter) !== -1;
  }, [filterPhrase]);

  const toPerson = useCallback((person, index) => {
    return (
      <PeopleListItem
        name={person.name}
        id={index + 1}
        key={person.name}
      />
    )
  }, []);


  if (!people) return <div className='loading'>Loading...</div>;


  return (
    <div>{people.map(toPerson).filter(filterPeople)}</div>
  )
}


function PeopleListItem ({name, id}) {
  return (
    <div>
      <Link to={`/${id}`}>
      {name}
      </Link>
    </div>
  );
}

