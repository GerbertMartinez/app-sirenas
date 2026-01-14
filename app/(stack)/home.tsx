import MainCard from '@/components/MainCard';
import WebCard from '@/components/WebCard';
import useAuth from '@/hooks/useAuth';
import useData from '@/hooks/useData';
import { useEffect } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';

const home = () => {
    
    const {level, id_user} = useAuth();
    const {loading, getMain, mainData, getWebs, webs} = useData();

    const onRefresh = () => {
        getMain();
        getWebs(id_user);
    };

    useEffect(() => {

        getMain();

    },[]);

    useEffect(() => {
        getWebs(id_user);
    },[id_user]);

    return (

        <ScrollView
            refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
        >
            <View className='pt-8'>

                {level === '1' && (
                    <View className='px-4 mb-8'>
                        <MainCard 
                            name="TODAS LAS SIRENAS"
                            hot={mainData?.hot ?? 0}
                            online={mainData?.online ?? 0}
                            total={mainData?.total ?? 0}
                            sounding={mainData?.sounding ?? 0}
                            loading={loading}
                            reload={onRefresh}
                        />
                    </View>
                )}

                <View className='px-4 mb-4'>
                    <Text className='text-light text-xl font-montserrat-bold'>
                        Corredores
                    </Text>
                </View>
                
                {webs && webs.map((w) => {
                    return (
                        <View key={w.id} className='px-4 mb-8'>
                            <WebCard
                                id={w.id} 
                                name={w.name}
                                hot={w.hot}
                                online={w.online}
                                total={w.total}
                                sounding={w.sounding}
                                reload={onRefresh}
                            />
                        </View>
                    )
                })}
                <View className='mb-24'></View>

            </View>
        </ScrollView>

    );

};

export default home;