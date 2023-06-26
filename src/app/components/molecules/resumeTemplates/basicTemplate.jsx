
import React from 'react';
import "../../../myResume/resume.css"
import {Container, Row, Col, Stack} from 'react-bootstrap';


export default function BasicTemplate(props) {
    let section = props.section
    return (
        <Container id="grid">
            <Row>
              <Stack direction="horizontal">
                <Col xs="1"/>
                <div id="template-title" style={{ color:"black"}}>{section.title}</div>
                <div id="template-small" className="ms-auto" style={{ color:"black"}}> {section.date}</div>
              </Stack>
              <Stack direction="horizontal">
                <Col xs="1"/>
                <div id="template-small" style={{ color:"black"}}>{section.subTitle? section.subTitle:""}</div>
              </Stack>
            </Row>
            <Row>
              <Col xs="1"/>
              <Col>
                <ul>
                  {section.list.map( (e,idx) => <li key={idx} style={{ color:"black"}}>{e}</li>)}
                </ul>
              </Col>
            </Row>
            <Row>
            {section.technologies ? <><Col xs="1"></Col>
                <Col id="technologies">
                    <span id="technologies-title" style={{ color:"black"}}>Technologies: </span>
                    <span style={{ color:"black"}}>{section.technologies}</span>
                </Col>
            </>: <></>}
          </Row>
          <div className="my-2"></div>
        </Container>
      )
}

