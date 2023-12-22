async function fetchProvinsi() {
  const res = await fetch(
    "https://ibnux.github.io/data-indonesia/provinsi.json"
  );
  return res.json();
}

async function fetchKota(idProv: string) {
  const res = await fetch(
    `https://ibnux.github.io/data-indonesia/kabupaten/${idProv}.json`
  );
  return res.json();
}
async function fetchKecamatan(idKota: string) {
  const res = await fetch(
    `https://ibnux.github.io/data-indonesia/kecamatan/${idKota}.json`
  );
  return res.json();
}

async function fetchOTP(phone: string) {
  const apiToken = "XjhGkWLRp5sqivC0yaT6";
  const OTP = Math.floor(100000 + Math.random() * 900000);
  const res = await fetch(
    `https://wa.ikutan.my.id/send/${apiToken}/62${phone}?text=Berikut adalah kode OTP anda: ${OTP}`,
    { method: "GET", mode: "no-cors" }
  );
  localStorage.setItem("otp", OTP.toString());
  return res;
}

export { fetchProvinsi, fetchKecamatan, fetchKota, fetchOTP };
