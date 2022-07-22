import React from "react";
import { state } from "react";
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import Create from "./componentes/Create";
import Notes from "./componentes/Notes";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const apiUrl = "http://localhost:4000/notes";

export default function App() {
  state = {
    notes: [],
    currentNote: {
      title: "",
      content: "",
    },
  };

  function deleteNote(id) {
    return axios.delete(apiUrl + "/" + id);
  }

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      searchNote();
    } catch (err) {
      console.log(err);
    }
  };

  const [notes, setNotes] = React.useState([]);

  const searchNote = () => {
    fetch("/notes")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setNotes(jsonRes));
  };

  React.useEffect(() => {
    searchNote();
  }, []);

  return (
    <div>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Create submitClick={() => searchNote()} />
                {notes.map((note) => (
                  <Notes
                    key={note._id}
                    title={note.title}
                    content={note.content}
                    onDelete={() => handleDelete(note._id)}
                  />
                ))}
              </>
            }
          />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}
