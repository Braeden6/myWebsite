
// EFFECT: Makes call API getResumeList. Returns list of saved resumes of user
// REQUIRES: instance and accounts from useMsal from "@azure/msal-react"
// MODIFIES: none of the input
// RETURNS: List of strings that are the names of saved resumes
import { variables } from "../../configFiles/variables";
export default async function GetResumeList(instance, accounts) { 
  const accessTokenRequest = {
    scopes: ["user.read"],
    account: accounts[0],
  };

  let token = await instance.acquireTokenSilent(accessTokenRequest);
    const parameters = {
      email: accounts[0].username,
      token: token.idToken,
      code: import.meta.env.VITE_GET_RESUME_LIST
  }
  let resumes = await fetch(variables.BACKEND_URL + "users/getResumeList?" + new URLSearchParams(parameters).toString(), {
      method: 'GET'
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.reply);
      return data.resumes;
    });
  return resumes;
}