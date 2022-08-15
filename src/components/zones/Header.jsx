import React from "react";
import { useContext } from "react";
import NotesContext from "../../context/notesContext";

export default function Header() {
  const { visible, hideButton } = useContext(NotesContext);

  const dateToday = new Date();

  const hour = dateToday.getHours();
  const minute = dateToday.getMinutes();
  const second = dateToday.getSeconds();

  const [hours, setHours] = React.useState(hour);
  const [minutes, setMinutes] = React.useState(minute);
  const [seconds, setSeconds] = React.useState(second);

  const handleChangeHours = () => {
    setHours(new Date().getHours());
  };

  const handleChangeMinutes = () => {
    setMinutes(new Date().getMinutes());
  };

  const handleChangeSeconds = () => {
    setSeconds(new Date().getSeconds());
  };

  React.useEffect(() => {
    setInterval(() => {
      handleChangeHours();
      handleChangeMinutes();
      handleChangeSeconds();
      // console.log(seconds);
    }, 1000);
  }, []);

  if (visible === true) {
    return (
      <div>
        <div className="relogio">
          <div>
            <span id="horas" name="horas">
              {hours < 10 ? "0" + hours : hours}
            </span>
            <span className="tempo">Horas</span>
          </div>

          <div>
            <span id="minutos" name="minutos">
              {minutes < 10 ? "0" + minutes : minutes}
            </span>
            <span className="tempo">Minutos</span>
          </div>

          <div>
            <span id="segundos" name="segundos">
              {seconds < 10 ? "0" + seconds : seconds}
            </span>
            <span className="tempo">Segundos</span>
          </div>
        </div>
        <div>
          <button className="hide-button"> Hide </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="hide-button">
        <button type="submit" onClick={() => hideButton()}> Unhide Clock </button>
      </div>
    );
  }
}
