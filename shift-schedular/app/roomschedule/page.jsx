"use client";

import { useEffect } from "react"

export default function RoomSheduleComponent(){

    useEffect(()=>{

        let data =localStorage.getItem("blocksdata")

        let paresedData =JSON.parse(data)

        console.log("paresedData",paresedData);
        
    })

    return(

    
        <>
<h1>RoomSheduleComponent</h1>
        </>
    )
}