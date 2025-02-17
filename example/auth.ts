import Open115SDK from "../src"
import QRCode from 'qrcode';

const sdk = new Open115SDK({clientId: 'app id'})


sdk.authDeviceCode().then(async (result) => {
    // 生成二维码
    // 自定义二维码的颜色和大小
    const options = {
        type: 'terminal',
        color: {
            dark: '#00FF00',  // 矩形部分的颜色（绿色）
            light: '#00000000' // 背景颜色（透明）
        },
        width: 10 // 自定义大小
    };

    // @ts-ignore
    QRCode.toString(result.data.qrcode, options, (err, url) => {
        if (err) {
            console.error('Error generating QR Code:', err);
            return;
        }
        // 输出二维码到命令行
        console.log(url);
    });

    do {
        const stat = await sdk.loginScanQrCodeStatus(result.data.uid, result.data.time, result.data.sign)
        console.log(stat)
        if (stat.state !== 1) {
            break;
        }

        if (stat.data.status === 2) {
            break;
        }

    } while (true)


    const tokenResult = await sdk.authDeviceCodeToToken(result.data.uid)

    console.log(tokenResult)
})