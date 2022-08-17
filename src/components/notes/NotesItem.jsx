import { useContext } from "react";
import { BiTrashAlt } from "react-icons/bi";
import NotesContext from "../../context/notesContext";

export default function NotesItem({titleNote, contentNote, id}) {

  const { deleteNote } = useContext(NotesContext);

  return (
    <div className="note">
      <h1>{titleNote} </h1>
      <p>{contentNote}</p>
      <button onClick={() => deleteNote(id)}>
        <BiTrashAlt />{" "}
      </button>
    </div>
  );
}
