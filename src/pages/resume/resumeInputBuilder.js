import "./../resume/resume.css"
import NavBar from "../../components/navBar/navBar";
import { TemplateMap } from "../resume/resumeTemplates/templateMap";
import { Form, Stack } from "react-bootstrap";
import { useState } from "react";
import ListTemplateInput from "../resume/resumeTemplates/listTemplateInput";
import inputResume from "./resume.json";
import ResumeBuilder from "./resumeBuilder";

export default function ResumeInputBuilder() {
  const [sectionSkill, changeSectionSkill] = useState(inputResume)
  function updateList(newList, idx) {
    changeSectionSkill((prevState) => {
      var newSections = prevState.sections
      newSections[idx].list = newList
      return ({...prevState, sections : newSections })
    })
  }

  function updateTitle(newTitle, idx) {
    changeSectionSkill((prevState) => {
      var newSections = prevState.sections
      newSections[idx].sectionTitle = newTitle
      return ({...prevState, sections: newSections })
    })
  }

  function updateSections(newSections) {
    changeSectionSkill((prevState) => {
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

  


  return (
    <div id="all">
        <NavBar variant="light"/>
        <div id="resume">
         <ListTemplateInput list={sectionSkill.sections} func={updateSections} addListDefault={{ "title":"", "templateType": "BasicTemplate", "list": []}} type={Type}/>
          
        <ResumeBuilder resume={inputResume}/>
        </div>
        
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

    let Type = (props) => {
      return (<Input 
          onChange={props.onChange}
          section={props.value}
          idx={props.idx}
      />)
    }

    return (
      <> 
        <Stack direction="vertical">
          <Form.Control defaultValue={section.sectionTitle} onChange={(e) => {updateTitle(e.target.value, idx)}}/>
          <hr/>
          <ListTemplateInput list={section.list} func={func} addListDefault={{ "title":"", "list": []}} type={Type}/>
          </Stack>
      </>
    )    
  }