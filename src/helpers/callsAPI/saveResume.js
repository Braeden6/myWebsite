
// EFFECT: Makes call API saveResume. Saves given resume to saveName in database
// REQUIRES: instance and accounts from useMsal from "@azure/msal-react", Object/JSON formatted like resume.json
// MODIFIES: none of the input
import { variables } from "../../configFiles/variables";
export default async function SaveResume(instance, accounts, resume, saveName) { 
    const accessTokenRequest = {
        scopes: ["user.read"],
        account: accounts[0],
      };
    
      let token = await instance.acquireTokenSilent(accessTokenRequest);
      const parameters = {
        email: accounts[0].username,
        token: token.idToken,
        saveName: saveName,
        resume: resume
      }

      fetch(variables.BACKEND_URL + "saveResume", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parameters)
        })
        .then((res) => res.json())
        .then((data) => console.log(data.reply));
    }
