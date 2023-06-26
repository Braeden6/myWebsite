import "../../../myResume/resume.css"
import {Stack, Form, Container} from 'react-bootstrap';
import React from "react";



export default function TechSkillTemplateInput (props) {
    return (
        <Container>
            <Stack direction="horizontal">
                <Form.Control  placeholder="Subsection Title" value={props.section.title} size="md" onChange={(e) => {
                    props.section.title = e.target.value
                    props.onChange(props.section, props.idx)
                }}/>
                <div className="mx-2"> : </div>
                <Form.Control className="ms-auto" placeholder="write a descriptor" as="textarea" 
                    value={props.section.descriptor}
                    onChange={(e) => {
                        props.section.descriptor = e.target.value
                        props.onChange(props.section, props.idx)
                    }}/>
            </Stack>
        </Container>
    )
}   
