
// EFFECT: Makes call API saveResume. Saves given resume to saveName in database
// REQUIRES: instance and accounts from useMsal from "@azure/msal-react", Object/JSON formatted like resume.json
// MODIFIES: none of the input
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

      fetch((process.env.NODE_ENV === "production"? process.env.REACT_APP_PRODUCTION_URL: process.env.REACT_APP_DEV_URL) + "saveResume?" + new URLSearchParams({code: process.env.REACT_APP_SAVE_RESUME}).toString(), {
          method: 'POST',
          body: JSON.stringify(parameters)
        })
        .then((res) => res.json())
        .then((data) => console.log(data.reply));
    }
