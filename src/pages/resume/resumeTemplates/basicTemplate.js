
import "./../resume.css"
import {Container, Row, Col, Stack} from 'react-bootstrap';


export default function BasicTemplate(props) {
    let section = props.section
    return (
        <Container id="grid">
            <Row>
              <Stack direction="horizontal">
                <Col xs="1"/>
                <div id="template-title">{section.title}</div>
                <div id="template-small" className="ms-auto"> {section.date}</div>
              </Stack>
              <Stack direction="horizontal">
                <Col xs="1"/>
                <div id="template-small">{section.subTitle? section.subTitle:""}</div>
              </Stack>
            </Row>
            <Row>
              <Col xs="1"/>
              <Col>
                <ul>
                  {section.list.map( (e,idx) => <li key={idx}>{e}</li>)}
                </ul>
              </Col>
            </Row>
            <Row>
            {section.technologies ? <><Col xs="1"></Col>
                <Col id="technologies">
                    <span id="technologies-title">Technologies: </span>
                    <span>{section.technologies}</span>
                </Col>
            </>: <></>}
          </Row>
          <div className="my-2"></div>
        </Container>
      )
}

