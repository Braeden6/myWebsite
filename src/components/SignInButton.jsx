import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { AiOutlineLogin } from "react-icons/ai"
import { Nav } from "react-bootstrap";
import { useState} from "react";


/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
    const { instance, accounts } = useMsal();
    const [accessToken, setAccessToken] = useState(null);


    function handleLogin(instance) {
        instance.loginRedirect(loginRequest).catch(e => {
            console.error(e);
        });
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        instance.acquireTokenSilent(request).then((response) => {
            setAccessToken(response.accessToken);
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                setAccessToken(response.accessToken);
            });
        })
        .then(console.log("token is:",  accessToken));
    }

    return (
        <Nav.Link onClick={() => handleLogin(instance)}>Login <AiOutlineLogin/></Nav.Link>
    );
}