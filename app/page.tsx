"use client";
import React from "react";
import RegisForm from "./regisForm";
import OTPAuth from "./otpAuth";

export type dataUser = {
  name: string;
  email: string;
  password: string;
  phone: number;
  provinsi: string;
  kota: string;
  kecamatan: string;
};

export default function RegistrationPage() {
  const [validasiOTP, setValidasiOTP] = React.useState<boolean>(false);
  const [tries, setTries] = React.useState<number>(1);
  const [data, setData] = React.useState<dataUser>({
    name: "",
    email: "",
    password: "",
    phone: 0,
    provinsi: "11",
    kota: "1101",
    kecamatan: "110101",
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="bg-white text-black p-5 rounded-xl w-0.85 md:w-1/2">
        {validasiOTP ? (
          <OTPAuth
            setValidasiOTP={setValidasiOTP}
            tries={tries}
            setTries={setTries}
            data={data}
          />
        ) : (
          <RegisForm
            setValidasiOTP={setValidasiOTP}
            tries={tries}
            setTries={setTries}
            data={data}
            setData={setData}
          />
        )}
      </div>
    </main>
  );
}
