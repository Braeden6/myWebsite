
// EFFECT: Makes call API addUser. Creates account if not already in database
// REQUIRES: instance and accounts from useMsal from "@azure/msal-react"
// MODIFIES: none of the inputs
export default async function CreateAccount(instance, accounts) { 
  const accessTokenRequest = {
    scopes: ["user.read"],
    account: accounts[0],
  };
  let token = await instance.acquireTokenSilent(accessTokenRequest);

  // API inputs
  const parameters = {
    name: accounts[0].name, 
    email: accounts[0].username, 
    account: accounts[0], 
    token: token.idToken,
  }
  fetch((process.env.NODE_ENV === "production"? process.env.REACT_APP_PRODUCTION_URL: process.env.REACT_APP_DEV_URL) + "addUser?"  + new URLSearchParams({code: process.env.REACT_APP_ADD_USER}).toString(), {
      method: 'POST',
      body: JSON.stringify(parameters)
    })
    .then((res) => res.json())
    .then((data) => console.log(data.reply));
}

