import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const axios = require("axios").default;

  //------ CREATING NOTES

  const [note, setNote] = useState({
    id: 0,
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      title: note.title,
      content: note.content,
      id: uuidv4(),
    };
    addNote(newNote);
    setNote({
      title: "",
      content: "",
    });
    console.log(newNote);
  };

  //------ NOTES

  const [visible, setVisible] = useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  },[]);

  const hideButton = () => {
    setVisible(false);
  };

  const fetchNotes = async () => {
    try {
      const notesResponse = await axios.get(
        "http://localhost:5000/notes?_sort=id&_order=desc"
      );
      const dataNotes = notesResponse.data;
      setNotes(dataNotes);
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async (newNote) => {
    try {
      const responseNotes = await axios.post("http://localhost:5000/notes",
      { title: newNote.title,
        content: newNote.content,
        id: uuidv4()
        
      }).then(() => {
        const dataNote = responseNotes.data;
        setNotes([dataNote, ...notes]);
        console.log(dataNote)
      })
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`)
      .then(() => {
        setNotes(notes.filter((note) => note.id !== id));
      });
    } catch (error) {
      console.log(error);
    }
  };

  // setTimeout(() => {
  //   setVisible(false);
  // }, 5000);

  return (
    <NotesContext.Provider
      value={{
        notes: notes,
        setNotes: setNotes,
        visible: visible,
        setVisible: setVisible,
        deleteNote: deleteNote,
        addNote: addNote,
        note: note,
        setNote: setNote,
        handleSubmit: handleSubmit,
        handleChange: handleChange,
        hideButton: hideButton,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;
