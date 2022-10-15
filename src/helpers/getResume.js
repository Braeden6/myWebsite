
export default async function GetResume(instance, accounts, saveName ) { 
  const accessTokenRequest = {
    scopes: ["user.read"],
    account: accounts[0],
  };

  let token = await instance.acquireTokenSilent(accessTokenRequest);

  const parameters = {
    email: accounts[0].username,
    token: token.idToken,
    saveName: saveName
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