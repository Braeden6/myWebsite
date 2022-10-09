
import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Button } from "react-bootstrap";
import { loginRequest } from "../../authConfig";

import NavBar from "../../components/navBar/navBar"
import {SignInButton} from "../../components/SignInButton"
import {SignOutButton} from "../../components/SignOutButton"

export default function Login(props) {

    const { instance}= useMsal();

    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
        }
    }

    return (
        <>
            <NavBar variant="dark"/>
            <SignInButton/>
            <SignOutButton/>
            <AuthenticatedTemplate>
                <h1>You have been signed in</h1>
            </AuthenticatedTemplate>
        </>
    );
};