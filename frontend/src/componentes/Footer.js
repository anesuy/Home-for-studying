import React from "react";

export default function Footer(){

    const ano = new Date().getFullYear();

    return(
        <footer>
            <p>{ano}</p>
        </footer>
    )
}