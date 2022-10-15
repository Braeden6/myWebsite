const CosmosClient = require("@azure/cosmos").CosmosClient
const validateJWT = require('../verifyUser').validateJWT
const findUser = require('../helpers/findUser')



module.exports = async function (context, req) {
    let responseMessage = {reply:"something went wrong"};
    let users = await findUser(req.query.email)

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
        let resumeList =  []
        for( const resume of users[0].savedResumes) {
            resumeList[resumeList.length] = resume.name;
        }
        responseMessage = { reply : "found resumes", resumes: resumeList}
    } 
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}