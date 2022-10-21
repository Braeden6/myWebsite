import React from 'react';
import "./../resume/resume.css"
import { TemplateMap } from "./resumeTemplates/templateMap";
import { ButtonGroup, Form, Stack, Container, Accordion, DropdownButton, Dropdown } from "react-bootstrap";
import ListTemplateInput from "./resumeTemplates/listTemplateInput";
import ResumeViewer from "./resumeViewer";

export default function ResumeEditor(props) {
  let resume = props.resume;
  let setResume = props.setResume;
  function updateList(newList, idx) {
    setResume((prevState) => {
      var newSections = prevState.sections
      newSections[idx].list = newList
      return ({...prevState, sections : newSections })
    })
  }

  function updateTitle(newTitle, idx) {
    setResume((prevState) => {
      var newSections = prevState.sections
      newSections[idx].sectionTitle = newTitle
      return ({...prevState, sections: newSections })
    })
  }

  function updateSections(newSections) {
    setResume((prevState) => {
      return ({...prevState, sections: newSections })
    })
  }

  let Type = (props) => {
    return (GetSection({
      section: props.value,
      idx: props.idx,
      updateTitle: updateTitle,
      updateFunction: updateList
    }))
  }

  function changeElement(e, field) {
      setResume((prevState) => {
        return ({...prevState, [field]: e.target.value})
      })
  }

  return (
        <div id="resume" >
          <Form.Control placeholder="name@example.com" type="email" value={resume.name} onChange={(e) => {changeElement(e, "name")}}/>
          <Form.Control placeholder="Email" value={resume.email} onChange={(e) => {changeElement(e, "email")}}/>
          <Form.Control placeholder="Phone Number" value={resume.phoneNumber} onChange={(e) => {changeElement(e, "phoneNumber")}}/>
          <Form.Control placeholder="GitHub" value={resume.Github} onChange={(e) => {changeElement(e, "Github")}}/>
          <Form.Control placeholder="LinkedIn" value={resume.LinkedIn} onChange={(e) => {changeElement(e, "LinkedIn")}}/>
          <Stack className="align-items-center justify-content-center text-center">
            <ButtonGroup className="py-2">
              <DropdownButton as={ButtonGroup} title="Add Section" variant="primary" >
                <Dropdown.Item onClick={() => {updateSections([...resume.sections, { "title":"", "templateType": "BasicTemplate", "list": []}])}}>Add Basic Template</Dropdown.Item>
                <Dropdown.Item onClick={() => {updateSections([...resume.sections, { "title":"", "templateType": "TechSkillTemplate", "list": []}])}}>Add Technical Skill Template</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Preview Templates</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
          </Stack>
          <Accordion >
            <ListTemplateInput list={resume.sections} func={updateSections} type={Type} disableAddButton/>
          </Accordion>
          <ResumeViewer resume={resume}/>
        </div>
  )
  
}

  function GetSection(props) {
    let section = props.section
    let updateFunction = props.updateFunction
    let updateTitle = props.updateTitle
    let idx = props.idx
    const Input = TemplateMap[section.templateType + "Input"]
    const func = (newList) => {updateFunction(newList, idx)}
    const addition = (section.templateType === "BasicTemplate") ? { "title":"", "list": []} : { "title":"", "descriptor": ""}

    let Type = (props) => {
      return (<Input
          onChange={props.onChange}
          section={props.value}
          idx={props.idx}
      />)
    }

    return (
      <Container>
      <Accordion.Item eventKey={idx}>
        <Accordion.Header>{section.sectionTitle}</Accordion.Header>
        <Accordion.Body className="p-0">
          <Stack direction="vertical">
            <Form.Control id="input-section-title" value={section.sectionTitle} onChange={(e) => {updateTitle(e.target.value, idx)}}/>
            <ListTemplateInput  list={section.list} func={func} addListDefault={addition} type={Type}/>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
      </Container>
    )    
  }