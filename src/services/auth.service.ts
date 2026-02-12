import { HttpMessage, HttpStatus } from "../constants";
import { errorIndex } from "../errors/errorIndex";
import { generateOTP, generateToken } from "../shared/helper";
import twilioService from "./twillio.service";
import { getEnv } from "../shared/utils";
import { createUser, findByCondition } from "../repository/users.repository";
import logger from "../config/logger";


export const registerUser = async (phone: string) => {
  logger.info(`Register attempt for phone: ${phone}`);

  const existingUser = await findByCondition({ phone });

  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
  const token = generateToken({ phone }, getEnv("JWT_SECRET"));

  const successfullySendOtp = await twilioService.sendOTP(phone, otp);

  if (!successfullySendOtp) {
    logger.error(`Failed to send OTP to phone: ${phone}`);
    throw new errorIndex.BadRequestException(
      HttpMessage.BAD_REQUEST,
      HttpStatus.BAD_REQUEST
    );
  }

  if (!existingUser) {
    logger.info(`Creating new user with phone: ${phone}`);

    const newUser = await createUser({
      phone,
      otp,
      otpExpiry,
      token,
      isverified: false,
    });

    return newUser;
  }

  if (existingUser.isverified) {
    logger.warn(`User already verified: ${phone}`);

    throw new errorIndex.ConflictException(
      HttpMessage.CONFLICT,
      HttpStatus.CONFLICT
    );
  }

  logger.info(`Updating OTP for existing unverified user: ${phone}`);

  existingUser.otp = otp;
  existingUser.otpExpiry = otpExpiry;
  existingUser.token = token;

  await existingUser.save();

  return existingUser;
};



export const verifyUserOTP = async (phone: string, enteredOTP: string) => {
  logger.info(`OTP verification attempt for phone: ${phone}`);

  const user = await findByCondition({ phone });

  if (!user) {
    logger.warn(`OTP verification failed - user not found: ${phone}`);

    throw new errorIndex.NotFoundHandler(
      HttpMessage.NOT_FOUND,
      HttpStatus.NOT_FOUND
    );
  }

  if (user.otp !== enteredOTP) {
    logger.warn(`Invalid OTP entered for phone: ${phone}`);

    throw new errorIndex.BadRequestException(
      HttpMessage.BAD_REQUEST,
      HttpStatus.BAD_REQUEST
    );
  }

  if (!user.otpExpiry || user.otpExpiry < new Date()) {
    logger.warn(`OTP expired for phone: ${phone}`);

    throw new errorIndex.BadRequestException(
      HttpMessage.BAD_REQUEST,
      HttpStatus.BAD_REQUEST
    );
  }

  user.isverified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;

  await user.save();

  logger.info(`User successfully verified: ${phone}`);

  return user;
};



export const loginUser = async (phone: string) => {
  logger.info(`Login attempt for phone: ${phone}`);

  const user = await findByCondition({ phone });

  if (!user) {
    logger.warn(`Login failed - user not found: ${phone}`);

    throw new errorIndex.NotFoundHandler(
      HttpMessage.NOT_FOUND,
      HttpStatus.NOT_FOUND
    );
  }

  if (!user.isverified) {
    logger.warn(`Login blocked - user not verified: ${phone}`);

    throw new errorIndex.BadRequestException(
      "User not verified",
      HttpStatus.BAD_REQUEST
    );
  }

  const token = generateToken(
    { phone: user.phone, id: user._id },
    getEnv("JWT_SECRET")
  );

  user.token = token;
  await user.save();

  logger.info(`User logged in successfully: ${phone}`);

  return { user, token };
};
