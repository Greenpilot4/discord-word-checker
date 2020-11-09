const { google } = require("googleapis");
const token = require("../token.json");
const credentials = require("../credentials.json");

function authorize() {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
}
