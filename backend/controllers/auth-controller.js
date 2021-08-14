const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');

class AuthController {
    async sendOtp(req, res) {
        const { phone } = req.body;

        if(!phone){
            res.status(400).json({message: 'Phone field is empty'});
        }

        const otp = await otpService.generateOtp();

        // Time to leave 
        const ttl = 1000 * 60 * 2; // 2 min
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;

        const hash = hashService.hashOtp(data);

        try {
            // await otpService.sendOtpBySms(phone, otp);
            res.json({
                hash: `${hash}.${expires}`,
                phone,
                otp
            })
        } catch(e) {
            console.log(e);
            res.status(500).json({message: "Message sending failed"})
        }
    };

    async verifyOtp(req, res) {
        const { otp, hash, phone } = req.body;
        if (!otp || !hash || !phone) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const [hashedOtp, expires] = hash.split('.');
        if (Date.now() > +expires) {
            return res.status(400).json({ message: 'OTP expired!' });
        }

        const data = `${phone}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp, data);
        if (!isValid) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        let user;
        try {
            user = await userService.findUser({ phone });
            if (!user) {
                user = await userService.createUser({ phone });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Db error' });
        }

        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id,
            activated: false,
        });

        await tokenService.storeRefreshToken(refreshToken, user._id);

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        const userDto = new UserDto(user);
        res.json({ user: userDto, auth: true });
    }

    async refresh(req, res) {
        // Getting refresh token from cookies
        const { refreshToken: refreshTokenFromCookies } = req.cookies;
                                                                                                               
        // Checking if token is valid
        let userData;
        try{
            userData = await tokenService.verifyRefreshToken(refreshTokenFromCookies);
        } catch(err) {
            return res.status(401).json({message: 'Invalid Tokenhi'})
        }

        // Checking if token is in db
        try {
            const token = await tokenService.findRefreshToken(userData._id, refreshTokenFromCookies);
            if(!token){
                res.status(401).json({ message: 'Invalid Token'});
            }
        } catch(err) {
            res.status(500).json({ message: 'Internal Error'});
        }
        
        // Check if valid user
        const user = await userService.findUser({_id: userData._id});
        if(!user) {
            return res.status(404).json({ message: 'No User'});
        }
        
        // Generate new token
        const { refreshToken, accessToken } = tokenService.generateTokens({_id: userData._id, });
        
        // Update refresh Token
        try {
            await tokenService.updateRefreshToken(userData._id, refreshToken);
        } catch(err) {
            res.status(500).json({ message: 'Internal Error'});
        }

        // Put in-cookie
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        // Response
        const userDto = new UserDto(user);
        res.json({ user: userDto, auth: true });
    }

    async logout(req, res) {
        const { refreshToken } = req.cookies;

        // delete refresh token from db
        await tokenService.removeToken(refreshToken);

        // delete cookies
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.json({ user: null, auth: false });
    }
}

module.exports = new AuthController();