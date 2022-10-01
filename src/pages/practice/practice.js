import { useState, useEffect } from "react"
import "./../resume/resume.css"
import NavBar from "../../components/navBar/navBar";
import {Container, Row, Col, Stack, Form, InputGroup, Button} from 'react-bootstrap';

export default function Practice() {
  let initSection = {
    "title": "Subsection Name",
    "date": "MM YYYY - (MM YYYY or Current)",
    "list": ["Descriptor","Descriptor","Descriptor","Descriptor"]}

  //https://react-bootstrap.github.io/forms/validation/

  const [enableSubtitle, changeSubtitleState] = useState(false);
  const [enableTechnology, changeTechnologyState] = useState(false);
  

  const [section, changeSection] = useState(initSection);
  const [list, updateList] = useState(initSection.list);

  // only do if list is updated
  useEffect(() => {
    if (!enableSubtitle) {
      changeSection(prevState => {
        const {subTitle, ...rest} = prevState
        return rest

      }) 
    } 
    console.log(section)
  }, [enableSubtitle]);


  // <Form.Control type="color" ></Form.Control>
  return (
    <>
    <div id="all">
      <NavBar variant="light"/>
        <div id="resume">
          <Stack direction="horizontal">
          <Container id="grid">
            <Stack>
              <Col xs="1"></Col>
              <InputGroup direction="horizontal">
                <Form.Control id="template-title" placeholder={section.title} onChange={(e) => 
                                    changeSection(prevState => ({...prevState, title: e.target.value}))}/>
                <Form.Control placeholder={section.date} size="sm" onChange={(e) => 
                                    changeSection(prevState => ({...prevState, date: e.target.value}))}/>
              </InputGroup>
              <InputGroup direction="horizontal">
              <Form.Check label="add Subtitle" id="subTitle" className="mx-1" onChange={() =>{changeSubtitleState(!enableSubtitle)}}/>
              {enableSubtitle? <Form.Control placeholder="subtitle" size="sm" onChange={(e) => 
                                    changeSection(prevSate => ({...prevSate, subTitle: e.target.value}))}/>: <></>}
              </InputGroup>
              <Stack direction="horizontal">
                <Col xs="1"></Col>
                
                <InputGroup>
                  <ul>
                    {section.list.map( (e,idx) => 
                    <li key={idx}>
                      <Stack className="mx-1 ms-auto" direction="horizontal">
                      <Form.Control placeholder={e}/>
                      <Button className="ms-auto" id={idx} onClick={(e) => {
                        const removeIdx = e.currentTarget.id
                        console.log(removeIdx)
                        changeSection((prevState) => ({...prevState, list : prevState.list.filter((item, index) => index !== removeIdx)}))
                      }}>remove</Button>
                      </Stack>
                    </li>)}
                    <Button  onClick={() =>{
                          changeSection( prevState => ({
                            ...prevState,
                             list: [...prevState.list, "Descriptor"]
                            }))}}>Add Line</Button>
                  </ul>
                </InputGroup>
              </Stack>
            </Stack>
            <Row>
              <Col xs="1"></Col>

            </Row>
            <Row>
            <InputGroup direction="horizontal">
            <Form.Check label="add technologies" id="subTitle" className="mx-1" onChange={() =>{changeTechnologyState(!enableTechnology)}}/>
              {enableTechnology? <Form.Control placeholder="technologies" size="sm"/>: <></>}
              </InputGroup>
            </Row>
            <div className="my-2"></div>
          </Container>
          </Stack>
          {getBasicTemplate(section)}
        </div>
      </div>
    </> 
  )
  }


  function getBasicTemplate(section, enableBuild = false) {
    let items = []
    for (let i = 0; i < section.list.length; i++) {
      items.push(<li key={"list" + i}>{section.list[i]}</li>)
    }
      return (
        <Container id="grid">
            <Row>
              <Stack direction="horizontal">
                <Col xs="1"></Col>
                <div id="template-title">{section.title}</div>
                <div id="template-small" className="ms-auto"> {section.date}</div>
              </Stack>
              <Stack direction="horizontal">
                <Col xs="1"></Col>
                <div id="template-small">{section.subTitle? section.subTitle:""}</div>
              </Stack>
            </Row>
            <Row>
              <Col xs="1"></Col>
              <Col><ul>{items}</ul></Col>
            </Row>
            <Row>
            {section.technologies ?
                <>
                  <Col xs="1"></Col>
                  <Col id="technologies"><span id="technologies-title">Technologies: </span>{section.technologies.join(", ")}</Col>
                  </>: <></>}
            </Row>
            <div className="my-2"></div>
          </Container>
      )
  }