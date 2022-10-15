import ResumeEditor from "./resumeEditor";
import NavBar from "../../components/navBar/navBar";
import GetResumeList from "../../helpers/getResumeList";
import { useMsal } from "@azure/msal-react";
import { Button, Dropdown, Form, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useEffect, useState } from "react";
import myResume from "./resume.json";
import GetResume from "../../helpers/getResume";
import SaveResume from "../../helpers/saveResume";

function setLoadDropdownList(instance, accounts, setResumeList) {
    GetResumeList(instance, accounts)
        .then((list) => setResumeList(list));
}


export default function ResumeBuilder() {
    const [ resumeList, setResumeList ] = useState(null);
    const [ resume, setResume ] = useState(null);
    const [ saveName, setSaveName ] = useState("");

    const { instance, accounts } = useMsal();

    useEffect(() => {
        setLoadDropdownList(instance,accounts,setResumeList);
    }, [accounts])

    function getResume(saveName) {
       GetResume(instance, accounts, saveName)
       .then((resume) => {
        setSaveName(saveName)
        setResume(resume)
       })
    }

    function getResumeDropdown() {
        if (resumeList != null && resumeList.length > 0) {
            return (
                <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Load Saved Resume
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {resumeList.map( (e,idx) => <Dropdown.Item key={e} onClick={() => {getResume(e)}}>{e}</Dropdown.Item>)}
                </Dropdown.Menu>
                </Dropdown>
            )
        } else {
            return(
                // TODO: fix tooltip placement
                <OverlayTrigger delay={{ show: 250, hide: 0 }}overlay={
                    <Tooltip id="button-tooltip">
                        No Saved Resume
                    </Tooltip>
                }>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Load Saved Resumes
                        </Dropdown.Toggle>
                    </Dropdown>
                </OverlayTrigger>)
        }
        

    }

    // save resume with name and update list of 
    function saveResume() {
        SaveResume(instance, accounts, myResume, saveName)
        .then(setLoadDropdownList(instance,accounts,setResumeList));
    }

   // <ResumeEditor/>
    return ( 
        <div id="all">
            <NavBar variant="light"/>
            <Stack direction="vertical">
                <Form.Control value={saveName} onChange={(e) => {setSaveName(e.target.value)}}></Form.Control>
                <Stack direction="horizontal">
                    {getResumeDropdown()}
                    <Button onClick={saveResume}>Save Resume</Button>
                </Stack>

            </Stack>
            
            
            <div id="resume"/>
            {!resume? <></>: <ResumeEditor inputResume={resume}/>}
        </div>
    );
}