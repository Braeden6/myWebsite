import React from "react";
import { useMsal } from "@azure/msal-react";
import { AiOutlineLogout } from "react-icons/ai"
import { Nav } from "react-bootstrap";

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = (props) => {
    const { instance } = useMsal();


    function handleLogout(instance) {
        instance.logoutRedirect().catch(e => {
            console.error(e);
        });
    }
    

    return (
        <>
            <Nav.Link onClick={() => handleLogout(instance)} style={{"color":props.color}}>Logout <AiOutlineLogout/></Nav.Link>
        </>
    );
}