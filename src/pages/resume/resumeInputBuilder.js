import "./../resume/resume.css"
import NavBar from "../../components/navBar/navBar";
import { TemplateMap } from "../resume/resumeTemplates/templateMap";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import ListTemplateInput from "../resume/resumeTemplates/listTemplateInput";
import inputResume from "./resume.json";

export default function ResumeInputBuilder() {
  
  const [sectionBasic, changeSectionBasic] = useState(inputResume.sections[1])
  const [sectionSkill, changeSectionSkill] = useState(inputResume.sections[0])
  console.log(sectionSkill)
  function updateList(newList) {
    changeSectionSkill((prevState) => {
      return ({...prevState, list : newList })
    })
  }

  function updateListBasic(newList) {
    changeSectionBasic((prevState) => {
      return ({...prevState, list : newList })
    })
  }

  useEffect(() => {
    console.log(sectionSkill)
  }, [sectionSkill]);

  useEffect(() => {
    console.log(sectionBasic)
  }, [sectionBasic]);
  
  return (
    <div id="all">
        <NavBar variant="light"/>
        <div id="resume">
            
        {getSection(sectionBasic, updateListBasic)}
        {getSection(sectionSkill, updateList)}

            
          

        </div>
        
    </div>
  )
  }

  function getSection(section, updateFunction) {
    console.log(section)
        const Input = TemplateMap[section.templateType + "Input"]
        return (
            <>
                <Form.Control defaultValue={section.sectionTitle}/>
                <hr/>
                <ListTemplateInput list={section.list} func={updateFunction} addListDefault={{ "title":"", "list": []}} type={Input} changeWithIndex={true}/>
            </>
        )    
    }