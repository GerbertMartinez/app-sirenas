import { API } from "@/helpers/axios";
import { Change, Login, User } from "@/types/login";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";

const useAuth = () => {

    const [error, setError] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [id_user, setIdUser] = useState<string | null>(null);
    const [level, setLevelUser] = useState<string | null>(null);
    const [admin, setAdmin] = useState<string | null>(null);

    useEffect(() => {

        const loadStorage = async () => {

           try {
                const id = await AsyncStorage.getItem('id_user');
                const level = await AsyncStorage.getItem('level_user');
                const admin = await AsyncStorage.getItem('admin');

                setIdUser(id);
                setLevelUser(level);
                setAdmin(admin);
            } catch (e) {
                console.log("Error al cargar AsyncStorage", e);
            }

        };

        loadStorage();

    },[]);

    const login = async (data: Login) => {

        setError(false);

        try {

            const token = await AsyncStorage.getItem('push_token');

            const payload = {
                ...data,
                token: token
            }

            const response = await API.post('login', payload);

            if (response.data.code === 200) {

                AsyncStorage.setItem('id_user', response.data.user.id_user.toString());
                AsyncStorage.setItem('level_user', response.data.user.level.toString());
                AsyncStorage.setItem('admin', String(response.data.user.admin ?? 0));

                setIdUser(response.data.user.id_user);
                setLevelUser(response.data.user.level);
                setAdmin(response.data.user.admin);

                setUser(response.data.user);
                return response.data.user;

            } else {
                setError(true);
            }

        } catch(err) {
            console.log('axios',err);
            setUser(null);
            return null;
        }

    };

    const changePass = async (data: Change) => {

        const id_user = await AsyncStorage.getItem('id_user');

        let datos = {
            id_user: id_user,
            pass: data.newpass,
            cpass: data.confpass
        };

        try {
            const response = await API.post('change', datos);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    const logout = useCallback(async () => {

        await AsyncStorage.removeItem('id_user');
        await AsyncStorage.removeItem('level_user');
        await AsyncStorage.removeItem('admin');

        setIdUser(null);
        setLevelUser(null);
        setAdmin(null);
        router.replace('/');

    }, []);

    return {
        login,
        logout,
        user,
        error,
        id_user,
        level,
        admin,
        changePass
    }

};

export default useAuth;