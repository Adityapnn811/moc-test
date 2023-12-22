import * as jwt from "jsonwebtoken";
import process from "process";

type JWTPayload = { otp: string; tries: number; timestamp: Date };

function signJwt({ otp, tries, timestamp }: JWTPayload): string {
  const payload = {
    otp,
    tries,
    timestamp,
  };

  const secretKey = process.env.JWTSECRET ?? "defaultSecret";
  const options = {
    expiresIn: "1h", // Set the expiration time as per your requirement
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
}

function decodeJwt(token: string): any {
  const secretKey = process.env.JWTSECRET ?? "defaultSecret";
  const decoded: JWTPayload | string | jwt.JwtPayload = jwt.verify(
    token,
    secretKey
  );
  return decoded;
}

export { signJwt, decodeJwt };
