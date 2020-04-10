/**
 * Email Variable Configuration
 * (sails.config.email)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on any of these options, check out:
 * https://sailsjs.com/config/globals
 */
module.exports.email = {
    service: "SendGrid",
    auth: {
        user:"apikey",
        pass: ""
    },
    templateDir: "api/emailTemplates",
    from: "",
    testMode:false,
    ssl: false
}