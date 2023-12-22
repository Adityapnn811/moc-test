import { Button, Input } from "@/components";
import React from "react";
import { dataUser } from "./page";
import { fetchOTP } from "@/utils";

type OTPAuthProps = {
  setValidasiOTP: React.Dispatch<React.SetStateAction<boolean>>;
  tries: number;
  setTries: React.Dispatch<React.SetStateAction<number>>;
  data: dataUser;
};

export default function OTPAuth({
  setValidasiOTP,
  tries,
  setTries,
  data,
}: Readonly<OTPAuthProps>) {
  const [otp, setOtp] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const [countdown, setCountdown] = React.useState(0);

  // Countdown five minutes to disable button
  React.useEffect(() => {
    if (countdown > 0) {
      setDisabled(true);
      setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setDisabled(false);
    }
  }, [countdown]);

  return (
    <React.Fragment>
      <h1 className="font-bold text-3xl mb-5">Verifikasi OTP</h1>
      <Input
        value={otp}
        setValue={setOtp}
        id="otp"
        label="Masukkan OTP"
        required
      />
      <div className="flex flex-row items-center">
        <Button
          text="Kirim Ulang"
          type="button"
          className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-5"
          onClick={async () => {
            // get local storage
            if (tries && tries % 5 === 0) {
              alert(
                "Anda sudah mencoba 5 kali, silahkan coba lagi 5 menit lagi"
              );
              setCountdown(300);
              setTries(1);
            } else {
              const res = await fetchOTP(data.phone.toString());
              if (res.status === 200) setTries(tries + 1);
            }
          }}
          disabled={disabled}
        />
        {countdown > 0 && (
          <p className="text-sm text-red-600">
            Tunggu {countdown} detik untuk mengirim ulang
          </p>
        )}
      </div>
      <Button
        text="Verifikasi"
        type="button"
        onClick={() => {
          if (localStorage.getItem("otp") === otp) {
            alert("OTP benar, silahkan login");
            setValidasiOTP(false);
          } else {
            alert("OTP salah");
          }
        }}
        className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-5"
      />
    </React.Fragment>
  );
}
