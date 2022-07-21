import React from "react";
import axios from "axios";
import { BiTrashAlt } from "react-icons/bi";
const apiUrl = "http://localhost:4000/notes";

// export function deleteNote(id) {
//   return axios.delete(apiUrl + "/" + id);
// }

export default function Notes(props) {
  //   const [notes, setNotes]= React.useState([{
  //     title:"",
  //     content:""
  //   }])

  // React.useEffect(()=> {
  // fetch("/notes").then(res => {
  //     if(res.ok){
  //         return res.json();
  //     }

  // }).then(jsonRes => setNotes(jsonRes));
  // })

  function handleClick(id) {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button type="button" name="delete_button" onClick={handleClick}>
        <BiTrashAlt />{" "}
      </button>
    </div>
  );
}
