import "../resume.css"
import { Button, Stack, Col } from "react-bootstrap";

export default function ListTemplateInput(props) {
  let list = props.list
  let updateList = props.func
  let Type = props.type
  let addListDefault = props.addListDefault
  let enableBulletPoint = props.enableBulletPoint? true: false
  let changeWithIndex = props.changeWithIndex? true: false


  function addSubsection() {
    list[list.length] = addListDefault
    updateList(list)
  }

  function changeSubsectionWithIndex (newSubsection, idx) {
    list[idx] = newSubsection
    updateList(list)
  }

  function changeSubsectionWithoutIndex (e) {
    list[parseInt(e.currentTarget.id)] = e.target.value
    updateList(list)
  }

  function removeSubsection(e) {
    list.splice(parseInt(e.target.id), 1)
    updateList(list)
  }

  // TODO: add move up and down button
  function getItem(e,idx) {
    return (
      <Stack className="ms-auto" direction="horizontal">
        <Type id={idx.toString()} value={e} section={e} idx={idx} as="textarea" onChange={changeWithIndex ? changeSubsectionWithIndex : changeSubsectionWithoutIndex}/>
        <Stack className="mb-auto" direction="horizontal">
          <Button size="sm" id={idx} onClick={removeSubsection}>-</Button>
          <Button size="sm">^</Button>
          <Button size="sm">v</Button>
        </Stack>
      </Stack>
    )
  }

  function getList() {
    return (
      list.map( (e,idx) => <>{enableBulletPoint? <li>{getItem(e,idx)}</li> : getItem(e,idx)}</>)
    )
  }


  return (
    <>
      {enableBulletPoint? <ul>{getList()}</ul> : getList()}
      <Stack direction="horizontal">
        <Col xs="1" key="spacer"/>
        <Button  onClick={addSubsection}>+</Button>
      </Stack>
    </>
  )
  }