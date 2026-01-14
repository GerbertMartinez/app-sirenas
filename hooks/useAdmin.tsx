import { API } from "@/helpers/axios";
import { AllUsers, createUser, createWeb } from "@/types/data";
import { useState } from "react";

const useAdmin = () => {

    const [loading, setLoading] = useState(false);
    const [allUsers, setAllUsers] = useState<AllUsers[]>([]);

    const editWebSirens = async (id: number | undefined, selectedSirens: number[]) => {

        setLoading(true);

        let data = {
            sirens: selectedSirens
        };

        try {
            const send = await API.post(`edit_web_sirens/${id}`, data)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const createWeb = async (form: createWeb, selectedSirens: number[]) => {

        setLoading(true);

        let data = {
            form: form,
            sirens: selectedSirens
        };

        try {
            const send = await API.post('create_web', data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const deleteWeb = async (id: number | undefined) => {

        setLoading(true);

        let data = {
            id_web: id
        };

        try {
            const send = await API.post('delete_web', data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const editUserWebs = async (id: number | undefined, selectedWebs: number[]) => {

        setLoading(true);

        let data = {
            webs: selectedWebs
        };

        try {
            const send = await API.post(`edit_user_webs/${id}`, data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const createUser = async (form: createUser, selectedWebs: number[]) => {

        setLoading(true);

        let data = {
            form: form,
            webs: selectedWebs
        };

        try {
            const send = await API.post('create_user', data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const deleteUser = async (id: number | undefined) => {

        setLoading(true);

        let data = {
            id_user: id
        };

        try {
            const send = await API.post('delete_user', data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const getUsers = async () => {

        setAllUsers([]);

        setLoading(true);

        try {
            const response = await API.get('get_users');
            setAllUsers(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    return {
        loading,
        editWebSirens,
        getUsers,
        allUsers,
        editUserWebs,
        createUser,
        deleteUser,
        createWeb,
        deleteWeb
    };

};

export default useAdmin;