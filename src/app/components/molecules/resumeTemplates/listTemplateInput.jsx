import React from 'react';
import "../../../myResume/resume.css"
import { Button, Stack, ButtonGroup, Dropdown } from "react-bootstrap";
import { BsFillArrowDownSquareFill, BsFillArrowUpSquareFill, BsFillPlusSquareFill } from "react-icons/bs"

export default function ListTemplateInput(props) {
  let list = props.list
  let updateList = props.func
  let Type = props.type
  let addListDefault = props.addListDefault
  let enableAddButton = props.disableAddButton? false : true
  if (list === undefined) return
  if (updateList === undefined) return


  function addSubsection() {
    list[list.length] = addListDefault
    updateList(list)
  }

  function changeSubsection(newSubsection, idx) {
    list[idx] = newSubsection
    updateList(list)
  }

  function removeSubsection(e) {
    list.splice(parseInt(e.target.id), 1)
    updateList(list)
  }

  function moveUp(idx) {
    if (idx !== 0) {
      const cup = list[idx-1]
      list[idx-1] = list[idx]
      list[idx] = cup
      updateList(list)
    }
  }

  function moveDown(idx) {
    if (idx !== list.length - 1) {
      const cup = list[idx+1]
      list[idx+1] = list[idx]
      list[idx] = cup
      updateList(list)
    }
  }
 
  // TODO: add move up and down button
  function getItem(e,idx) {
    return (
      <Stack direction="horizontal">
        {Type({id:idx.toString(), value: e, idx: idx, onChange: changeSubsection})}
        <Stack direction="horizontal" className="mb-auto">
        <Dropdown  as={ButtonGroup} variant="primary" id="list-drop-down">
          <Dropdown.Toggle/>
          <Dropdown.Menu flip className="m-0 p-0 align-items-center justify-content-center text-center">
              <ButtonGroup>
                <Button variant="primary-outline" size='lg' onClick={() => {moveUp(idx)}}><BsFillArrowUpSquareFill/></Button>
                <Button variant="primary-outline" size='lg' onClick={() => {moveDown(idx)}}><BsFillArrowDownSquareFill/></Button>
              </ButtonGroup>
              <Dropdown.Item id="list-template-remove" onClick={removeSubsection} as="button" >Remove</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </Stack>
      </Stack>
    )
  }



  return (
    <Stack direction="vertical">
      {list.map( (e,idx) => getItem(e,idx))}
      {enableAddButton? <Button  onClick={addSubsection} className="mx-auto" size="lg" variant='primary-outline'><BsFillPlusSquareFill/></Button> : <></>}
    </Stack>
  )
  }