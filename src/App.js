import React from "react";
import Postview from "./components/post/postview";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Singlepost from "./components/post/Singlepost";
import Navbar from "./components/header/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Userprofile from "./components/auth/Userprofile";
import Header from "./components/header/Header";
import Createpost from "./components/post/Create-post";
import Footer from "./components/header/Footer";
import Aboutus from "./components/header/Aboutus";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Header />
        <Switch>
          <Route exact path="/">
            <Postview />
          </Route>
          <Route exact path="/posts/create-new-post/">
            <Createpost />
          </Route>
          <Route path="/posts/:id">
            <Singlepost />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/user/:name">
            <Userprofile />
          </Route>
          <Route path="/about-us">
            <Aboutus />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
