import React, {useCallback} from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  position: relative;

  height: 40px;
  width: 100%;
  
  background-color: ${props => props.theme.elemBackgroundColor};

  font-family: inherit;
  color: inherit;
  font-size: 1.1em;
  font-weight: 300;
  text-align: center;

  border: none;
  border-radius: 20px;
  box-shadow: ${props => props.theme.searchBar.boxShadow};
  
  margin-bottom: 30px;
  
  &:focus {
    border: none;
    outline: none;
    box-shadow: 0 0 1px 1px ${props => props.theme.orangeBlue},
                0 0 5px 1px ${props => props.theme.orangeBlue};
  }
  
  &::placeholder { 
   color: ${props => props.theme.orangeBlue}; 
  }
`;

export default function SearchBar({onChangeInput, text}) {
  const handleOnChange = useCallback((e) => {
    onChangeInput(e.target.value);
  }, [onChangeInput]);

  return  (
    <form>
      <StyledInput
        onFocus={(e) => e.target.placeholder = ''}
        onBlur={(e) => e.target.placeholder = e.target.value || 'Search'}

        type="text"
        placeholder="Search"
        value={text}
        onChange={handleOnChange}
      />
    </form>
  );
}