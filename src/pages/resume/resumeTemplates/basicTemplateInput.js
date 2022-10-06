import "./../resume.css"
import { useState, useEffect } from "react"
import {Container, Row, Col, Stack, Form, InputGroup} from 'react-bootstrap';
import ListTemplateInput from "./listTemplateInput";



export default function BasicTemplateInput(props) {
    let section = props.section
    let changeSection = props.onChange
    let idx = props.idx

    const [enableSubtitle, changeSubtitleState] = useState(section.subTitle !== undefined);
    const [enableTechnology, changeTechnologyState] = useState(section.technologies !== undefined);


    // remove subtitle if unchecked
    useEffect(() => {
        if (!enableSubtitle) {
            delete section.subTitle
            changeSection(section) 
        } 
    }, [enableSubtitle]);
    
    // remove technologies if unchecked
    useEffect(() => {
        if (!enableTechnology) {
            delete section.technologies
            changeSection(section) 
        } 
    }, [enableTechnology]);


    function updateListBasic(newList) {
        changeSection((prevState) => {
          return ({...prevState, list : newList })
        })
      }

    function changeTitle(e) {
        section.title = e.target.value
        changeSection(section, idx)
    }

    function changeDate(e) {
        section.date = e.target.value
        changeSection(section, idx)
    }

    function changeSubtitle(e) {
        section.subTitle = e.target.value
        changeSection(section, idx)
    }

    function changeTechnologies(e) {
        if (e.target.value === "") 
            delete section.technologies
        else 
            section.technologies = e.target.value.split(/,| ,| , /).filter((item) => item.trim().length !== 0)
        changeSection(section, idx)
    }

    let Type = (props) => {
        return (<Form.Control 
            as="textarea" 
            onChange={(e) => { 
                props.onChange(e.target.value, props.idx)}}
            value={props.value}
            idx={props.idx}
        />)
    }

    return (
        <Stack direction="horizontal">
        <Container id="grid">
            <Stack>
            <Col xs="1"></Col>
            <InputGroup direction="horizontal">
                <Form.Control id="template-title" placeholder={"Subsection Title"} defaultValue={section.title} onChange={(e) => {changeTitle(e)}}/>
                <Form.Control placeholder={"MMM YYYY - (MMM YYYY or Current)"}  defaultValue={section.date} size="sm" onChange={(e) => {changeDate(e)}}/>
            </InputGroup>
            <InputGroup direction="horizontal">
            <Form.Check label="add Subtitle" id="subTitle" className="mx-1" checked={enableSubtitle} onChange={() =>{changeSubtitleState(!enableSubtitle)}}/>
            {enableSubtitle? <Form.Control placeholder="subtitle" defaultValue={section.subTitle} size="sm" onChange={(e) => {changeSubtitle(e)}}/>: <></>}
            </InputGroup>
            <Stack direction="horizontal">
                <Col xs="1"></Col>
                <Stack direction="vertical">
                <ListTemplateInput list={section.list} func={updateListBasic} type={Type} enableBulletPoint={true} changeWithIndex={true}/>
                </Stack>
            </Stack>
            </Stack>
            <Row>
                <InputGroup direction="horizontal">
                    <Form.Check label="add technologies" checked={enableTechnology} id="technology" className="mx-1" onChange={() =>{changeTechnologyState(!enableTechnology)}}/>
                    {enableTechnology? <Form.Control placeholder="technologies" as="textarea" size="sm" defaultValue={section.technologies ? section.technologies.join(", ") : ""} onChange={(e) => {changeTechnologies(e)}}/>: <></>}
                </InputGroup>
            </Row>
            <div className="my-2"></div>
        </Container>
        </Stack>
    )
  }
