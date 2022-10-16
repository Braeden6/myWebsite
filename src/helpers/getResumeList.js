

export default async function GetResumeList(instance, accounts) { 
  const accessTokenRequest = {
    scopes: ["user.read"],
    account: accounts[0],
  };

  let token = await instance.acquireTokenSilent(accessTokenRequest);
    const parameters = {
      email: accounts[0].username,
      token: token.idToken,
      code: process.env.REACT_APP_GET_RESUME_LIST
  }
  let resumes = await fetch((process.env.NODE_ENV === "production"? process.env.REACT_APP_PRODUCTION_URL: process.env.REACT_APP_DEV_URL) + "getResumeList?" + new URLSearchParams(parameters).toString(), {
      method: 'GET'
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.reply);
      return data.resumes;
    });
  return resumes;
}