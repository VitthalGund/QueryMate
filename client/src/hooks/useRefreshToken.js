import axios from '../api/axios';
import { useContext } from 'react';
import AuthenticationContext from '../context/Auth/userContext';

const useRefreshToken = () => {
    const { setAuth, setUserData } = useContext(AuthenticationContext);

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken,
                username: response.data.username,
                password: response.data.password,
                email: response.data.email
            }
        });

        setUserData(prev => {
            return {
                ...prev,
                username: response.data.username,
                email: response.data.email
            }
        });

        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;