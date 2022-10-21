const validateJWT = require('../verifyUser').validateJWT
const findUser = require('../helpers/findUser')
const getContainer = require("../helpers/getContainer")

const endpoint = process.env.WEBSITE_DATABASE_ENDPOINT
const key = process.env.WEBSITE_DATABASE_KEY


module.exports = async function (context, req) {
    // query token (tokenID), email (of user related to token id), saveName (name of the resume you are getting)
    let responseMessage = {reply:"something went wrong"};
    const users = await findUser(req.query.email)

    if (users.length > 0) {
        try {
            validateJWT(req.query.token, users[0].oid);
        } catch (e) {
            console.log(e)
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: {reply:"could not verify user"}
            };
            return;
        }

        const querySpec = {
            query: `SELECT c.resume
                    FROM users u
                    JOIN c in u.savedResumes
                    WHERE u.id = @email and c.name = @saveName`,
            parameters: [
                {
                    name: "@email",
                    value: req.query.email
                },
                {
                    name: "@saveName",
                    value: req.query.saveName
                }
            ]
        }
        const container = getContainer("UserData", "users");
        const { resources } = await container.items.query(querySpec).fetchAll();
        if (resources.length > 0) {
            responseMessage = {reply: "found resume", resume: resources[0].resume}
        }
    }
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}