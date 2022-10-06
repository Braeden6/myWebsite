import "./../resume.css"
import {Stack, Form, Col} from 'react-bootstrap';
import React from "react";



class TechSkillTemplateInput extends React.Component {
    constructor(props) {
        super()
        this.section = props.section
        this.changeSection = props.onChange
        this.idx = props.idx
    }

    

    render() {
        return (
        <Stack direction="horizontal">
            <Col xs="1" key="spacer"/>
            <Form.Control  placeholder="Subsection Title" value={this.props.section.title} size="md" onChange={(e) => {
                this.section.title = e.target.value
                this.changeSection(this.section, this.idx)
            }}/>
            <div className="mx-2"> : </div>
            <Form.Control className="ms-auto" placeholder="list of skills (separate with a comma)" as="textarea" defaultValue={this.section.list.join(", ")} onChange={(e) => {
                this.section.list = e.target.value.split(/,| ,| , /).filter((item) => item.trim().length !== 0)
                this.changeSection(this.section)
                }}/>
        </Stack>
        )
    }   
  }

  export default TechSkillTemplateInput