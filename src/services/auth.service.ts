import { HttpMessage, HttpStatus } from "../constants";
// import usersSchema from "../models/usersSchema";
import { errorIndex } from "../errors/errorIndex";
import { generateOTP, generateToken } from "../shared/helper";
import twilioService from "./twillio.service";
import { getEnv } from "../shared/utils";
import { createUser, findUserByPhone } from "../repository/users.repository";

export const registerUser = async (phone: string) => {
    const existingUser = await findUserByPhone(phone);

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    const token = generateToken({ phone }, getEnv("JWT_SECRET"));

    const successfullySendOtp = await twilioService.sendOTP(phone, otp);

    if (!successfullySendOtp) {
        throw new errorIndex.BadRequestException(
            HttpMessage.BAD_REQUEST,
            HttpStatus.BAD_REQUEST
        );
    }

    if (existingUser) {

        if (existingUser.isverified) {
            throw new errorIndex.ConflictException(
                HttpMessage.CONFLICT,
                HttpStatus.CONFLICT
            );
        }

        existingUser.otp = otp;
        existingUser.otpExpiry = otpExpiry;
        existingUser.token = token;

        await existingUser.save();
        return existingUser;
    }

    const newUser = await createUser({
        phone,
        otp,
        otpExpiry,
        token,
        isverified: false,
    });

    return newUser;
};


export const verifyUserOTP = async (phone: string, enteredOTP: string) => {
    // console.log("phone---->",phone);
    
    const user = await findUserByPhone(phone)

    if (!user) {
        throw new errorIndex.NotFoundHandler(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (user.otp !== enteredOTP) {
        throw new errorIndex.BadRequestException(HttpMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
        throw new errorIndex.BadRequestException(HttpMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    user.isverified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();
    return user;
};
