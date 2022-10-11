import React from 'react';
import "../resume.css"
import { Button, Stack, ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";

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
 
  // TODO: add move up and down button
  function getItem(e,idx) {
    return (
        <Stack direction="horizontal">
          {Type({id:idx.toString(), value: e, idx: idx, onChange: changeSubsection})}
          <Stack direction="horizontal" className="mb-auto">
          <DropdownButton as={ButtonGroup} title="" variant="primary">
            <Dropdown.Item as="button">Move Up</Dropdown.Item>
            <Dropdown.Item as="button">Move Down</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item id={idx} onClick={removeSubsection} as="button">Remove</Dropdown.Item>
          </DropdownButton>
          </Stack>
        </Stack>
    )
  }



  return (
      <Stack direction="vertical">
        {list.map( (e,idx) => getItem(e,idx))}
        {enableAddButton? <Button  onClick={addSubsection} className="mx-auto" size="md">+</Button> : <></>}
      </Stack>
  )
  }