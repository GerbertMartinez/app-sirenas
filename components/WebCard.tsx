import PulseView from "@/animations/PulseView";
import SirenPulse from "@/animations/SirenPulse";
import useActions from "@/hooks/useActions";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";
import { colors } from '../tailwind.config';

interface Props {
    id: number;
    name: string;
    hot: number;
    online: number;
    total: number;
    sounding: number;
    reload: () => void;
};

const WebCard = ({
    id,
    name,
    hot,
    online,
    total,
    sounding,
    reload
}: Props) => {

    const {loading, onWeb, offWeb, testWeb} = useActions();

    const [Qvisible, setQVisible] = useState(false);
    const [Rvisible, setRVisible] = useState(false);
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('');

    const onQCancel = () => {
        setQVisible(false);
    };

    const onRCancel = () => {
        setRVisible(false);
    };

    const onTest = () => {
        setQVisible(true);
        setType('T');
        setTitle('Atención');
        setMessage(`¿Estás seguro de realizar el test en el corredor ${name}?`);
        setColor(colors.acmuni[100]);
    };

    const onOff = async (id: string) => {
        await offWeb(id);
        setRVisible(true);
        reload();
    };

    const onOn = () => {
        setQVisible(true);
        setType('O');
        setTitle('Atención');
        setMessage(`¿Estás seguro de encender las sirenas del corredor ${name}?`);
        setColor(colors.rmuni[100]);
    };

    const onConfirm = async (id:string) => {
        setQVisible(false);
        if(type == 'O') {
            await onWeb(id);
            setRVisible(true);
            reload();
        }
        if(type == 'T') {
            await testWeb(id);
            setRVisible(true);
            reload();
        }
    };

    return (
        <PulseView 
            trigger={sounding} 
            primary={colors.rmuni[100]} 
            secondary={colors.charcoal}
        >
            <Pressable 
                className="bg-charcoal p-6 rounded-3xl" 
                onPress={() => router.push({pathname: '/detail/[id]', params: {id}})}
            >

                <View className="flex-row items-center mb-3">

                    <Text className="text-2xl text-light font-montserrat-bold flex-1 text-center">
                        {name}
                    </Text>

                    {sounding > 0 && (
                        <View>
                            <SirenPulse color={colors.rmuni[100]} sounding={sounding} />
                            <Text className="font-montserrat-bold text-xl text-rmuni-100">
                                {sounding}
                            </Text>
                        </View>
                    )}

                </View>
      
                <Text className="text-light font-montserrat-regular text-lg mb-5 text-center">
                    Sirenas: {total}
                </Text>

                <View className="flex-row justify-between mb-5">
                    {online === total && (
                        <View className="flex-row items-center bg-vomuni-100/20 border border-vomuni-100/40 px-3 py-2 rounded-xl">
                            <Ionicons name="checkmark-circle-outline" size={24} color={colors.vomuni[100]} />
                            <Text className="text-vomuni-100 font-montserrat-semi-bold ml-2">
                                {online} En Linea
                            </Text>
                        </View>
                    )}
                    {online < total && online > 0 && (
                        <View className="flex-row items-center bg-amuni-100/20 border border-amuni-100/40 px-3 py-2 rounded-xl">
                            <Ionicons name="warning-outline" size={24} color={colors.amuni[100]} />
                            <Text className="text-amuni-100 font-montserrat-semi-bold ml-2">
                                {online} En Linea
                            </Text>
                        </View>
                    )}
                    {online === 0 && (
                        <View className="flex-row items-center bg-rmuni-100/20 border border-rmuni-100/40 px-3 py-2 rounded-xl">
                            <Ionicons name="warning-outline" size={24} color={colors.rmuni[100]} />
                            <Text className="text-rmuni-100 font-montserrat-semi-bold ml-2">
                                {online} En Linea
                            </Text>
                        </View>
                    )}
                    {hot > 0 && (                    
                        <View className="flex-row items-center bg-amuni-100/20 border border-amuni-100/40 px-3 py-2 rounded-xl">
                            <Ionicons name="thermometer-outline" size={18} color={colors.amuni[100]} />
                            <Text className="text-amuni-100 font-montserrat-semi-bold ml-2">
                                {hot} Temp
                            </Text>
                        </View>
                    )}
                </View>

                <View className="flex-row justify-between gap-3">

                    <Pressable
                        onPress={onTest}
                        className="flex-1 py-3 rounded-2xl flex-row justify-center items-center border border-acmuni-100 bg-acmuni-100/20 active:opacity-60"
                    >
                        <Ionicons name="megaphone-outline" size={20} color={colors.acmuni[100]} />
                        {loading ? (
                            <ActivityIndicator color={colors.light} />
                        ) : (
                            <Text className="ml-2 font-montserrat-bold text-acmuni-100">
                                TEST
                            </Text>
                        )}
                    </Pressable>

                    <Pressable
                        onPress={() => onOff(id.toString())}
                        className="flex-1 py-3 rounded-2xl flex-row justify-center items-center border border-silver bg-silver/20 active:opacity-60"
                    >
                        <Ionicons name="power-outline" size={20} color={colors.silver} />
                        {loading ? (
                            <ActivityIndicator color={colors.light} />
                        ) : (
                            <Text className="ml-2 font-montserrat-bold text-silver">
                                OFF
                            </Text>
                        )}
                    </Pressable>

                    <Pressable
                        onPress={onOn}
                        className="flex-1 py-3 rounded-2xl flex-row justify-center items-center border border-rmuni-100 bg-rmuni-100/20 active:opacity-60"
                    >
                        <Ionicons name="radio-outline" size={20} color={colors.rmuni[100]} />
                        {loading ? (
                            <ActivityIndicator color={colors.light} />
                        ) : (
                            <Text className="ml-2 font-montserrat-bold text-rmuni-100">
                                ON
                            </Text>
                        )}
                    </Pressable>

                </View>

            </Pressable>

            <Modal
                isVisible={Qvisible}
                backdropOpacity={0.6}
                animationIn="zoomIn"
                animationOut="zoomOut"
                useNativeDriver
                onBackdropPress={onQCancel}
            >
                <View className="bg-charcoal rounded-3xl p-6 border border-steel">
                    
                    <View className="items-center mb-4">
                        <Ionicons name="help-circle-outline" size={80} color={color} />
                    </View>

                    <Text className="text-light text-4xl font-montserrat-bold text-center mb-2">
                        {title}
                    </Text>

                    <Text className="text-silver text-xl font-montserrat-semi-bold text-center mb-6">
                        {message}
                    </Text>

                    <View className="flex-row gap-3">

                        <Pressable
                            onPress={onQCancel}
                            className="flex-1 py-3 rounded-2xl border border-steel items-center"
                        >
                            <Text className="text-silver font-montserrat-bold">
                                CANCELAR
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => onConfirm(id.toString())}
                            className="flex-1 py-3 rounded-2xl border border-nmuni-100 items-center"
                        >
                            <Text className='text-nmuni-100 font-montserrat-bold'>
                                ACTIVAR
                            </Text>
                        </Pressable>

                    </View>

                </View>
            </Modal>

            <Modal
                isVisible={Rvisible}
                backdropOpacity={0.6}
                animationIn="zoomIn"
                animationOut="zoomOut"
                useNativeDriver
                onBackdropPress={onRCancel}
            >
                <View className="bg-charcoal rounded-3xl p-6 border border-steel">
                    
                    <View className="items-center mb-4">
                        <Ionicons name="checkmark-circle-outline" size={80} color={colors.vomuni[100]} />
                    </View>

                    <Text className="text-light text-4xl font-montserrat-bold text-center mb-6">
                        Listo
                    </Text>

                    <View className="flex-row gap-3">

                        <Pressable
                            onPress={onRCancel}
                            className="flex-1 py-3 rounded-2xl border border-vcmuni-100 items-center"
                        >
                            <Text className="text-vcmuni-100 font-montserrat-bold">
                                OK
                            </Text>
                        </Pressable>

                    </View>

                </View>
            </Modal>
            
        </PulseView>
    );

};

export default WebCard;