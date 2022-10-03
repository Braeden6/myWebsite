import "../resume.css"
import { Button, Form, Stack, Col } from "react-bootstrap";
import { useState } from "react";
import TechSkillTemplateInput from "./techSkillTemplateInput";

export default function ListTemplateInput() {
  let initSectionSkill = {
    "sectionTitle": "Technical Skills",
    "templateType": "TechSkillTemplate",
    "subsections": [
        { 
            "title" : "Programming Languages",
            "list": ["C", "C++", "Java", "TypeScript", "Python", "JavaScript", "HTML", "CSS",
            "Visual Basic", "MATLAB", "R", "Julia", "JSX" ]
        },{
            "title" : "Technologies",
            "list": [ "IntelliJ", "Visual Studios", "Microsoft Office", "Azure", "Node.js",
            "React", "Bootstrap", "Serverless Computing", "Cosmos DB" ] 
        }]
}


  const [sectionSkill, changeSectionSkill] = useState(initSectionSkill)

  function changeSubsection (newSubsection, idx) {
    changeSectionSkill((prevState) => {
      var newList = [...prevState.subsections]
      newList[idx] = newSubsection
      return ({...prevState, subsections : newList })
    })
  }

  function removeSubsection(e) {
    changeSectionSkill((prevState) => {
      var newList = [...prevState.subsections]
      newList = newList.filter((item, index) => index !== parseInt(e.target.id))
      return ({...prevState, subsections : newList})
    })
  }

  function addSubsection() {
    changeSectionSkill( prevState => ({...prevState, 
    subsections: [...prevState.subsections, { "title":"", "list": []}]}))
  }

  function getList() {
    return (
      sectionSkill.subsections.map( (e,idx) => 
        <Stack className="ms-auto" direction="horizontal">
          <TechSkillTemplateInput id={idx.toString()} section={e} sections={sectionSkill.subsections} idx={idx} func={changeSubsection}/>
          <Button id={idx} onClick={removeSubsection}>remove</Button>
        </Stack>)
    )
  }

  return (
    <>
      <Form.Control defaultValue={sectionSkill.sectionTitle}></Form.Control>
      <hr/>
      {getList()}
      <Stack direction="horizontal">
        <Col xs="1" key="spacer"/>
        <Button  onClick={addSubsection}>Add Line</Button>
      </Stack>
    </>
  )
  }