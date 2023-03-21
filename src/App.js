import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Main from "./routes/Main";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Edit from "./routes/Edit";
import CatList from "./routes/CatList";
function App() {
  const [cats, setCats] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:8080/cats")
      .then((result) => {
        setCats(result.data);
      })
      .catch(() => {
        console.log("fail");
      });
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Main cats={cats} setCats={setCats} user={user} setUser={setUser} />
          }
        />
        <Route
          path="/login"
          element={<Login setUser={setUser} user={user} />}
        />
        <Route
          path="/catlist"
          element={
            <CatList
              cats={cats}
              setCats={setCats}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/edit" element={<Edit cats={cats} setCats={setCats} />} />
      </Routes>
    </>
  );
}

export default App;
