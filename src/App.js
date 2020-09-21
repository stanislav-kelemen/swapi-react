import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import "./App.css";

import { darkTheme, lightTheme } from "./themes/themedObjects";
import ThemesToggle from "./themes/ThemesToggle";

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

const MainWrapper = styled.div`
  ${MAX_SPACE};

  font-family: "Noto Sans JP", sans-serif;
  font-weight: ${(props) => props.theme.fontWeight};

  color: ${(props) => props.theme.blackWhite};
  background-color: ${(props) => props.theme.backgroundColor};

  a {
    color: ${(props) => props.theme.blackWhite};
    text-decoration: underline ${(props) => props.theme.blueOrange};

    &:hover {
      color: ${(props) => props.theme.blueOrange};
    }
  }

  .back {
    position: absolute;

    width: 100%;
    bottom: 10px;
    margin-left: -10px;

    text-align: center;
    font-weight: bolder;
    color: ${(props) => props.theme.orangeBlue};
    text-decoration: none;

    &:before {
      content: "◄ ";
    }
  }

  .loading {
    ${FLEX_CENTER};
    ${MAX_SPACE};
  }

  h3 {
    color: ${(props) => props.theme.blueOrange};
  }

  h1 {
    color: ${(props) => props.theme.orangeBlue};
  }
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
  font-size: 20px;
`;

const SearchBarWrapper = styled.article`
  width: 55%;
`;

const PeopleWrapper = styled.article`
  height: 90%;
  flex-shrink: 0;
`;

const darkThemeSaved = localStorage.getItem("darkTheme");
const currentTheme = darkThemeSaved ? darkTheme : lightTheme;

export default function App() {
  const [filterText, setFilterText] = useState("");
  const [theme, setTheme] = useState(currentTheme);

  const themeChange = (e) => {
    if (theme === lightTheme) {
      e.target.innerHTML = "Light";
      setTheme(darkTheme);
      localStorage.setItem("darkTheme", "true");
    } else {
      e.target.innerHTML = "Dark";
      setTheme(lightTheme);
      localStorage.removeItem("darkTheme");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <MainWrapper>
        <ThemesToggle onClick={themeChange}>{theme.toggleName}</ThemesToggle>

        <HashRouter basename="/">
          <Switch>
            <Route path="/" exact>
              <CenterWrapperFlex>
                <StyledContainerMain>
                  <SearchBarWrapper>
                    <SearchBar
                      text={filterText}
                      onChangeInput={(text) => {
                        setFilterText(text);
                      }}
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
        </HashRouter>
      </MainWrapper>
    </ThemeProvider>
  );
}
