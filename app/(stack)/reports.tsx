import useData from '@/hooks/useData';
import { useEffect } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';

const reports = () => {

    const {loading, getHistory, history} = useData();

    useEffect(() => {
        getHistory();
    },[]);

    const onRefresh = () => {
        getHistory();
    };

    const LOCAL_OFFSET_HOURS = 6;

    const formatDateTime = (dateTime?: string) => {

        if (!dateTime) return '--';

        if (dateTime.includes('T')) {

            const clean = dateTime
            .replace('Z', '')
            .split('.')[0];

            const [date, time] = clean.split('T');
            const [year, month, day] = date.split('-');
            let [hour, minute, second] = time.split(':').map(Number);

            hour -= LOCAL_OFFSET_HOURS;

            if (hour < 0) {
                hour += 24;
            }

            const hh = hour.toString().padStart(2, '0');

            return `${day}/${month}/${year} ${hh}:${minute
            .toString()
            .padStart(2, '0')}:${second.toString().padStart(2, '0')}`;

        }

        if (!dateTime.includes(' ')) return '--';

        const [date, time] = dateTime.split(' ');
        const [year, month, day] = date.split('-');

        return `${day}/${month}/${year} ${time}`;

    };

    return (
        <ScrollView className='px-4 py-8'
            refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
        >
            <View className='bg-charcoal rounded-3xl divide-y divide-borgray'>

                {history.map(h => {

                    let targetLabel = 'TODAS LAS SIRENAS';
                    if (!h.siren && h.web) { targetLabel = `RED: ${h.web.name}` }
                    if (!h.web && h.siren) { targetLabel = `SIRENA: ${h.siren.name}` }

                    let color = 'text-light'
                    if (h.action === 'ON') { color = 'rmuni-100' }
                    if (h.action === 'OFF') { color = 'silver' }
                    if (h.action === 'TEST') { color = 'acmuni-100' }

                    return (
                        <View
                            key={h.id_history}
                            className='flex-row items-center py-4 px-4 border border-b-borgray'
                        >

                            <View className='w-15'>
                                <Text className={`text-2xl font-montserrat-bold text-${color}`}
                                >
                                    {h.action}
                                </Text>
                            </View>

                            <View className='flex-1 ml-4 items-center'>

                                <View className='mt-2 px-3 py-1 rounded-lg bg-steel'>
                                    <Text className='text-light font-montserrat-medium'>
                                        {targetLabel}
                                    </Text>
                                </View>

                                <Text className='text-silver font-montserrat-regular mt-1'>
                                    {formatDateTime(h.created_at)}
                                </Text>

                            </View>

                            <View className='w-20 ml-4'>
                                <Text className='text-light font-montserrat-semi-bold text-lg'>
                                    {h.user?.user}
                                </Text>
                            </View>

                        </View>
                    )
                })}

            </View>
            <View className='mb-28'></View>
        </ScrollView>
    );

};

export default reports;