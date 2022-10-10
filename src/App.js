import { Canvas } from "@react-three/fiber";
import UserInterface from "./UserInterface/index";
import React from "react";

function App() {
  return (
    <>
      <UserInterface />
      <Canvas></Canvas>
    </>
  );
}

export default App;
