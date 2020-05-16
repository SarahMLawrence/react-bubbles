//==========//
//  IMPORTS //
//==========//
import React, { useState, useEffect } from "react";
import { AxiosWithAuth } from "../util/AxiosWithAuth";
import ColorList from "./ColorList";
import Bubbles from "./Bubbles";

//=============//
//  COMPONENT  //
//=============//
const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    AxiosWithAuth()
      .get("/api/colors")
      .then((res) => {
        setColorList(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Error", props);
      });
  }, [props]);

  return (
    <>
      <ColorList props={props} colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
