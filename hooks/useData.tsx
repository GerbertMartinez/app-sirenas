import { API } from "@/helpers/axios";
import { AllWeb, histories, MainWeb, Siren, Web, Webs } from "@/types/data";
import { useState } from "react";

const useData = () => {

    const [loading, setLoading] = useState(false);
    const [webs, setWebs] = useState<Webs[] | []>([]);
    const [allWebs, setAllWebs] = useState<AllWeb[]>([]);
    const [web, setWeb] = useState<Web[]>([]);
    const [mainData, setMainData] = useState<MainWeb | null>(null);
    const [webName, setWebName] = useState(null);
    const [sirens, setSirens] = useState<Web[]>([]);
    const [siren, setSiren] = useState<Siren | null>(null);
    const [history, setHistory] = useState<histories[]>([]);

    const getMain = async () => {

        setLoading(true);

        try {
            const response = await API.get('get_main_data');
            setMainData(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const getWebs = async (user: string | null) => {

        setWebs([]);
        setLoading(true);

        let data = {
            "id_user": user
        };

        try {
            const response = await API.post('get_data', data);
            setWebs(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const getWeb = async (web: string | null) => {

        setWeb([]);
        setLoading(true);

        let data = {
            "id_web": web
        };

        try {
            const response = await API.post('get_web', data);
            setWeb(response.data.sirens);
            setWebName(response.data.name);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const getSirens = async () => {

        setSirens([]);
        setLoading(true);

        try {
            const response = await API.get('get_sirens');
            setSirens(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const getSiren = async (siren: string | null) => {

        setSiren(null);
        setLoading(true);

        let data = {
            "id_siren": siren
        };

        try {
            const response = await API.post('get_siren', data);
            setSiren(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const getAllWebs = async () => {

        setAllWebs([]);

        setLoading(true);

        try {
            const response = await API.get('get_webs');
            setAllWebs(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };
    
    const getHistory = async () => {

        setHistory([]);

        setLoading(true);

        try {
            const response = await API.get('get_historic');
            setHistory(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    return {
        loading,
        getMain,
        mainData,
        getWebs,
        webs,
        getWeb,
        web,
        webName,
        getSirens,
        sirens,
        getSiren,
        siren,
        getAllWebs,
        allWebs,
        getHistory,
        history
    };

};

export default useData;