import { API } from "@/helpers/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const useActions = () => {

    const [loading, setLoading] = useState(false);

    const onAll = async () => {

        setLoading(true);

        const id_user = await AsyncStorage.getItem('id_user');

        let data = {
            "id_user": id_user
        };

        try {
            const result = await API.post('on_all', data);
            console.log(result.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const offAll = async () => {

        setLoading(true);

        const id_user = await AsyncStorage.getItem('id_user');

        let data = {
            "id_user": id_user
        };

        try {
            const result = await API.post('off_all', data);
            console.log(result.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const testAll = async () => {

        setLoading(true);

        const id_user = await AsyncStorage.getItem('id_user');

        let data = {
            "id_user": id_user
        };

        try {
            const result = await API.post('test_all', data);
            console.log(result.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const onSiren = async (id: string) => {

        setLoading(true);

        const id_user = await AsyncStorage.getItem('id_user');

        let data = {
            "id_siren": id,
            "id_user": id_user
        };

        try {
            const result = await API.post('on_siren', data);
            console.log(result.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const offSiren = async (id: string) => {

        setLoading(true);

        const id_user = await AsyncStorage.getItem('id_user');

        let data = {
            "id_siren": id,
            "id_user": id_user
        };

        try {
            const result = await API.post('off_siren', data);
            console.log(result.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const testSiren = async (id: string) => {

        setLoading(true);

        const id_user = await AsyncStorage.getItem('id_user');

        let data = {
            "id_siren": id,
            "id_user": id_user
        };

        try {
            const result = await API.post('test', data);
            console.log(result.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const pingSiren = async (id: string) => {

        setLoading(true);

        let data = {
            "id_siren": id
        };

        try {
            const result = await API.post('ping', data);
            console.log(result.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const onWeb = async (id: string) => {

        setLoading(true);

        const id_user = await AsyncStorage.getItem('id_user');

        let data = {
            "id_web": id,
            "id_user": id_user
        };

        try {
            const result = await API.post('on_web', data);
            console.log(result.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const offWeb = async (id: string) => {

        setLoading(true);

        const id_user = await AsyncStorage.getItem('id_user');

        let data = {
            "id_web": id,
            "id_user": id_user
        };

        try {
            const result = await API.post('off_web', data);
            console.log(result.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const testWeb = async (id: string) => {

        setLoading(true);

        const id_user = await AsyncStorage.getItem('id_user');

        let data = {
            "id_web": id,
            "id_user": id_user
        };

        try {
            const result = await API.post('test_web', data);
            console.log(result.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    return {
        loading,
        onAll,
        offAll,
        testAll,
        onSiren,
        offSiren,
        testSiren,
        pingSiren,
        onWeb,
        offWeb,
        testWeb
    }

};

export default useActions;