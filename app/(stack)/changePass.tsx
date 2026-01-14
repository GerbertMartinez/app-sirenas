import Logo from '@/components/Logo';
import useAuth from '@/hooks/useAuth';
import { colors } from '@/tailwind.config';
import { Change } from '@/types/login';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

const changePass = () => {

    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showCPass, setShowCPass] = useState(false);
    const [Rvisible, setRVisible] = useState(false);

    const {changePass} = useAuth();

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<Change>();

    const onSubmit = async (data: Change) => {

        try {
            await changePass(data);
            setRVisible(true);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    };

    const newPass = watch('newpass');

    const onRCancel = () => {
        setRVisible(false);
    };

    const onRConfirm = () => {
        setRVisible(false);
        router.back();
    };

    return (

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
            <SafeAreaView className='flex-1 justify-center px-6'>
                <View className='bg-charcoal w-full rounded-3xl p-8 items-center'>

                    <Logo className="h-40 mb-4" />

                    <Text className='text-2xl mb-8 text-light font-montserrat-bold'>
                        Cambia tu contraseña
                    </Text>

                    <Controller 
                        control={control}
                        name='newpass'
                        rules={{ required: 'Ingresa una nueva contraseña' }}
                        render={({ field: { onChange, onBlur, value } }) => (

                            <View className={`w-full rounded-2xl px-4 py-3 border bg-obsidian flex-row items-center
                                    ${errors.newpass ? 'border-rmuni-100' : 'border-borgray'}
                                `}
                            >
                                <TextInput 
                                    className='flex-1 text-light font-montserrat-regular text-lg'
                                    placeholder='Nueva contraseña'
                                    placeholderTextColor={colors.borgray}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    secureTextEntry={!showPass}
                                    autoCapitalize='none'
                                />
                                <Pressable onPress={() => setShowPass(!showPass)}>
                                    {showPass ? (
                                        <Ionicons name='eye-outline' size={24} color={colors.light} />
                                    ) : (
                                        <Ionicons name='eye-off-outline' size={24} color={colors.light} />
                                    )}
                                </Pressable>
                            </View>

                        )}
                    />

                    {errors.newpass && (
                        <Text className='text-rmuni-100 font-montserrat-bold mt-2 self-start'>
                            {errors.newpass.message as string}
                        </Text>
                    )}

                    <Controller 
                        control={control}
                        name='confpass'
                        rules={{ 
                            required: 'Ingresa la confirmación de la contraseña',
                            validate: value => 
                                value === newPass || 'Las contraseñas no coinciden'
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View className={`w-full rounded-2xl px-4 py-3 border bg-obsidian mt-6 flex-row items-center
                                    ${errors.confpass ? 'border-rmuni-100' : 'border-borgray'}
                                `}
                            >
                                <TextInput 
                                    className='flex-1 text-light font-montserrat-regular text-lg'
                                    placeholder='Confirma contraseña'
                                    placeholderTextColor={colors.borgray}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    secureTextEntry={!showCPass}
                                    autoCapitalize='none'
                                />
                                <Pressable onPress={() => setShowCPass(!showCPass)}>
                                    {showCPass ? (
                                        <Ionicons name='eye-outline' size={24} color={colors.light} />
                                    ) : (
                                        <Ionicons name='eye-off-outline' size={24} color={colors.light} />
                                    )}
                                </Pressable>
                            </View>
                        )}
                    />

                    {errors.confpass && (
                        <Text className='text-rmuni-100 font-montserrat-bold mt-2 self-start'>
                            {errors.confpass.message as string}
                        </Text>
                    )}

                    <Pressable
                        onPress={handleSubmit(onSubmit)}
                        className='mt-10 py-4 w-full rounded-2xl bg-vomuni-100 active:opacity-80'
                    >
                        {loading ? (
                            <ActivityIndicator color={colors.light} />
                        ) : (
                            <Text className='text-center text-light font-montserrat-bold text-lg'>
                                ACTUALIZAR
                            </Text>
                        )}
                        
                    </Pressable>

                </View>

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
                                onPress={onRConfirm}
                                className="flex-1 py-3 rounded-2xl border border-vcmuni-100 items-center"
                            >
                                <Text className="text-vcmuni-100 font-montserrat-bold">
                                    OK
                                </Text>
                            </Pressable>

                        </View>

                    </View>
                </Modal>
            </SafeAreaView>
        </KeyboardAvoidingView>

    );

};

export default changePass;