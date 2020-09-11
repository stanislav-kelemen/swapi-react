import React, {useCallback, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import styled, {ThemeProvider} from "styled-components";

import './App.css';

// import {darkTheme, lightTheme} from "./themes/themedObjects";
// import ThemesToggle from "./themes/ThemesToggle";

import SearchBar from "./components/SearchBar";
import People from "./components/People";
import Person from "./components/Person";

const FLEX_CENTER = `
  display: flex;
  justify-content: center;
  align-items: center
`;

const MAX_SPACE = `
  position: absolute;
  width: 100%;
  height: 100%
`;

const ThemesToggle = styled.button`
  position: absolute;
  z-index: 1000;

  top: 15px;
  left: 15px;

  width: 70px;
  height: 30px;
  
  background-color: ${props => props.theme.elemBackgroundColor};
  
  font-family: inherit;
  font-size: 1.01em;
  font-weight: 300;
  color: ${props => props.theme.blackWhite};
  
  border-radius: 15px;
  outline: none;
  border: 1px solid ${props => props.theme.blueOrange};
  box-shadow: 0 0 3px 1px ${props => props.theme.blueOrange};
`;


const ORANGISH = '#cb762b';
const BLUISH = '#249b79';

const darkTheme = {
  toggleName: 'Light',

  backgroundColor: '#151C29',
  elemBackgroundColor: '#1E2736',

  fontWeight: '300',

  orangeBlue: BLUISH,
  blueOrange: ORANGISH,

  blackWhite: 'white',

  searchBar: {
    boxShadow: 'none',
  }
};

const lightTheme = {
  toggleName: 'Dark',

  backgroundColor: '',
  elemBackgroundColor: 'white',

  fontWeight: '400',

  orangeBlue: ORANGISH,
  blueOrange: BLUISH,

  blackWhite: 'black',

  searchBar: {
    boxShadow: '0 0 1px 1px grey',
  }
};

const MainWrapper = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400&display=swap');

  ${MAX_SPACE};
  
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: ${props => props.theme.fontWeight};
  
  color: ${props => props.theme.blackWhite};
  background-color: ${props => props.theme.backgroundColor};
  
  a {
    color: ${props => props.theme.blackWhite};
    text-decoration: underline ${props => props.theme.blueOrange};

    &:hover { color: ${props => props.theme.blueOrange}; }
  }
    
  .back {
    position: absolute;

    width: 100%;
    bottom: 10px;
    margin-left: -10px;

    text-align: center;
    font-weight: bolder;
    color: ${props => props.theme.orangeBlue};
    text-decoration: none;
    
    &:before { content: '◄ '; }
  }
  
  .loading {
    ${FLEX_CENTER};
    ${MAX_SPACE};
  }
  
   h3 { color: ${props => props.theme.blueOrange} }
   
   h1 { color: ${props => props.theme.orangeBlue} }
`;


const CenterWrapperFlex = styled.main`
  ${FLEX_CENTER};
  ${MAX_SPACE};
`;

const StyledContainerMain = styled.article`
  ${FLEX_CENTER};
  
  position: absolute;

  width: 50%;
  height: 50%;

  flex-direction: column;
  flex-shrink: 0;
  
  text-align: center;
  font-size: 1.3em;
`;

const SearchBarWrapper = styled.article`
  width: 55%;
`;

const PeopleWrapper = styled.article`
  height: 90%;
  flex-shrink: 0;
`;

const darkThemeSaved = localStorage.getItem('darkTheme');
const currentTheme = (darkThemeSaved) ? darkTheme : lightTheme;

export default function App() {
  const [filterText, setFilterText] = useState('');
  const [theme, setTheme] = useState(currentTheme);

  const handleChangeInput = useCallback(text => {
    setFilterText(text);
  }, [setFilterText]);

  const themeChange = useCallback((e) => {
    if (theme === lightTheme) {
      e.target.innerHTML = 'Light';
      setTheme(darkTheme);
      localStorage.setItem('darkTheme', 'true');
    } else {
      e.target.innerHTML = 'Dark';
      setTheme(lightTheme);
      localStorage.removeItem('darkTheme');
    }
  }, [theme, setTheme]);


  return (
    <ThemeProvider theme={theme}>
      <MainWrapper>
        <ThemesToggle onClick={themeChange}>{theme.toggleName}</ThemesToggle>

          <Router basename={process.env.PUBLIC_URL}>
            <Switch>

              <Route path="/" exact>
                <CenterWrapperFlex>
                  <StyledContainerMain>

                    <SearchBarWrapper>
                      <SearchBar
                        text={filterText}
                        onChangeInput={handleChangeInput}
                      />
                    </SearchBarWrapper>

                    <PeopleWrapper>
                      <People filterPhrase={filterText} />
                    </PeopleWrapper>

                  </StyledContainerMain>
                </CenterWrapperFlex>
              </Route>

              <Route path={"/:personId"}>
                <Person />
              </Route>

            </Switch>
          </Router>
      </MainWrapper>
    </ThemeProvider>
  )
}
