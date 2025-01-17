import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = 'http://localhost:4000';

const refreshToken = async (token) => {
    try {
        const res = await axios.post("/api/refresh", {
            token,
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken(user?.refreshToken);
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken
                };
                dispatch(stateSuccess(refreshUser));
                config.headers["token"] = "Bearer " + data.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    return newInstance;
}
