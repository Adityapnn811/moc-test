import React, { ChangeEvent } from "react";
import { Input, Select } from "@/components";
import {
  isPasswordValid,
  isEmailValid,
  fetchProvinsi,
  fetchKota,
  fetchKecamatan,
  signJwt,
  fetchOTP,
} from "@/utils";
import Button from "@/components/Button";
import { dataUser } from "./page";

type RegisFormProps = {
  setValidasiOTP: React.Dispatch<React.SetStateAction<boolean>>;
  tries: number;
  setTries: React.Dispatch<React.SetStateAction<number>>;
  data: dataUser;
  setData: React.Dispatch<React.SetStateAction<dataUser>>;
};

export default function RegisForm({
  setValidasiOTP,
  tries,
  setTries,
  data,
  setData,
}: Readonly<RegisFormProps>) {
  const [emailValid, setEmailValid] = React.useState<boolean>(false);
  const [passwordValid, setPasswordValid] = React.useState<boolean>(false);
  const [dataProv, setDataProv] = React.useState<
    Array<{ id: string; nama: string }>
  >([]);
  const [dataKota, setDataKota] = React.useState<
    Array<{ id: string; nama: string }>
  >([]);
  const [dataKecamatan, setDataKecamatan] = React.useState<
    Array<{ id: string; nama: string }>
  >([]);

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetchProvinsi();
      setDataProv(res);
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      if (data.provinsi !== "") {
        const res = await fetchKota(data.provinsi);
        setDataKota(res);
      }
    }
    fetchData();
  }, [data.provinsi]);

  React.useEffect(() => {
    async function fetchData() {
      if (data.kota !== "") {
        const res = await fetchKecamatan(data.kota);
        setDataKecamatan(res);
      }
    }
    fetchData();
  }, [data.kota]);

  const passwordOnChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    setData: React.Dispatch<React.SetStateAction<dataUser>>,
    setPasswordValid: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setData({ ...data, password: e.target.value });
    isPasswordValid(e.target.value)
      ? setPasswordValid(true)
      : setPasswordValid(false);
  };

  const emailOnChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    setData: React.Dispatch<React.SetStateAction<dataUser>>,
    setEmailValid: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setData({ ...data, email: e.target.value });
    isEmailValid(e.target.value) ? setEmailValid(true) : setEmailValid(false);
  };

  const onSubmit = async () => {
    if (emailValid && passwordValid) {
      const res = await fetchOTP(data.phone.toString());

      if (res.status === 200) {
        setTries(tries + 1);
        setValidasiOTP(true);
      }
    }
  };

  return (
    <React.Fragment>
      <h1 className="font-bold text-3xl mb-5">Registrasi</h1>
      <form>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <Input
            value={data.name}
            setValue={setData}
            id="name"
            type="text"
            label="Name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Nama Lengkap"
            required
          />
          <Input
            value={data.email}
            setValue={setData}
            onChange={(e) => emailOnChangeHandler(e, setData, setEmailValid)}
            id="email"
            type="email"
            label="Email"
            placeholder="john.doe@email.com"
            message={
              !emailValid && data.email !== ""
                ? "Tolong masukkan email yang valid"
                : ""
            }
            required
          />
          <Input
            value={data.password}
            setValue={setData}
            onChange={(e) =>
              passwordOnChangeHandler(e, setData, setPasswordValid)
            }
            id="password"
            type="password"
            label="Password"
            placeholder=""
            message={
              !passwordValid && data.password !== ""
                ? "Password minimal berjumlah 8 karakter beserta huruf dan angka"
                : ""
            }
            required
          />
          <Input
            value={data.phone}
            setValue={setData}
            id="phone"
            type="phone"
            label="No. HP"
            placeholder="8212345678"
            onChange={(e) =>
              setData({ ...data, phone: parseInt(e.target.value) })
            }
            required
          />
          <Select
            options={dataProv}
            value={data.provinsi}
            onChange={(e) => setData({ ...data, provinsi: e.target.value })}
            id="provinsi"
            label="Provinsi"
          />
          <Select
            options={dataKota}
            value={data.kota}
            onChange={(e) => setData({ ...data, kota: e.target.value })}
            id="kota"
            label="Kabupaten/Kota"
          />
          <Select
            options={dataKecamatan}
            value={data.kecamatan}
            onChange={(e) => setData({ ...data, kecamatan: e.target.value })}
            id="kecamatan"
            label="Kecamatan"
          />
        </div>
        <Button text="Register" onClick={() => onSubmit()} type="submit" />
      </form>
    </React.Fragment>
  );
}
