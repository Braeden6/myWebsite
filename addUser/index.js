const CosmosClient = require("@azure/cosmos").CosmosClient;
const validateJWT = require('../verifyUser').validateJWT
const getDecodedToken = require('../verifyUser').getDecodedToken
const findUser = require('../helpers/findUser')
const getContainer = require("../helpers/getContainer")


module.exports = async function (context, req) {
    let responseMessage = {reply:"something went wrong"};
    const users = await findUser(req.body.email)

    if (users.length > 0) {
        responseMessage = {reply: "account found"};
        try {
            await validateJWT(req.body.token, users[0].oid);
        } catch (e) {
            console.log(e)
            context.res = {
                body: {reply:"Account Found, but could not verify user"}
            };
            return;
        }    
    } else {
        let decodedToken = await getDecodedToken(req.body.token)
        let item = {
            "id" : req.body.email,
            "name" : req.body.name,
            "savedResumes" : [],
            "oid" : decodedToken.payload.oid
        }
        const container = getContainer("UserData", "users")
        await container.items.create(item);
        responseMessage = {reply: "account created"};
    }
    /*
    for( const item of resources) {
        console.log(item.id)
        container.item(item.id,item.id).delete();
    }*/

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}