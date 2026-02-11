import jwt from 'jsonwebtoken';
import { HttpMessage } from '../constants';

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateToken = (payload: object, secret: string): string => {
    if (!payload || !secret) {
        return HttpMessage.NOT_FOUND
    }
    // const expiryDate = expiry ? expiry :"1d"
    return jwt.sign(payload, secret, { expiresIn:"1d"});
}