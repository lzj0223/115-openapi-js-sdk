import './index'

import Open115SDK from "../src";

const sdk = new Open115SDK({clientId: process.env.APP_ID as string});
sdk.setToken(process.env.ACCESS_TOKEN as string);
console.log(process.env.ACCESS_TOKEN );
// sdk.files({}).then(result => {
//     console.log(result);
// })
//
sdk.folderGetInfo('454928292202629603').then(result => {
    console.log(result);
    sdk.fileDownUrl(result.data.pick_code).then(result => {
        console.log(result);
    })
})

