import "./../resume.css"
import { useState, useEffect } from "react"
import {Container, Row, Col, Stack, Form, InputGroup, Button} from 'react-bootstrap';
import { TemplateMap } from "./templateMap";



export default function BasicTemplateInput(props) {
    let section = props.section
    let changeSection = props.func

    const [enableSubtitle, changeSubtitleState] = useState(section.subTitle !== undefined);
    const [enableTechnology, changeTechnologyState] = useState(section.technologies !== undefined);

    // remove subtitle if unchecked
    useEffect(() => {
        if (!enableSubtitle) {
        changeSection(prevState => {
            const {subTitle, ...rest} = prevState
            return rest

        }) 
        } 
    }, [enableSubtitle]);
    
    // remove technologies if unchecked
    useEffect(() => {
        if (!enableTechnology) {
        changeSection(prevState => {
            const {technologies, ...rest} = prevState
            return rest

        }) 
        } 
    }, [enableTechnology]);

    // remove technologies from section if input is empty
    useEffect(() => {
        if (section.technologies && section.technologies.length === 0) {
        changeSection(prevState => {
            const {technologies, ...rest} = prevState
            return rest
        }) 
        } 
    }, [section]);

    return (
        <Stack direction="horizontal">
        <Container id="grid">
            <Stack>
            <Col xs="1"></Col>
            <InputGroup direction="horizontal">
                <Form.Control id="template-title" placeholder={"Subsection Title"} defaultValue={section.title} onChange={(e) => changeSection(prevState => ({...prevState, title: e.target.value}))}/>
                <Form.Control placeholder={"MMM YYYY - (MMM YYYY or Current)"}  defaultValue={section.date} size="sm" onChange={(e) => changeSection(prevState => ({...prevState, date: e.target.value}))}/>
            </InputGroup>
            <InputGroup direction="horizontal">
            <Form.Check label="add Subtitle" id="subTitle" className="mx-1" checked={enableSubtitle} onChange={() =>{changeSubtitleState(!enableSubtitle)}}/>
            {enableSubtitle? <Form.Control placeholder="subtitle" defaultValue={section.subTitle} size="sm" onChange={(e) => changeSection(prevSate => ({...prevSate, subTitle: e.target.value}))}/>: <></>}
            </InputGroup>
            <Stack direction="horizontal">
                <Col xs="1"></Col>
                <Stack direction="vertical">
                <ul>
                    {section.list.map( (e,idx) =>  <li key={idx}>
                    <Stack className="ms-auto" direction="horizontal">
                    <Form.Control id={idx.toString()} defaultValue={e} as="textarea" placeholder="Descriptor" onChange={(e) => {
                        var newList = section.list
                        newList[parseInt(e.currentTarget.id)] = e.target.value
                        changeSection((prevState) => ({...prevState, list : newList}))}}/>
                    <Button id={idx} onClick={(e) => {
                        var newList = section.list.filter((item, index) => index !== parseInt(e.currentTarget.id))
                        changeSection((prevState) => ({...prevState, list : newList}))}}>remove</Button>
                    </Stack>
                    </li>)}
                    <Button  onClick={() =>{changeSection( prevState => ({...prevState, 
                                                                            list: [...prevState.list, ""]
                                                                    }))}}>Add Line</Button>
                </ul>
                </Stack>
            </Stack>
            </Stack>
            <Row>
                <InputGroup direction="horizontal">
                    <Form.Check label="add technologies" checked={enableTechnology} id="technology" className="mx-1" onChange={() =>{changeTechnologyState(!enableTechnology)}}/>
                    {enableTechnology? <Form.Control placeholder="technologies" as="textarea" size="sm" defaultValue={section.technologies.join(" ,")} onChange={(e) =>
                                            changeSection(prevSate => ({...prevSate, 
                                                                    technologies: e.target.value
                                                                        .split(/,| ,| , /)
                                                                        .filter((item) => item.trim().length !== 0)
                                                                    }))}/>: <></>}
                </InputGroup>
            </Row>
            <div className="my-2"></div>
        </Container>
        </Stack>
    )
  }
