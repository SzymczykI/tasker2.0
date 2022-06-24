import { useState } from "react";
import "./App.css";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import Signup from "./components/Signup/Signup";
import Board from "./components/Board/Board";

const App = () => {
  const [user, setUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Nav
        user={user}
        setUser={setUser}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/login"
          element={
            <Login
              user={user}
              setUser={setUser}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              user={user}
              setUser={setUser}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          }
        />
        <Route
          path="/board"
          element={
            <Board user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
