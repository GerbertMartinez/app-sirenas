import SirenCard from '@/components/SirenCard';
import useData from '@/hooks/useData';
import { useEffect } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';

const mainDetail = () => {

    const {loading, getSirens, sirens} = useData();
    
    const onRefresh = () => {
        getSirens();
    };

    useEffect(() => {
        getSirens();
    },[])

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
        >
            <View className='px-4'>
                <View className='flex-1 rounded-3xl bg-steel py-5 mt-5 mb-8'>
                    <Text className='text-center font-montserrat-bold text-3xl text-light'>
                        Todas las sirenas
                    </Text>
                </View>
                {sirens && sirens.map((siren) => {
                    return (
                        <View className='mb-8' key={siren.id_siren}>
                            <SirenCard
                                id={siren.id_siren} 
                                name={siren.name}
                                temperature={siren.temp}
                                online={siren.signal}
                                sounding={siren.relay}
                                reload={onRefresh}
                            />
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    );

};

export default mainDetail