import axios from "axios";
import { createContext, useState, useEffect, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
const API = process.env.API_LOCALHOST;

const JSON_API = axios.create({
  baseURL: API,
 })

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

  const isVisibleRef = useRef({value:true})
  const [notes, setNotes] = useState([]);
  const marginArray = ["-25px auto 10px auto ", "10px auto"];
  const [margin, setMargin] = useState(marginArray[1])
  
  useEffect(() => {
    fetchNotes();
  }, []);

  const hideButton = useCallback(() => {
    isVisibleRef.current.value = !isVisibleRef.current.value;
    if (isVisibleRef.current.value === true) {
      return setMargin(marginArray[0]) }
    else { setMargin(marginArray[1]) }
  }, [isVisibleRef.current.value, margin]);

  const fetchNotes = async () => {
    const notesResponse = await JSON_API.get("/notes");
    const dataNotes = notesResponse.data;
    setNotes(dataNotes);
  };

  const addNote = async (newNote) => {
    try {
      const responseNotes = await JSON_API.post(`/notes`,
        { title: newNote.title,
          content: newNote.content,
          id: newNote.id,
        })
       const dataNote = responseNotes.data;
        setNotes([dataNote, ...notes]);
        console.log(dataNote)
        fetchNotes()
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await JSON_API.delete(`/notes/${id}`)
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
        visible: isVisibleRef,
        deleteNote: deleteNote,
        addNote: addNote,
        note: note,
        setNote: setNote,
        handleSubmit: handleSubmit,
        handleChange: handleChange,
        hideButton: hideButton,
        margin: margin,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;
