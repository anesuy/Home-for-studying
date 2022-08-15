import React, { useContext } from "react";
import NotesContext from "../../context/notesContext";

export default function Create() {

  const { handleChange, note, handleSubmit } = useContext(NotesContext);
  
  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          name="title"
          value={note.title}
          placeholder="Title"
        ></input>

        <textarea
          onChange={handleChange}
          name="content"
          value={note.content}
          placeholder="Describe your work"
          row="3"
        ></textarea>

        <button type="submit" onClick={handleSubmit}>
          Adicionar
        </button>
      </form>
    </div>
  );
}
