import React from "react";

export default function Footer (){

    const Year = new Date().getFullYear();

return(
    <div className = "Footer">
        <p>Ane - {Year}</p>
    </div>

);

}