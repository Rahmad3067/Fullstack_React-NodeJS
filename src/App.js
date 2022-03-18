import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Article from './Components/Article';
import Admin from './Components/Admin';
// import Footer from './Components/footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import SubArticle from './Components/SubArticle';
import AddAdmin from "./Components/AdminPage/AddAdmin";
import AddArticle from "./Components/AdminPage/AddArticle";
import AllArticles from './Components/AllArticles';



export const LoginContext = React.createContext();

const App = () => {
  const [LogStatus, setLogStatus] = useState(false);
  const [EmailUser, setUserEmail] = useState();
  const [userID, setUserID] = useState();
  const [articleID, setArticleID] = useState();
  const [articleTitle, setArticleTitle] = useState();
  const [categoryID, setCategoryID] = useState();

  const value = {
    LogStatus: LogStatus,
    setLogStatus: setLogStatus,
    EmailUser: EmailUser,
    setUserEmail: setUserEmail,
    userID: userID,
    setUserID: setUserID,
    articleID: articleID,
    setArticleID: setArticleID,
    categoryID: categoryID,
    setCategoryID: setCategoryID,
    articleTitle: articleTitle,
    setArticleTitle: setArticleTitle
  };
  return (
    <LoginContext.Provider value={value}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/add-admin">
            <AddAdmin />
          </Route>
          <Route path="/add-adrticle">
            <AddArticle />
          </Route>
          <Route path="/add-subarticle">

            <SubArticle />

          </Route>
          <Route path="/article/:id">
            <Article />
          </Route>
          <Route path="/all-articles/:categoryID">
            <AllArticles />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
      {/* <Footer /> */}
    </LoginContext.Provider>
  );
};

export default App;

