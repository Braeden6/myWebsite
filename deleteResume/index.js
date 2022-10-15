const validateJWT = require('../verifyUser').validateJWT
const findUser = require('../helpers/findUser')
const getContainer = require("../helpers/getContainer")

module.exports = async function (context, req) {
    // body has token (tokenID), email (of user related to token id), saveName (name the resume will be saved under), resume
    let responseMessage = {reply:"something went wrong"};
    const users = await findUser(req.body.email)

    if (users.length > 0) {
        try {
            validateJWT(req.body.token, users[0].oid);
        } catch (e) {
            console.log(e)
            context.res = {
                body: {reply:"could not verify user"}
            };
            return;
        }
        

        let resumeList =  []
        for( const resume of users[0].savedResumes) {
            resumeList[resumeList.length] = resume.name;
        }
        const container = getContainer("UserData", "users")

        if (resumeList.includes(req.body.deleteName)) {
            users[0].savedResumes.splice(resumeList.indexOf(req.body.deleteName),1)
            container.item(req.body.email).replace(users[0])
            responseMessage = {reply:`deleted ${req.body.deleteName}`};
        } else {
            responseMessage = {reply:`did not delete ${req.body.deleteName}`};
        }

    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}