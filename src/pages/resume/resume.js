import "./resume.css"
import {Tooltip, OverlayTrigger, Container, Row, Col, Stack} from 'react-bootstrap';
import NavBar from "../../components/navBar/navBar";
import inputResume from "./resume.json";

export default function Resume() {
  return (
      <div id="all">
        <NavBar variant="light"/>
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
              {getAllTechSkills(inputResume.techSkills)}
              {getSection("Personal Projects", inputResume.personalProjects)}
              {getSection("Work Experience", inputResume.workExperience)}
              {getSection("Education", inputResume.education)}
              {getSection("Licenses & Certifications", inputResume.licenses)}
          </div>
        </div>
  )
  }

  function getAllTechSkills(list) {
    let skills = []
    for (let i = 0; i < list.length; i++) {
      skills.push(getTechSkillTemplate(list[i].title + ":", list[i].list))
    }
    return (
        <div>
          <h2 id="technical">Technical Skills</h2>
          <hr id="technical-line"></hr>
          <Container id="grid">
            {skills}
          </Container>
        </div>
    )

  }

  function getTechSkillTemplate(title, skills) {
    return (
      <Row>
        <Col xs="1"></Col>
        <Col xs="4"><strong>{title}</strong></Col>
        <Col xs="6">{skills.join(", ")}</Col>
      </Row>
    )
  }

  function getSection(name, list) {
    let subSections = []
    for (let i = 0; i < list.length; i++) {
      subSections.push(getInputTemplate(list[i].title, list[i].date, list[i].list, list[i].technologies, list[i].subTitle))
    }

    return (
        <div>
          <h2 id="technical">{name}</h2>
          <hr id="technical-line"></hr>
          {subSections}
        </div>
    )
  }

  function getInputTemplate(title, date, list, technologies, subTitle) {
    let items = []
    for (let i = 0; i < list.length; i++) {
      items.push(<li key={"list" + i}>{list[i]}</li>)
    }
      return (
        <Container id="grid">
            <Row>
              <Stack direction="horizontal">
                <Col xs="1"></Col>
                <div id="template-title">{title}</div>
                <div id="template-small" className="ms-auto"> {date}</div>
              </Stack>
              <Stack direction="horizontal">
                <Col xs="1"></Col>
                <div id="template-small">{subTitle? subTitle:""}</div>
              </Stack>
            </Row>
            <Row>
              <Col xs="1"></Col>
              <Col><ul>{items}</ul></Col>
            </Row>
            <Row>
            {technologies ?
                <>
                  <Col xs="1"></Col>
                  <Col id="technologies"><span id="technologies-title">Technologies: </span>{technologies.join(", ")}</Col>
                  </>: <></>}
            </Row>
            <div className="my-2"></div>
          </Container>
      )
  }