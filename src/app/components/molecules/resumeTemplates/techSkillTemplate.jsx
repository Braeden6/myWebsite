import React from 'react';
import "../../../myResume/resume.css";
import {Container, Row, Col} from 'react-bootstrap';



export default function TechSkillTemplate(props) {
    let section = props.section
    return (
      <Container id="grid">
        <Row>
          <Col xs="1" key="spacer"/>
          <Col xs="4" key="title" style={{ color:"black"}}><strong>{section.title + ":"}</strong></Col>
          <Col xs="6"  key="list" style={{ color:"black"}}>{section.descriptor}</Col>
        </Row>
      </Container>
    )
  }