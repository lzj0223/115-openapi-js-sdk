import axios, {AxiosInstance} from 'axios';
import ApiUrls from "./api-urls";

export interface Open115Config {
    baseURL?: string;
    token?: string;
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

    constructor(config: Open115Config = {}) {
        this.token = config.token;
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
     * 创建目录
     * @param body
     */
    async folderAdd(body: ApiFolderAddRequestBody): Promise<ApiFolderAddResponse> {
        return await this.client.post(ApiUrls.FOLDER_ADD, {body,})
    }

    /**
     * 获取目录信息
     * @param fileId
     */
    async folderGetInfo(fileId: string): Promise<ApiFolderGetInfoResponse> {
        return await this.client.get(ApiUrls.FOLDER_GET_INFO, {params: {file_id: fileId}})
    }


    /**
     * 获取文件列表
     * @param params
     */
    async files(params: ApiUFileFilesRequestQuery): Promise<ApiUFileFilesResponse> {
        return await this.client.get(ApiUrls.U_FILE_FILES, {params})
    }

    /**
     * 根据文件名搜索文件(夹)
     * @param params
     */
    async fileSearch(params: ApiUFileSearchRequestQuery): Promise<ApiUFileSearchResponse> {
        return await this.client.get(ApiUrls.U_FILE_SEARCH, {params})
    }

    /**
     * 批量复制文件
     * @param body
     */
    async fileCopy(body: ApiUFileCopyRequestBody): Promise<BaseResponse<any[]>> {
        return await this.client.post(ApiUrls.U_FILE_COPY, {body})
    }

    /**
     * 批量移动文件
     * @param body
     */
    async fileMove(body: ApiUFileMoveRequestBody): Promise<BaseResponse<any[]>> {
        return await this.client.post(ApiUrls.U_FILE_MOVE, {body})
    }

    /**
     * 根据文件提取码取文件下载地址
     * @param pick_code  文件提取码
     */
    async fileDownUrl(pick_code: string): Promise<ApiUFileDownUrlResponse> {
        return await this.client.post(ApiUrls.U_FILE_DOWN_URL, {body: {pick_code}})
    }

    /**
     * 批量更新文件名、星标文件
     * @param body
     */
    async fileUpdate(body: ApiUFileUpdateRequestBody): Promise<ApiUFileUpdateResponse> {
        return await this.client.post(ApiUrls.U_FILE_UPDATE, {body})
    }

    /**
     * 删除文件
     * @param body
     */
    async fileDelete(body: ApiUFileDeleteRequestBody): Promise<ApiUFileDeleteResponse> {
        return await this.client.post(ApiUrls.U_FILE_DELETE, {body})
    }

    /**
     * 回收站列表
     * @param offset 数据显示偏移量
     * @param limit 单页记录数，int，默认30，最大200
     */
    async rbList(offset: number = 0, limit: number = 0): Promise<ApiRbListResponse> {
        return await this.client.get(ApiUrls.RB_LIST, {
            params: {offset, limit},
        })
    }

    /**
     * 还原回收站文件(夹)
     * @param tld 需要还原的ID，可多个
     */
    async rbRevert(tld: string | string[]): Promise<ApiRbReverseResponse> {
        return await this.client.post(ApiUrls.RB_REVERT, {
            body: {
                tld: Array.isArray(tld) ? tld.join(',') : tld,
            }
        })
    }

    /**
     * 还原回收站文件(夹)
     * @param tld 需要还原的ID，可多个
     */
    async rbDel(tld:string|string[]):Promise<BaseResponse<string[]>> {
        return await this.client.post(ApiUrls.RB_DEL, {
            body: {
                tld: Array.isArray(tld) ? tld.join(',') : tld,
            }
        })
    }
}

export default Open115SDK;