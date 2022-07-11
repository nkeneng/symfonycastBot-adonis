import React from "react";
import {
  Routes,
  Route
} from 'react-router-dom'
import Home from "./Components/Home";
import Downloading
  from "./Components/Downloading";
import Finished from "./Components/Finished";

export default function App() {
  return (
    <Routes>
      <Route  path="/"
             element={<Home/>}/>
      <Route path="/downloading"
             element={<Downloading/>}/>
      <Route path="/finished"
             element={<Finished/>}/>
    </Routes>
  )
}
