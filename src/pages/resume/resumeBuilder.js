import ResumeEditor from "./resumeEditor";
import NavBar from "../../components/navBar/navBar";
import GetResumeList from "../../helpers/getResumeList";
import { useMsal } from "@azure/msal-react";
import { Button, Dropdown, Form, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useEffect, useState } from "react";
import GetResume from "../../helpers/getResume";
import SaveResume from "../../helpers/saveResume";
import DeleteResume from "../../helpers/deleteResume";
import defaultResume from "./defaultResume.json";

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
    }, [accounts])

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

    function getResumeDropdown(func, name) {
        const hasAResumeList = resumeList != null && resumeList.length > 0

        const dropdown = 
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    {name}
                </Dropdown.Toggle>
                {hasAResumeList? 
                    <Dropdown.Menu>
                        {resumeList.map( (e,idx) => <Dropdown.Item key={e} onClick={() => {func(e)}}>{e}</Dropdown.Item>)} 
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
        <div id="all">
            <NavBar variant="light"/>
            <div id="resume">
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