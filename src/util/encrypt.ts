import crypto from 'crypto';
/**
 * 加密类
 */
export class Encryptor {
    level:number;
    constructor(level?:number | undefined) {
        this.level = level ? level : 5
    }
    /**
     * 将传入的参数按照设定规范加密后返回
     * @param value 待加密内容
     * @returns {string} 加密结果
     */
    Encrypt(value: string): string {
        for (let i = 0; i < this.level; i++) {
            let hash = crypto.createHash('md5');
            hash.update(value);
            value = hash.digest('hex');
        }
        return value;
    }
}