import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
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
  const [notes, setNotes] = useState([
    {
      title: "teste",
      content: "teste",
    },
  ]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const hideButton = () => {
    setVisible(false)
  }

  const fetchNotes = async () => {
    const notesResponse = await fetch("http://localhost:5000/notes?_sort=id&_order=desc");
    const dataNotes = await notesResponse.json();
    setNotes(dataNotes);
  };

  const addNote = async (newNote) => {
    const responseNotes = await fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });
    const dataNote = await responseNotes.json();
    setNotes([dataNote, ...notes]);
  };

  const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
    });
    setNotes(notes.filter((note) => note.id !== id));
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
