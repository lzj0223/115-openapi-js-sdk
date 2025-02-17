// 基础接口返回结构
type BaseResponse<T> = {
    status: boolean; // 接口状态, true正常, false失败
    message: string; // 异常信息
    code: string; // 异常码
    data: ?T;
}

// 获取用户空间和vip信息
type ApiUserInfoResponse = BaseResponse<{
    user_id: string; // 用户id
    // 用户空间信息
    rt_space_info: {
        all_total: { // 用户总空间
            size: string; // 用户总空间大小（字节）
            size_format: string; // 用户总空间大小（格式化）
        };
        all_remain: { // 用户剩余空间
            size: string; // 用户剩余空间大小（字节）
            size_format: string; // 用户剩余空间大小（格式化）
        };
        all_use: { // 用户已使用空间
            size: string; // 用户已使用空间大小（字节）
            size_format: string; // 用户已使用空间大小（格式化）
        };
    };
    vip_info: { // 用户 VIP 等级信息
        level_name: string; // VIP 等级名称
    };
}>

// 获取上传凭证
type ApiUploadGetTokenResponse = BaseResponse<{
    // 上传域名
    endpoint: string;
    // 上传凭证-密钥
    AccessKeySecret: string;
    // 上传凭证-token
    SecurityToken: string;
    // 上传凭证-过期日期
    Expiration: string;
    // 上传凭证-ID
    AccessKeyId: string;
}[]>


// 文件断点续传-初始化post参数
type ApiUploadInitRequestBody = {
    // 文件名
    file_name: string;
    // 文件大小(字节)
    file_size: number;
    // 文件上传目标约定
    target: string;
    // 文件sha1值
    fileid: string;
    // 文件前128Ksha1
    preid?: string;
    // 上传任务key[非秒传的调度接口返回的pick_code字段]
    pick_code?: string;
    // 上传调度文件类型调度标记 [0: 单文件上传任务标识-一条单独的文件上传记录 1: 文件夹任务调度,一个子文件上传请求标识-一次文件夹上传记录。 2：文件夹任务调度的结果后续子文件不作记作单独上传的上传记录 -1: 没有该参数]
    topupload?: number;
}

// 文件断点续传-初始化返回
type ApiUploadInitResponse = BaseResponse<{
    // 上传任务唯一ID，用于续传
    pick_code: string;
    // 文件上传目标约定
    target: string;
    // 上传的bucket
    bucket: string;
    // OSS objectID
    object: string;
    // 上传时间
    callback: {
        // 上传完成回调信息
        callback: string;
        // 上传完成回调参数
        callback_var: string;
    }[];
}[]>

// 文件断点续传-续传
type ApiUploadResumeRequestBody = {
    // 文件大小(字节)
    file_size: number;
    // 文件上传目标约定
    target: string;
    // 文件sha1值
    fileid: string;
    // 上传任务key(非秒传的调度接口返回的pick_code字段)
    pick_code?: string;
}

// 文件断点续传-续传
type ApiUploadResumeResponse = BaseResponse<{
// 上传任务唯一ID，用于续传
    pick_code: string;
    // 文件上传目标约定
    target: string;
    // 接口版本
    version: string;
    // 上传的bucket
    bucket: string;
    // OSS objectID
    object: string;
    // 上传时间
    callback: {
        // 上传完成回调信息
        callback: string;
        // 上传完成回调参数
        callback_var: string;
    }[];
}[]>

// 新建文件夹
type ApiFolderAddRequestBody = {
    pid: string; // 新建文件夹所在的父目录ID (根目录的ID为0)
    file_name: string; // 新建文件夹名称
}

// 新建文件夹
type ApiFolderAddResponse = BaseResponse<{
    file_id: string; // 新建的文件夹ID
    file_name: string; // 新建文件夹名称
}>

// 获取文件列表
type ApiUFileFilesRequestQuery = {
    // 目录分类ID，int，默认为1: 正常文件、7: 回收站文件、12为期间文件、120: 彻底删除文件、简历附件
    aid: number;
    // 目录ID，对应表的parent_id，不是表的cid
    cid: number;
    // 文件类型
    type?: string;
    // 查询数量，默认20
    limit?: number;
    // 查询起始位，默认0
    offset?: number;
    // 文件后缀名
    suffix?: string;
    // 排序，1: 升序 0: 降序
    asc?: number;
    // 排序字段，filename: 文件名 filesize: 文件大小 usertime: 更新时间 filetype:文件类型
    o?: string;
    // 是否使用记忆排序，1使用自定义排序，不使用记忆排序,0 使用记忆排序，自定义排序失效,2自定义排序，未文件夹置顶
    custom_order?: number;
    // 1:要展示文件夹 0:不展示
    stdin?: number;
    // 筛选星标文件，1:是 0:全部
    star?: number;
    // 系统通用目录
    sys_dir?: boolean;
    // 是否记录文件夹的打开时间
    record_open_time?: boolean;
    // 是否只显示当前文件夹内文件
    cur?: boolean;
}

// 获取文件列表
type ApiUFileFilesResponse = {
    data: {
        // 文件ID
        fid: string;
        // 文件的状态，aid 的别名，1正常，7删除(回收站)，120彻底删除
        aid: string;
        // 父目录ID
        pid: string;
        // 文件分类，0文件夹，1文件
        fc: string;
        // 文件(夹)名称
        fn: string;
        // 文件夹封面
        fco: string;
        // 是否星标，1: 星标
        ism: string;
        // 是否加密，1: 加密
        isp: number;
        // 文件提取码
        pc: string;
        // 修改时间
        upt: string;
        // 修改时间
        uet: string;
        // 上传时间
        uppt: string;
        // 未知用途
        cm: number;
        // 文件备注
        fdesc: string;
        // 未知用途
        ispl: number;
        // 文件标签
        fl: string[];
        // sha1值
        sha1: string;
        // 文件大小
        fs: string;
        // 文件状态 0/2 未上传完成，1已上传完成
        fta: string;
        // 文件后缀名
        ico: string;
        // 音频长度
        fatr: string;
        // 是否为视频
        isv: number;
        // 视频清晰度
        def: number;
        // 视频清晰度2
        def2: number;
        // 音视频时长
        play_long: number;
        // 视频图片
        v_img: string;
        // 图片缩略图
        thumb: string;
        // 原图地址
        uo: string;
    }[];
    // 父目录树
    path: {
        // 父目录文件名称
        name: string;
        // 目录分类ID，可能是数字或字符串
        aid: number | string;
        // 目录ID，可能是数字或字符串
        cid: number | string;
        // 父目录ID，可能是数字或字符串
        pid: number | string;
        // 是否加密，可能是数字或字符串
        isp: number | string;
        // 父目录CID
        p_cid: string;
        // 未知用途
        fv: string;
    }[];

    // 当前目录文件数量
    count: number;
    // 系统文件夹数量
    sys_count: number;
    // 偏移量
    offset: number;
    // 分页量
    limit: number;
    // 文件的状态，aid 的别名，1正常，7删除(回收站)，120彻底删除
    aid: string;
    // 父目录id
    cid: number;
    // 排序，1: 升序 0: 降序
    is_asc: number;
    // 最小文件大小
    min_size: number;
    // 最大文件大小
    max_size: number;
    // 系统目录
    sys_dir: string;
    // 是否返回文件数据
    hide_data: string;
    // 是否记录文件夹的打开时间
    record_open_time: string;
    // 是否星标：1: 星标；0: 未星标
    star: number;
    // 一级筛选大分类，1: 文档，2: 图片，3: 音乐，4: 视频，5: 压缩包，6: 应用
    type: FileType;
    // 一级筛选选其他时填写的后缀名
    suffix: string;

    // 是否只显示当前文件夹内文件
    cur: number;
    // 是否显示文件夹
    stdin: number;
    // 字段列表
    fields: string;
    // 排序
    order: string;
    // 是否混排，1: 混排；0: 非混排
    fc_mix: number;
    // 状态
    state: boolean;
    // 错误信息
    error: string;
    // 错误码
    errno: number;
}


// 文件类型枚举
enum FileType {
    Document = 1,
    Image = 2,
    Music = 3,
    Video = 4,
    Archive = 5,
    Application = 6
}

// 获取文件夹详情
type ApiFolderGetInfoResponse = BaseResponse<{
    // 包含文件总数量
    count: string;
    // 文件夹大小
    size: string;
    // 包含文件夹数量
    folder_count: string;
    // 视频时长：-1: 正在统计，其他数值为视频时长的数值(单位秒)
    play_long: number;
    // 是否开启展示视频时长
    show_play_long: number;
    // 上传时间
    ptime: string;
    // 修改时间
    utime: string;
    // 文件名
    file_name: string;
    // 文件提取码
    pick_code: string;
    // sh1值
    sha1: string;
    // 文件夹ID
    file_id: string;
    // 是否星标
    is_mark: string;
    // 文件夹最近打开时间
    open_time: number;
    // 文件属性：1: 文件；0: 文件夹
    file_category: string;
    // 文件夹所在的路径
    paths: {
        // 父目录ID
        file_id: number;
        // 父目录名称
        file_name: string;
    }[];
}>

// 文件搜索
type ApiUFileSearchRequestQuery = {
    // 查找关键字
    search_value: string;
    // 是否普通提取码，如果该值为1则查询提取码为search_value的文件
    pick_code: string;
    // 单页记录数，默认20
    limit: string;
    // 数据显示偏移量
    offset: string;
    // 支持文件标签搜索
    file_label?: string;
    // 目标目录cid=-1时，表示不返回列表任何内容
    cid?: string;
    // 搜索结果匹配的开始时间；格式：2020-11-19
    gte_day?: string;
    // 搜索结果匹配的结束时间；格式：2020-11-20
    lte_day?: string;
    // 只显示文件或文件夹，1只显示文件夹，2只显示文件
    fc?: string;
    // 一级筛选大分类，1: 文档，2: 图片，3: 音乐，4: 视频，5: 压缩包，6: 应用
    type?: FileType;
    // 一级筛选选其他时填写的后缀名
    suffix?: string;
}

// 文件搜索
type ApiUFileSearchResponse = BaseResponse<{
    // 文件ID
    file_id: string;
    // 用户ID
    user_id: string;
    // 文件sha1值
    sha1: string;
    // 文件名称
    file_name: string;
    // 文件大小
    file_size: string;
    // 上传时间
    user_ptime: string;
    // 更新时间
    user_utime: string;
    // 文件提取码
    pick_code: string;
    // 父目录ID
    parent_id: string;
    // 文件的状态，aid 的别名，1正常，7删除(回收站)，120彻底删除
    area_id: string;
    // 文件是否隐藏，0未隐藏，1已隐藏
    is_private: number;
    // 1: 文件；0: 文件夹
    file_category: string;
    // 文件后缀
    ico: string;
}[]> & {
    count: number;
    limit: number;
    offset: number;
    message: string;
    code: string;
}

// 批量复制文件
type ApiUFileCopyRequestBody = {
    // 目标目录，即所需移动到的目录
    pid: string;
    // 所复制的文件和目录id，多个文件和目录请以，隔开
    file_id: string;
    // 复制的文件在目标目录是否允许重复，默认0: 可以；1: 不可以
    nodupli?: string;
}


// 批量复制文件
type ApiUFileMoveRequestBody = {
    file_ids: string; // 需要移动的文件(夹)ID
    to_cid: string; // 要移动所在的目录ID，根目录为0
}

// 获取文件下载地址
type ApiUFileDownUrlResponse = BaseResponse<{
    // key 为文件id
    [key: string]: {
        // 文件名
        file_name: string;
        // 文件大小
        file_size: number;
        // 文件提取码
        pick_code: string;
        // 文件sha1值
        sha1: string;
        // URL相关信息
        url: {
            // 文件下载地址
            url: string;
            // 客户端标识
            client: number;
            // 描述信息
            desc: null;
            // 未知用途
            isp: null;
            // oss地址
            oss_id: string;
            // 未知用途
            ooid: string;
        }
    }
}>;


// 批量更新文件名、星标文件
type ApiUFileUpdateRequestBody = {
    file_id: string[]; // 需要更改名字的文件(夹)ID
    file_name: ?string; // 新的文件(夹)名字
    star: ?string; // 是否星标；1：星标；0；取消星标
}

// 批量更新文件名、星标文件
type ApiUFileUpdateResponse = BaseResponse<{
    file_name: string,
    star: string // 是否星标；1：星标；0；取消星标
}>

// 批量删除文件(夹)
type ApiUFileDeleteRequestBody = {
    file_id: string[]; // 需要删除的文件(夹)ID
    parent_id: string; // 删除的文件(夹)ID所在的父目录ID
}
// 批量删除文件(夹)
type ApiUFileDeleteResponse = BaseResponse<string[]>

// 回收站列表
type ApiRbListRequestQuery = {
    limit: number; // 单页记录数，int，默认30，最大200
    offset: number; // 数据显示偏移量
}

// 回收站文件类型枚举
enum RecycleItemType {
    File = "1",
    Directory = "2"
}

type ApiRbListResponse = BaseResponse<{
    offset: number; // 偏移量
    limit: number; // 分页量
    count: number; // 回收站文件总数
    rb_pass: number; // 是否设置回收站密码
    // key为文件(夹)回收站ID
    [key: string]: {
        // 文件(夹)回收站ID
        id: string;
        // 文件(夹)名称
        file_name: string;
        // 类型 (1: 文件, 2: 目录)
        type: RecycleItemType;
        // 文件大小
        file_size: string;
        // 删除日期
        dtime: string;
        // 缩略图地址
        thumb_url: string;
        // 还原状态，-1表示还原中，0表示正常状态
        status: string;
        // 原文件的父目录id
        cid: number;
        // 原文件的父目录名称
        parent_name: string;
        // 文件提取码
        pick_code: string;
    }
}>

// 还原回收站文件(夹)
type ApiRbReverseResponse = BaseResponse<{
    // 还原回收站文件(夹)
    [key: string]: {
        // 操作状态
        state: boolean;
        // 错误信息
        error?: string;
        // 错误码
        errno?: number;
        // 还原文件ID及状态
        file_id: {
            // 还原状态
            state: boolean;
        };
    }
}>


type ApiAuthDeviceCodeResponse = BaseResponse<{
    // 设备码
    uid?: string,
    // 校验用的时间戳，轮询设备码状态用到
    time?: number,
    // 二维码内容，第三方客户端需要根据此内容生成设备二维码，提供给115客户端扫码
    qrcode?: string,
    // 校验用的签名，轮询设备码状态用到
    sign?: string
}>


// 轮询二维码状态输出
type ApiQrCodeStatusResponse = {
    /** 状态码 (0:二维码无效，结束轮询; 1:继续轮询) */
    state?: number;
    /** 业务状态码 */
    code?: number;
    /** 错误信息 */
    message?: string;
    /** 115客户端扫码或者输入设备码后才有值 */
    data?: {
        /** 操作提示信息 */
        msg?: string;
        /**
         * 二维码状态
         * 1:扫码成功，等待确认
         * 2:确认登录/授权，结束轮询
         */
        status?: number;
        /** 接口版本号 */
        version?: string;
    };
}

type ApiAccessTokenResponse = BaseResponse<any> & {
    /**
     * 访问令牌
     * @description 用于访问资源接口的凭证
     */
    access_token?: string;
    /**
     * 刷新令牌
     * @description 用于刷新access_token，有效期1年
     */
    refresh_token?: string;
    /**
     * 过期时间
     * @description access_token有效期，单位秒
     * @example 2592000
     */
    expires_in?: number;
    /** 错误信息 */
    error?: string;
    /** 错误码 */
    errno?: number;
}