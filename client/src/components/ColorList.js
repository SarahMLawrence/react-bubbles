//==========//
//  IMPORTS //
//==========//
import React, { useState } from "react";
import { AxiosWithAuth } from "../util/AxiosWithAuth";
import "../styles.css";

const initialColor = {
  color: "",
  code: { hex: "" },
};

//=============//
//  COMPONENT  //
//=============//
const ColorList = ({ props, colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setAddColor] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  //=======================//
  // PUT REQUEST  - SAVE   //
  //=======================//
  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    AxiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(() => {
        setEditing(false);
        props.history.push("/bubble-page");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //=========================//
  // DELETE REQUEST - DELETE //
  //=========================//
  const deleteColor = (color) => {
    AxiosWithAuth().delete(`api/colors/${color.id}`);
    props.history.push("/bubble-page");
    
  };

  //=======================//
  // POST REQUEST  - ADD   //
  //=======================//
  const addColor = (e) => {
    e.preventDefault();
    AxiosWithAuth()
      .post("/api/colors/", addColor)
      .then((res) => {
        updateColors([...colors, colorToAdd]);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <div className="addColor">
        <label>
          color:
          <input
            onChange={(e) =>
              setAddColor({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex:
          <input
            onChange={(e) =>
              setAddColor({ ...colorToAdd, hex: e.target.value })
            }
            value={colorToAdd.color.hex}
          />
        </label>
        <button className="addBtn" onClick={addColor}>
          Add Color
        </button>
      </div>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>

          <div className="button-row">
            <button type="submit">save</button>

            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
