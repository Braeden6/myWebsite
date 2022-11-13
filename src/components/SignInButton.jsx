import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../configFiles/authConfig";
import { AiOutlineLogin } from "react-icons/ai"
import { Nav } from "react-bootstrap";

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = (props) => {

    const { instance } = useMsal();
    async function handleLogin(instance) {
        await instance.loginRedirect(loginRequest).catch(e => {
            console.error(e);
        })
    }

    return (
        <>
            <Nav.Link onClick={() => {handleLogin(instance)}} style={{"color":props.color}}>Login <AiOutlineLogin/></Nav.Link>
        </>
    );
}