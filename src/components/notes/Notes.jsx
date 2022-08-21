import NotesItem from "./NotesItem";
import { useContext } from "react";
import NotesContext from "../../context/notesContext";

export default function Notes() {
  const { notes } = useContext(NotesContext);

  return (
    <div className="notes-block">
      {notes.map((note, index) => {
        return (
          <NotesItem
            key={1/index}
            id={note.id}
            titleNote={note.title}
            contentNote={note.content}
            content={note}
          />
        );
      })}
    </div>
  );
};
