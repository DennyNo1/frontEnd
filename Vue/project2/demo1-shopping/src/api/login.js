import request from '@/utils/request'
export const getPicCode = () => {
    return  request.get('/captcha/image')
}
export const getMessage = (captchaCode,captchaKey,mobile) => {

    return  request.post('/captcha/sendSmsCaptcha',{
        form:{
            captchaCode,captchaKey,mobile
        }
    }
    )
}
//封装一个方法：登录用的
export const login = (isParty,mobile,partyData,smsCode) =>{
    return request.post('/passport/login',{
        form:{
            isParty,mobile,partyData,smsCode
        }
    }

    )
}