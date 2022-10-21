import React from 'react';
import "./resume.css"
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import { TemplateMap } from "./resumeTemplates/templateMap";



export default function resumeViewer(input) {
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
                <a href={inputResume.Github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <span> | </span>
                <a href={inputResume.LinkedIn} target="_blank" rel="noopener noreferrer">Linkedin</a>
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
    return (
      <>
        {sections.map( (e,idx) => getSection(e,idx))}
      </>
    )
  }


  function getSection(section,idx) {
    // eval calls saved template function name from json file
    return (
        <>
          <h2 id="technical">{section.sectionTitle}</h2>
          <hr></hr>
          {section.list.map( (e,idx) => {
            const Tag = TemplateMap[section.templateType] 
            return (<Tag section={e}/>)
          })}
        </>
    )
  }
