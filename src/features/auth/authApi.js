import { mockLogin, mockRegister } from "../../services/mockServer"

export const registerUser = async (data) => {
    const response = await mockRegister(data);
    return response?.data;
};

export const loginUser = async (data) => {
    const response = await mockLogin(data);
    return response?.data;
};