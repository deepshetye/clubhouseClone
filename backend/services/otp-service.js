const crypto = require('crypto');
const hashService = require('../services/hash-service')

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid, smsAuthToken, {
    lazyLoading: true
})

class OtpService {
    async generateOtp() {
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }

    async sendOtpBySms(phone, otp) {
        return await twilio.messages.create({
            to: phone,
            from: process.env.SMS_FROM_NUMBER,
            body: `Your clubhouse otp code is ${otp}`
        })
    }

    verifyOtp(hashOtp, data) {
        let computedHash = hashService.hashOtp(data);

        return computedHash === hashOtp;
    }
}

module.exports = new OtpService();