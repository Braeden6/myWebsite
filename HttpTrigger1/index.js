const ReactPDF = require('@react-pdf/renderer');
const React = require('react')
module.exports = async function (context, req) {
    if (req.body) {
        context.log(req.body.html);
        
    }
    const responseMessage = {message: "Hello From Server!"}
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}