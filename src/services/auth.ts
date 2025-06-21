import instance from "@/libs/axios/instance";
import  endpoint  from "./endpoint.constant";
import { IRegister } from "@/types/Auth";

const authServices = {
    register: (payload: IRegister) =>
  instance.post(`${endpoint.AUTH}/register`, payload),

};
console.log("Register endpoint:", `${endpoint.AUTH}/register`);

export default authServices;