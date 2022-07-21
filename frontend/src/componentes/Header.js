import React from "react";

export default function Header() {
  //const [time, setTime] = React.useState();
  const year = new Date().getFullYear();
  const m = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Aoutubro",
    "Novembro",
    "Dezembro",
  ];
  const date = m[new Date().getMonth()];

  //function updateTime(){
  //onst agora = new Date().getHours();
  //return setTime(agora);
  //}

  return (
    <header div="header-image">
      <h1>
        {date} de {year}
      </h1>
    </header>
  );
}
