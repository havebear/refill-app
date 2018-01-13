/*
 * @Author: bgg 
 * @Date: 2017-12-01 16:03:55  
*/
export default class VerifyService {

    public constructor() { }

    /**
     * 验证用户名 用户名由4-16位字母或数字组成
     * @param str 
     */
    public username(str: string): Boolean {
        let reg = /^[A-Za-z0-9]{4,16}$/;
        return reg.test(str);
    }

    /**
     * 验证密码 密码由6-16位任意字符串组成
     * @param str
     */
    public password(str: string): Boolean {
        let reg = /^.{6,16}$/;
        return reg.test(str);
    }

}