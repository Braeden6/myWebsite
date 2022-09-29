import { useState } from "react"
import "./practice.css"
import {Tooltip, Button, OverlayTrigger} from 'react-bootstrap';
import NavBar from "../../components/navBar/navBar";
import {Stack} from 'react-bootstrap';

export default function Practice() {
    
  return (
    <>
          <NavBar variant="dark"/>
          <Stack direction="horizontal">
            <div id="test1">word:</div>
            <div id="test3" className="ms-auto"> more words</div>
          </Stack>
    </> 
  )
  }





// Search Bar
/*
export default function Practice() {
    const [count, setCount] = useState("test")


    const list = ["fruit", "fail", "something", "test", "job"]



    function update(value) {
        setCount(value)
    }

    return (
      <div>
        <input 
        value={count}
        onChange={(e) => update(e.target.value)}
        />
        <label>{count}</label>
        {getSearch(list, count)}
      </div>
    )
  }


  function getSearch(list, search) {
    const rows = []
    for (let i = 0; i < list.length; i++) {
      if (list[i].includes(search)) {
        rows.push(<p>{list[i]}</p>)
      }
      
    }
    return <>{rows}</>
  }*/