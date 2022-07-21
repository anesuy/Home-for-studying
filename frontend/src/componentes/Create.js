import React from "react";
import axios from "axios";
const apiUrl = "http://localhost:4000";

export default function Create() {
  const [note, setNote] = React.useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    setNote({
      title: "",
      content: "",
    });

    const newNote = {
      title: note.title,
      content: note.content,
    };

    event.preventDefault();

    axios.post(apiUrl, newNote);
    console.log(note);
  }

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

        <button name="submit_button" onClick={submitNote}>
          Adicionar
        </button>
      </form>
    </div>
  );
}
