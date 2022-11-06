
// EFFECT: Makes call API deleteResume. Removes resume from database if deleteName is found
// REQUIRES: instance and accounts from useMsal from "@azure/msal-react", and deleteName is a string
// MODIFIES: none of the input
export default async function DeleteResume(instance, accounts, deleteName) { 
    const accessTokenRequest = {
        scopes: ["user.read"],
        account: accounts[0],
      };
    
      let token = await instance.acquireTokenSilent(accessTokenRequest);
      const parameters = {
        email: accounts[0].username,
        token: token.idToken,
        deleteName: deleteName,
      }

      fetch((process.env.NODE_ENV === "production"? 
                    import.meta.env.VITE_PRODUCTION_URL: 
                    import.meta.env.VITE_DEV_URL) + "deleteResume?"  
                    + new URLSearchParams({code: import.meta.env.VITE_DELETE_RESUME}).toString(), {
          method: 'DELETE',
          body: JSON.stringify(parameters)
        })
        .then((res) => res.json())
        .then((data) => console.log(data.reply));
    }
