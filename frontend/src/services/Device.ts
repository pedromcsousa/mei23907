import axios from "axios";

export async function getAllDevices() {
  console.log(import.meta.env.VITE_API_GATEWAY);
  const res = await axios.get(import.meta.env.VITE_API_GATEWAY + "device");
  console.log(res);
  return res.data;
}
