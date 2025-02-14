export default {

    /**
     * 获取设备码和二维码内容
     * @link https://www.yuque.com/115yun/open/shtpzfhewv5nag11
     */
    AUTH_DEVICE_CODE: '/open/authDeviceCode',
    /**
     * 轮询二维码状态接口
     * @link  https://www.yuque.com/115yun/open/shtpzfhewv5nag11
     */
    AUTH_QRCODE_STATUS: 'https://qrcodeapi.115.com/get/status',
    /**
     * 用设备码换取 access_token
     * @link  https://www.yuque.com/115yun/open/shtpzfhewv5nag11
     */
    AUTH_CODE_TO_TOKEN: '/open/deviceCodeToToken',
    /**
     * 刷新 access_token
     * 请勿频繁刷新，否则列入频控。
     * @link  https://www.yuque.com/115yun/open/shtpzfhewv5nag11
     */
    AUTH_REFRESH_TOKEN: '/open/refreshToken',


    /**
     * 获取用户空间和vip信息
     * @link https://www.yuque.com/115yun/open/ot1litggzxa1czww
     */
    USER_INFO: '/open/user/info',


    /**
     * 获取上传凭证
     * @link https://www.yuque.com/115yun/open/kzacvzl0g7aiyyn4
     */
    UPLOAD_GET_TOKEN: '/open/upload/get_token',
    /**
     * 文件断点续传-初始化
     * @link https://www.yuque.com/115yun/open/ul4mrauo5i2uza0q
     */
    UPLOAD_INIT: '/open/upload/init',
    /**
     * 断点续传-续传接口
     * @link https://www.yuque.com/115yun/open/tzvi9sbcg59msddz
     */
    UPLOAD_RESUME: '/open/upload/resume',


    /**
     * 新建文件夹
     * @link https://www.yuque.com/115yun/open/qur839kyx9cgxpxi
     */
    FOLDER_ADD: '/open/folder/add',
    /**
     * 获取文件夹详情
     * @link https://www.yuque.com/115yun/open/rl8zrhe2nag21dfw
     */
    FOLDER_GET_INFO: '/open/folder/get_info',


    /**
     * 获取文件列表
     * @link https://www.yuque.com/115yun/open/kz9ft9a7s57ep868
     */
    U_FILE_FILES: '/open/ufile/files',
    /**
     * 根据文件名搜索文件(夹)
     * @link https://www.yuque.com/115yun/open/ft2yelxzopusus38
     */
    U_FILE_SEARCH: '/open/ufile/search',
    /**
     * 批量复制文件
     * @link https://www.yuque.com/115yun/open/lvas49ar94n47bbk
     */
    U_FILE_COPY: '/open/ufile/copy',
    /**
     * 批量移动文件
     * @link https://www.yuque.com/115yun/open/vc6fhi2mrkenmav2
     */
    U_FILE_MOVE: '/open/ufile/move',
    /**
     * 根据文件提取码取文件下载地址
     * @link https://www.yuque.com/115yun/open/um8whr91bxb5997o
     */
    U_FILE_DOWN_URL: '/open/ufile/downurl',
    /**
     * 批量更新文件名、星标文件
     * @link https://www.yuque.com/115yun/open/gyrpw5a0zc4sengm
     */
    U_FILE_UPDATE: '/open/ufile/update',
    /**
     * 批量删除文件(夹)
     * @link https://www.yuque.com/115yun/open/kt04fu8vcchd2fnb
     */
    U_FILE_DELETE: '/open/ufile/delete',


    /**
     * 回收站列表
     * @link https://www.yuque.com/115yun/open/bg7l4328t98fwgex
     */
    RB_LIST: '/open/ufile/rb/list',
    /**
     * 还原回收站文件(夹)
     * @link https://www.yuque.com/115yun/open/gq293z80a3kmxbaq
     */
    RB_REVERT: '/open/rb/revert',
    /**
     * 批量删除回收站文件、清空回收站
     * @link https://www.yuque.com/115yun/open/gwtof85nmboulrce
     */
    RB_DEL: '/open/rb/del',


    /**
     * 获取开放平台产品列表扫描跳转链接地址
     * @link https://www.yuque.com/115yun/open/yifbvxan6szytyng
     */
    VIP_QR_URL: '/open/vip/qr_url',
}