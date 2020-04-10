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
        pass: "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"
    },
    templateDir: "api/emailTemplates",
    from: "luizfufsj@gmail.com",
    testMode:false,
    ssl: false
}