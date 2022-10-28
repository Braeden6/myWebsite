/*
 
  Braeden's Personal Website
  Author: Braeden Norman
  Date: 2022-10-27

  Helpful Information

  Authentication Template Msal: https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-react
 */
import ResumeEditor from "../helpers/resume/resumeEditor";
import NavBar from "../components/navBar";
import { useMsal } from "@azure/msal-react";
import { Button, Dropdown, Form, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useEffect, useState } from "react";
import GetResumeList from "../helpers/callsAPI/getResumeList";
import GetResume from "../helpers/callsAPI/getResume";
import SaveResume from "../helpers/callsAPI/saveResume";
import DeleteResume from "../helpers/callsAPI/deleteResume";
import defaultResume from "../helpers/resume/defaultResume.json";

import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

function updateResumeList(instance, accounts, setResumeList) {
    GetResumeList(instance, accounts)
        .then((list) => setResumeList(list));
}


export default function ResumeBuilder() {
    const [ resumeList, setResumeList ] = useState(null);
    const [ resume, setResume ] = useState(defaultResume);
    const [ saveName, setSaveName ] = useState("Default Resume");

    const { instance, accounts } = useMsal();

    useEffect(() => {
        updateResumeList(instance,accounts,setResumeList);
    }, [accounts, instance])

    function getResume(saveName) {
       GetResume(instance, accounts, saveName)
       .then((resume) => {
        setSaveName(saveName)
        setResume(resume)
       })
    }

    function deleteResume(deleteName) {
        DeleteResume(instance, accounts, deleteName)
       .then(() => {
            setSaveName("Default Resume")
            setResume(defaultResume)
       });
       setResumeList(resumeList.filter((e) => e !== deleteName))
    }

    // save resume with name and update list of 
    function saveResume() {
        SaveResume(instance, accounts, resume, saveName);
        if (!resumeList.includes(saveName)){
            setResumeList((prevState) => [...prevState, saveName])
        }
    }

    // get dropdown menu of currently saved resumes in database
    function getResumeDropdown(buttonCallback, dropdownName) {
        const hasAResumeList = resumeList != null && resumeList.length > 0
        const dropdown = 
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    {dropdownName}
                </Dropdown.Toggle>
                {hasAResumeList? 
                    <Dropdown.Menu>
                        {resumeList.map( (e,idx) => <Dropdown.Item key={e} onClick={() => {buttonCallback(e)}}>{e}</Dropdown.Item>)} 
                    </Dropdown.Menu>
                    : <></>}
            </Dropdown>
        return (
            <>
                {hasAResumeList? dropdown : 
                    <OverlayTrigger 
                        delay={{ show: 250, hide: 0 }}
                        overlay={<Tooltip id="button-tooltip">No Saved Resume</Tooltip>}
                    >
                        {dropdown}
                    </OverlayTrigger>}
            </>
        )
    }

    return ( 
        <div id="resumeBuilderAll">
            <NavBar variant="light"/>
            <div id="resumeBuilder">
                <AuthenticatedTemplate>
                    <Stack direction="vertical" className="py-2">
                        <Stack direction="horizontal" className="mx-auto py-2">
                            {getResumeDropdown(getResume, "Load Saved Resume")}
                            {getResumeDropdown(deleteResume, "Delete Saved Resume")}
                            <Button onClick={saveResume}>Save Resume</Button>
                        </Stack>
                        <Form.Control value={saveName} onChange={(e) => {setSaveName(e.target.value)}} id="resume-title"/>
                    </Stack>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <Stack direction="vertical" className="py-2">
                            <OverlayTrigger 
                            delay={{ show: 250, hide: 0 }}
                            overlay={<Tooltip id="button-tooltip">Login To Use This</Tooltip>}
                            >
                                <Stack direction="horizontal" className="mx-auto py-2">
                                    <Button disabled>Load Saved Resume</Button>
                                    <Button disabled>Delete Saved Resume</Button>
                                    <Button disabled>Save Resume</Button>
                                </Stack>
                            </OverlayTrigger>
                        <Form.Control value={saveName} onChange={(e) => {setSaveName(e.target.value)}} id="resume-title"/>
                    </Stack>
                </UnauthenticatedTemplate>
            </div>
            <ResumeEditor resume={resume} setResume={setResume}/>
        </div>
    );
}