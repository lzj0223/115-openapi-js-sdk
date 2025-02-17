import Open115SDK from "../src";

const access_token = '';

const refresh_token = ''


const sdk = new Open115SDK({clientId: 'app id'})
sdk.setToken(access_token)

sdk.userInfo().then(response => {
    console.log(JSON.stringify(response, null, 2));
})
