const getContainer = require("../helpers/getContainer");

module.exports = async function (context, req) {
    // nothing required
    let responseMessage = {reply:"something went wrong"};

    const querySpec = {
        query: `SELECT *
                FROM earthquakes e`
    }
    const container = getContainer("mapContent", "earthquakes");
    const { resources } = await container.items.query(querySpec).fetchAll();
    if (resources.length > 0) {
        responseMessage = {reply: "data found", earthquakes: resources}
    }
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}