import NotesItem from "./NotesItem";
import { useContext } from "react";
import NotesContext from "../../context/notesContext";

export default function Notes() {
  const { notes } = useContext(NotesContext);

  return (
    <>
      {notes.map((note) => {
        return (
          <NotesItem
            key={note.id}
            id={note}
            titleNote={note.title}
            contentNote={note.content}
            content={note}
          />
        );
      })}
    </>
  );
};
