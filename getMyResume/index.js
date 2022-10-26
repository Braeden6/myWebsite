const getContainer = require("../helpers/getContainer");

module.exports = async function (context, req) {
    // nothing required
    let responseMessage = {reply:"something went wrong"};

    const querySpec = {
        query: `SELECT c.resume
                FROM users u
                JOIN c in u.savedResumes
                WHERE u.id = @email and c.name = @saveName`,
        parameters: [
            {
                name: "@email",
                value: "bnorman11@live.com"
            },
            {
                name: "@saveName",
                value: "main"
            }
        ]
    }
    const container = getContainer("UserData", "users");
    const { resources } = await container.items.query(querySpec).fetchAll();
    if (resources.length > 0) {
        responseMessage = {reply: "found resume", resume: resources[0].resume}
    }
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}