// creates account if not already in database
export default async function CreateAccount(instance, accounts) { 
  const accessTokenRequest = {
    scopes: ["user.read"],
    account: accounts[0],
  };

  let token = await instance.acquireTokenSilent(accessTokenRequest);
  fetch((process.env.NODE_ENV === "production"? process.env.REACT_APP_PRODUCTION_URL: process.env.REACT_APP_DEV_URL) + "addUser", {
      method: 'POST',
      body: JSON.stringify({name: accounts[0].name, email: accounts[0].username, account: accounts[0], token: token.idToken})
    })
    .then((res) => res.json())
    .then((data) => console.log(data.reply));
}

