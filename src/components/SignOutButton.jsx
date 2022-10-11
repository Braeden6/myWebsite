import React from "react";
import { useMsal } from "@azure/msal-react";
import { AiOutlineLogout } from "react-icons/ai"
import { Nav } from "react-bootstrap";

function handleLogout(instance) {
    instance.logoutRedirect().catch(e => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    return (
        <Nav.Link onClick={() => handleLogout(instance)}>Logout <AiOutlineLogout/></Nav.Link>
    );
}