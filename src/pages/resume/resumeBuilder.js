
import "./resume.css"
import {Tooltip, OverlayTrigger, Container, Row, Col, Stack} from 'react-bootstrap';



export default function ResumeBuilder(input) {
    let inputResume = input.resume
    return (
          <div id="resume">
            <h1 id ="name">{inputResume.name}</h1>
            <div id="below-title">
              <div>
                <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={
                    <Tooltip ><strong>Click</strong> to Copy.</Tooltip>
                  }>
                  <label id="link" onClick={() => navigator.clipboard.writeText(inputResume.email)}>{inputResume.email}</label>
                </OverlayTrigger>     
                <span> | {inputResume.phoneNumber} | </span>
                <a href={inputResume.GitHub} target="_blank" rel="noreferrer">GitHub</a>
                <span> | </span>
                <a href={inputResume.LinkedIn} target="_blank" rel="noreferrer">Linkedin</a>
                </div>
                <div>
                  <label>{inputResume.titleFacts.join(" | ")}</label>
                </div>
              </div>
                {getAllSections(inputResume.sections)}
            </div>
    )
    }


    
  function getAllSections(sections) {
    let allSections = [];
    for (let i = 0; i < sections.length; i++) {
      allSections.push(getSection(sections[i]))
    }
    return (
      <>
      {allSections}
      </>
    )
  }


  function getSection(section) {
    let subSections = []
    for (let i = 0; i < section.subsections.length; i++) {
      subSections.push(eval(section.templateFunction + "(section.subsections[i])"))
    }
    return (
        <div>
          <h2 id="technical">{section.sectionTitle}</h2>
          <hr id="technical-line"></hr>
          {subSections}
        </div>
    )
  }

  function getTechSkillTemplate(section) {
    return (
      <Container id="grid">
        <Row>
          <Col xs="1"></Col>
          <Col xs="4"><strong>{section.title + ":"}</strong></Col>
          <Col xs="6">{section.list.join(", ")}</Col>
        </Row>
      </Container>
    )
  }

  function getBasicTemplate(section) {
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