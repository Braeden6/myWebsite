
// EFFECT: Makes call API getResume. Returns resume saveName if authenticated and found
// REQUIRES: instance and accounts from useMsal from "@azure/msal-react", and saveName is a string
// MODIFIES: none of the input
// RETURNS: Resumes in Object/JSON format redefined
export default async function GetResume(instance, accounts, saveName ) { 
  const accessTokenRequest = {
    scopes: ["user.read"],
    account: accounts[0],
  };

  let token = await instance.acquireTokenSilent(accessTokenRequest);

  const parameters = {
    email: accounts[0].username,
    token: token.idToken,
    saveName: saveName,
    code: process.env.REACT_APP_GET_RESUME
  }

    let resume = await fetch((process.env.NODE_ENV === "production"? process.env.REACT_APP_PRODUCTION_URL: process.env.REACT_APP_DEV_URL) + "getResume?" + new URLSearchParams(parameters).toString(), {
        method: 'GET'
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.reply)
        return data.resume
      });
    return resume;
}