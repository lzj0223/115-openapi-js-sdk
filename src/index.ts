import axios, {AxiosInstance, AxiosResponse} from 'axios';
import ApiUrls from "./api-urls";
import crypto from 'crypto';


export interface Open115Config {
    baseURL?: string;
    token?: string;
    clientId: string;
}

export class Open115Error extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Open115Error';
    }
}

export class Open115SDK {
    private client: AxiosInstance;
    private token?: string;
    private clientId: string;

    private codeVerifier?: string;

    constructor(config: Open115Config) {
        this.token = config.token;
        this.clientId = config.clientId;
        this.client = axios.create({
            baseURL: config.baseURL || 'https://api.115.com',
            headers: {
                'Content-Type': 'application/json',
                ...(this.token ? {'Authorization': `Bearer ${this.token}`} : {})
            }
        });

        // 添加响应拦截器处理错误
        this.client.interceptors.response.use(
            response => response,
            error => {
                if (error.response) {
                    throw new Open115Error(`API请求失败: ${error.response.status} ${error.response.data?.message || '未知错误'}`);
                }
                throw new Open115Error('网络请求失败');
            }
        );
    }

    /**
     * 设置认证token
     * @param token
     */
    setToken(token: string): void {
        this.token = token;
        this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    /**
     * 获取设备码和二维码内容
     * 使用接口返回的 data.qrcode 作为二维码的内容，在第三方客户端展示二维码，用于给115客户端扫码授权。
     */
    async authDeviceCode(): Promise<ApiAuthDeviceCodeResponse> {
        this.codeVerifier = crypto.randomBytes(32).toString('hex');
        const codeChallenge = crypto.createHash('sha256').update(this.codeVerifier).digest('base64url');
        const resp = await this.client.post(ApiUrls.AUTH_DEVICE_CODE, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: {
                client_id: this.clientId,
                code_challenge: codeChallenge,
                code_challenge_method: 'sh256'
            }
        });

        return resp.data;
    }

    /**
     * 轮询二维码状态
     * 此为长轮询接口。注意：当二维码状态没有更新时，此接口不会立即响应，直到接口超时或者二维码状态有更新。
     * @param uid 二维码ID/设备码，从 authDeviceCode 方法 data.uid  获取
     * @param time 校验参数，从 authDeviceCode 方法 data.time  获取
     * @param sign 校验签名，从 authDeviceCode 方法 data.sign  获取
     */
    async loginScanQrCodeStatus(uid: string, time: number, sign: string): Promise<ApiQrCodeStatusResponse> {
        const resp = await this.client.get(ApiUrls.AUTH_QRCODE_STATUS, {
            params: {uid, time, sign},
        })
        return resp.data;
    }

    /**
     * 用设备码换取 access_token
     * @param uid 二维码ID/设备码
     */
    async authDeviceCodeToToken(uid: string): Promise<ApiAccessTokenResponse> {
        const resp: AxiosResponse<ApiAccessTokenResponse> = await this.client.post(ApiUrls.AUTH_CODE_TO_TOKEN, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: {
                uid: uid,
                code_verifier: this.codeVerifier,
            }
        });

        if (resp.data.access_token) {
            this.setToken(resp.data.access_token);
        }

        return resp.data;
    }

    /**
     * 刷新 access_token
     * 请勿频繁刷新，否则列入频控。
     * @param refresh_token 二维码ID/设备码
     */
    async authRefreshToken(refresh_token: string): Promise<ApiAccessTokenResponse> {
        const resp = await this.client.post(ApiUrls.AUTH_CODE_TO_TOKEN, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: {refresh_token}
        });
        return resp.data;
    }

    /**
     * 创建目录
     * @param body
     */
    async folderAdd(body: ApiFolderAddRequestBody): Promise<ApiFolderAddResponse> {
        const resp = await this.client.post(ApiUrls.FOLDER_ADD, {body,})
        return resp.data;
    }

    /**
     * 获取目录信息
     * @param fileId
     */
    async folderGetInfo(fileId: string): Promise<ApiFolderGetInfoResponse> {
        const resp = await this.client.get(ApiUrls.FOLDER_GET_INFO, {params: {file_id: fileId}})
        return resp.data;
    }


    /**
     * 获取文件列表
     * @param params
     */
    async files(params: ApiUFileFilesRequestQuery): Promise<ApiUFileFilesResponse> {
        const resp = await this.client.get(ApiUrls.U_FILE_FILES, {params})
        return resp.data
    }

    /**
     * 根据文件名搜索文件(夹)
     * @param params
     */
    async fileSearch(params: ApiUFileSearchRequestQuery): Promise<ApiUFileSearchResponse> {
        const resp = await this.client.get(ApiUrls.U_FILE_SEARCH, {params})
        return resp.data
    }

    /**
     * 批量复制文件
     * @param body
     */
    async fileCopy(body: ApiUFileCopyRequestBody): Promise<BaseResponse<any[]>> {
        const resp = await this.client.post(ApiUrls.U_FILE_COPY, {body})
        return resp.data
    }

    /**
     * 批量移动文件
     * @param body
     */
    async fileMove(body: ApiUFileMoveRequestBody): Promise<BaseResponse<any[]>> {
        const resp = await this.client.post(ApiUrls.U_FILE_MOVE, {body})
        return resp.data
    }

    /**
     * 根据文件提取码取文件下载地址
     * @param pick_code  文件提取码
     */
    async fileDownUrl(pick_code: string): Promise<ApiUFileDownUrlResponse> {
        const resp = await this.client.post(ApiUrls.U_FILE_DOWN_URL, {body: {pick_code}})
        return resp.data
    }

    /**
     * 批量更新文件名、星标文件
     * @param body
     */
    async fileUpdate(body: ApiUFileUpdateRequestBody): Promise<ApiUFileUpdateResponse> {
        const resp = await this.client.post(ApiUrls.U_FILE_UPDATE, {body})
        return resp.data
    }

    /**
     * 删除文件
     * @param body
     */
    async fileDelete(body: ApiUFileDeleteRequestBody): Promise<ApiUFileDeleteResponse> {
        const resp = await this.client.post(ApiUrls.U_FILE_DELETE, {body})

        return resp.data
    }

    /**
     * 回收站列表
     * @param offset 数据显示偏移量
     * @param limit 单页记录数，int，默认30，最大200
     */
    async rbList(offset: number = 0, limit: number = 0): Promise<ApiRbListResponse> {
        const resp = await this.client.get(ApiUrls.RB_LIST, {
            params: {offset, limit},
        })

        return resp.data
    }

    /**
     * 还原回收站文件(夹)
     * @param tld 需要还原的ID，可多个
     */
    async rbRevert(tld: string | string[]): Promise<ApiRbReverseResponse> {
        const resp = await this.client.post(ApiUrls.RB_REVERT, {
            body: {
                tld: Array.isArray(tld) ? tld.join(',') : tld,
            }
        })
        return resp.data
    }

    /**
     * 还原回收站文件(夹)
     * @param tld 需要还原的ID，可多个
     */
    async rbDel(tld: string | string[]): Promise<BaseResponse<string[]>> {
        const resp = await this.client.post(ApiUrls.RB_DEL, {
            body: {
                tld: Array.isArray(tld) ? tld.join(',') : tld,
            }
        })

        return resp.data
    }

    /**
     * 获取开放平台产品列表扫描跳转链接地址
     * @param openDevice 设备号
     * @param defaultProductId 默认产品ID
     */
    async vipQrUrl(openDevice: string, defaultProductId: string = ''): Promise<BaseResponse<{ qrcode_url: string }>> {
        const resp = await this.client.get(ApiUrls.RB_DEL, {
            params: {
                open_device: openDevice,
                default_product_id: defaultProductId,
            }
        })
        return resp.data
    }
}

export default Open115SDK;