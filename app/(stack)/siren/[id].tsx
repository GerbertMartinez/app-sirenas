import useActions from '@/hooks/useActions';
import useData from '@/hooks/useData';
import { colors } from '@/tailwind.config';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const sirenDetail = () => {

    const {loading, getSiren, siren} = useData();
    const {loading: pingLoading, pingSiren} = useActions();
    const {id} = useLocalSearchParams();

    const [tooltip, setTooltip] = useState<{
        x: number;
        y: number;
        value: number;
        label: string;
    } | null>(null);

    const onRefresh = () => {
        getSiren(id.toString());
    };

    useEffect(() => {
        getSiren(id.toString());
    },[id]);

    const onPing = async () => {
        const result = await pingSiren(id.toString());
        onRefresh();
    };

    const isOnline = siren?.signal === 1;

    const activityColors: Record<string, string> = {
        ONLINE: 'border-vomuni-100 text-vomuni-100',
        OFFLINE: 'border-silver text-silver',
        ON: 'border-rmuni-100 text-rmuni-100',
        OFF: 'border-acmuni-100 text-acmuni-100',
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

    const formatDateTimeL = (dateTime?: string) => {

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

            return `${day}/${month}`;

        }

        if (!dateTime.includes(' ')) return '--';

        const [date, time] = dateTime.split(' ');
        const [year, month, day] = date.split('-');

        return `${day}/${month}`;

    };

    const records = [...(siren?.records ?? [])].reverse();
    const step = Math.max(1, Math.ceil(records.length / 4));

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={loading || pingLoading} onRefresh={onRefresh} />}
        >
            <View className='flex-1 px-4'>

                <View className='rounded-3xl bg-steel p-6 mt-5'>
                    <View className='flex-row justify-between items-center'>
                        <Text className='font-montserrat-bold text-3xl text-light'>
                            {siren?.name}
                        </Text>
                        <View>
                            {isOnline && (
                                <TouchableOpacity className='bg-vomuni-100 px-2 py-2 rounded-full' onPress={onPing}>
                                    {pingLoading ? (
                                        <ActivityIndicator color={colors.light} />
                                    ):(
                                        <Ionicons name='cloud-download-outline' color={colors.light} size={24}/>
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    <Text className='text-silver mt-2 font-montserrat-regular'>
                        Última actualización: {formatDateTime(siren?.updated_at)}
                    </Text>

                    <View className='flex-row justify-between mt-6'>

                        <View>
                            <Text className='text-silver font-montserrat-regular'>Estado</Text>
                            <Text className={`text-2xl font-montserrat-bold ${isOnline ? 'text-vomuni-100' : 'text-rmuni-100'}`}>
                                {isOnline ? 'EN LINEA' : 'SIN CONEXIÓN'}
                            </Text>
                        </View>

                        <View>
                            <Text className='text-silver font-montserrat-regular'>Temperatura</Text>
                            <Text className='text-2xl font-montserrat-bold text-light'>
                                {isOnline ? siren?.temp : '--'}°C
                            </Text>
                        </View>

                    </View>

                    <View className='flex-row justify-between mt-4'>

                        <View>
                            <Text className='text-silver font-montserrat-regular'>En linea desde</Text>
                            <Text className={'text-lg font-montserrat-bold text-vomuni-100'}>
                                {isOnline ? formatDateTime(siren?.last_online.created_at) : '--'}
                            </Text>
                        </View>

                        <View>
                            <Text className='text-silver font-montserrat-regular'>Última vez activada</Text>
                            <Text className='text-lg font-montserrat-bold text-rmuni-100'>
                                {formatDateTime(siren?.last_on.created_at)}
                            </Text>
                        </View>

                    </View>
                </View>

                {/* <View className='mt-8 bg-steel rounded-3xl p-4'>
                    <MapView
                        style={{ height: 200, width: '100%' }}
                        initialRegion={{
                            latitude: 14.6349,
                            longitude: -90.5069,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        }}
                        mapType='standard'
                    >
                        <Marker 
                            coordinate={{
                                latitude: 14.6349,
                                longitude: -90.5069
                            }}
                        >

                        </Marker>
                    </MapView>
                </View> */}


                {siren?.records && siren.records.length > 0 && (
                    <View className='mt-8 bg-steel rounded-3xl p-4'>
                        <Text className='text-light text-xl font-montserrat-bold mb-4'>
                            Historial temperatura (4 días)
                        </Text>

                        <LineChart
                            data={{
                                labels: records.map((r, i) =>
                                        i % step === 0
                                        ? formatDateTimeL(r.created_at)
                                        : ''
                                    ),
                                datasets: [
                                    {
                                        data: records.map(r => r.cputemp),
                                        strokeWidth: 2,
                                        color: () => colors.rmuni[100],
                                    },
                                ],
                            }}
                            width={screenWidth - 60}
                            height={240}
                            yAxisSuffix="°C"
                            yAxisInterval={1}
                            withDots={false}
                            withInnerLines
                            withOuterLines={false}
                            withShadow={false}
                            fromZero={false}
                            chartConfig={{
                                backgroundGradientFrom: colors.charcoal,
                                backgroundGradientTo: colors.charcoal,
                                decimalPlaces: 1,
                                color: () => colors.charcoal,
                                labelColor: () => colors.silver,
                                propsForBackgroundLines: {
                                    stroke: colors.steel,
                                    strokeDasharray: '4',
                                },
                            }}
                            bezier
                            style={{
                                borderRadius: 16,
                            }}
                            onDataPointClick={({ x, y, value, index }) => {
                                const record = records[index];
                                if (!record) return;
                                setTooltip({
                                    x,
                                    y,
                                    value,
                                    label: formatDateTime(record.created_at),
                                });
                            }}
                        />

                    </View>
                )}

                <View className='mt-8 bg-steel rounded-3xl p-4 mb-3'>
                    <Text className='text-light text-xl font-montserrat-bold mb-4'>
                        Historial de actividad
                    </Text>
                </View>

                <View className='px-6 mb-28'>
                {siren?.activities?.map(a => (
                    <View 
                        key={a.id_activity} 
                        className={`border-l-4 pl-4 py-3 mb-3 rounded-xl bg-charcoal ${activityColors[a.action] || 'border-silver text-silver'}`}
                    >
                        <Text className={`font-montserrat-bold ${activityColors[a.action]}`}>
                            {a.action}
                        </Text>
                        <Text className='text-silver font-montserrat-regular'>
                            { formatDateTime(a.created_at) }
                        </Text>
                    </View>
                ))}
                </View>

            </View>

        </ScrollView>
    );

};

export default sirenDetail;