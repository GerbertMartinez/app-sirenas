import ShakeView from '@/animations/ShakeView';
import Logo from '@/components/Logo';
import useAuth from '@/hooks/useAuth';
import { Login } from '@/types/login';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../tailwind.config';

const App = () => {

    const {login, error, id_user} = useAuth();

    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<Login>({
        reValidateMode: 'onChange'
    });

    const onSubmit = async (data: Login) => {
        
        setLoading(true);

        try {
            await login(data);
        } catch (err) {
            console.log('err',err);
        } finally {
            setLoading(false);
        }
        
    };

    useEffect(() => {
        if (id_user) {
            router.replace('/home');
        }
    },[id_user])

    return (

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
            <SafeAreaView className="flex-1 justify-center bg-obsidian px-6">
                <View className="bg-charcoal w-full rounded-3xl p-8 items-center">

                    <Logo className="h-40 mb-4" />

                    <Text className="text-2xl mb-8 text-light font-montserrat-bold">
                        Accede a tu cuenta
                    </Text>

                    <Controller
                        control={control}
                        name="user"
                        rules={{ required: 'Escribe tu usuario' }}
                        render={({ field: { onChange, onBlur, value } }) => (

                            <View
                                className={`w-full rounded-2xl px-4 py-3 border bg-obsidian flex-row items-center
                                    ${errors.user ? 'border-rmuni-100' : 'border-borgray'}
                                `}
                            >
                                <Ionicons
                                    name="person-outline"
                                    size={24}
                                    color={errors.user ? colors.rmuni[100] : colors.borgray}
                                    style={{ marginRight: 10 }}
                                />

                                <TextInput
                                    className="flex-1 text-light font-montserrat-regular text-lg"
                                    placeholder="Usuario"
                                    placeholderTextColor={colors.borgray}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    autoCapitalize="none"
                                />
                            </View>

                        )}
                    />

                    {errors.user && (
                        <Text className="text-rmuni-100 font-montserrat-bold mt-2 self-start">
                            {errors.user.message as string}
                        </Text>
                    )}
                    
                    <Controller
                        control={control}
                        name="pass"
                        rules={{ required: 'Escribe tu contraseña' }}
                        render={({ field: { onChange, onBlur, value } }) => (

                            <View
                                className={`flex-row items-center w-full rounded-2xl px-4 py-3 mt-6 border bg-obsidian
                                    ${errors.pass ? 'border-rmuni-100' : 'border-borgray'}
                                `}
                            >
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={24}
                                    color={errors.pass ? colors.rmuni[100] : colors.borgray}
                                    style={{ marginRight: 10 }}
                                />
                                <TextInput
                                    className="flex-1 text-light font-montserrat-regular text-lg"
                                    placeholder="Contraseña"
                                    placeholderTextColor={colors.borgray}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    secureTextEntry={!showPass}
                                    autoCapitalize="none"
                                />
                                <Pressable onPress={() => setShowPass(!showPass)}>
                                    {showPass ? (
                                        <Ionicons name="eye-outline" size={24} color={colors.light} />
                                    ) : (
                                        <Ionicons name="eye-off-outline" size={24} color={colors.borgray} />
                                    )}
                                </Pressable>
                            </View>

                        )}
                    />
            
                    {errors.pass && (
                        <Text className="text-rmuni-100 font-montserrat-bold mt-2 self-start">
                            {errors.pass.message as string}
                        </Text>
                    )}

                    {error && (
                        <ShakeView trigger={error}>
                            <View className="mt-5 flex-row items-center bg-rmuni-100/20 border border-rmuni-100/40 px-3 py-2 rounded-xl">
                                <Text className="text-rmuni-100 font-montserrat-semi-bold">
                                    Credenciales inválidas
                                </Text>
                            </View>
                        </ShakeView>
                    )}

                    <Pressable
                        onPress={handleSubmit(onSubmit)}
                        className="mt-10 py-4 w-full rounded-2xl bg-vomuni-100 active:opacity-80"
                    >
                        {loading ? (
                            <ActivityIndicator color={colors.light} />
                        ) : (
                            <Text className="text-center text-light font-montserrat-bold text-xl">
                                ACCEDER
                            </Text>
                        )}
                    </Pressable>

                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>

    );

};

export default App;