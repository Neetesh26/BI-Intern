import twilio, { Twilio } from "twilio";
import { getEnv } from "../shared/utils";

class TwilioService {
  private client: Twilio;
  private serviceSid: string;

  constructor() {
    if (
      !getEnv('TWILIO_SID') ||
      !getEnv('TWILIO_AUTH') ||
      !getEnv('TWILIO_SERVICE')
    ) {
      throw new Error("Twilio environment variables missing");
    }

    this.client = twilio(
      getEnv('TWILIO_SID'),
      getEnv('TWILIO_AUTH')
    );

    this.serviceSid = getEnv('TWILIO_SERVICE');
  }

  async sendOTP(phone: string , otp: string) {
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
    return await this.client.verify.v2
      .services(this.serviceSid)
      .verifications.create({
        customCode: otp,
        to: formattedPhone,
        channel: "sms",
      });
  }

  async verifyOTP(phone: string, code: string) {
    return await this.client.verify.v2
      .services(this.serviceSid)
      .verificationChecks.create({
        to: phone,
        code: code,
      });
  }
}

export default new TwilioService();
