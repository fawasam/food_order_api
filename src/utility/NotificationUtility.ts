export const GenerateOtp = () => {
  const otp = Math.floor(10000 + Math.random() * 900000);
  let expiry = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  return { otp, expiry };
};

export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
  try {
    const accountSid = "AC6e7b365af423bba1cf6ba065b2cffdf3";
    const authToken = "295355532330aa1c652b1018e8b22123";
    const client = require("twilio")(accountSid, authToken);
    const response = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: "+12294045218",
      to: `+91${toPhoneNumber}`, // recipient phone number // Add country before the number
    });

    return response;
  } catch (error) {
    return false;
  }
};
