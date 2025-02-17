// 检查运行环境
export const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

// 生成随机的 code_verifier
export async function generateCodeVerifier(): Promise<string> {
    if (isNode) {
        const {randomBytes} = await import('crypto'); // 使用动态导入
        return randomBytes(32).toString('hex');
    } else {
        // 浏览器环境
        const array = new Uint8Array(32);
        window.crypto.getRandomValues(array);
        return Array.from(array).map(b => String.fromCharCode(b)).join('');
    }
}

// 计算 code_challenge
export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
    if (isNode) {
        const {createHash} = await import('crypto')
        const hashed = createHash('sha256').update(codeVerifier).digest();
        return toBase64Url(hashed);
    } else {
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return toBase64Url(new Uint8Array(hash));
    }
}

// Base64 URL安全字符串转换
export function toBase64Url(arr: Uint8Array): string {
    return btoa(String.fromCharCode(...arr))
}