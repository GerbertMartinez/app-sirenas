import useAdmin from '@/hooks/useAdmin';
import useData from '@/hooks/useData';
import { colors } from '@/tailwind.config';
import { AllUsers, createUser } from '@/types/data';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, RefreshControl, Modal as RNModal, ScrollView, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';

const users = () => {

    const {loading, getUsers, allUsers, editUserWebs, createUser, deleteUser} = useAdmin();
    const {getAllWebs, allWebs} = useData();

    const [visible, setVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<AllUsers | null>(null);
    const [selectedWebs, setSelectedWebs] = useState<number[]>([]);
    const [Qvisible, setQVisible] = useState(false);
    const [Rvisible, setRVisible] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        trigger
    } = useForm<createUser>({
        reValidateMode: 'onChange',
        defaultValues: {
            name: '',
            lastname: '',
            user: ''
        }
    });

    useEffect(() => {
        getUsers();
    },[]);

    const isUsernameTaken = (username: string, users: AllUsers[]) => {
        return users.some(
            u => u.user.toLowerCase() === username.toLocaleLowerCase()
        );
    };

    const onRefresh = () => {
        getUsers();
    };

    const openModal = async (user: AllUsers) => {
        setSelectedUser(user);
        setSelectedWebs(user.webs.map(w => w.id_web));
        const r = await getAllWebs();
        setVisible(true);
    };

    const openCreateModal = async () => {
        setSelectedUser(null);
        reset();
        setSelectedWebs([]);
        await getAllWebs();
        setVisible(true);
    };

    const onCancel = () => {
        setSelectedUser(null);
        setVisible(false);
    };

    const save = async () => {
        const r = await editUserWebs(selectedUser?.id_user, selectedWebs);
        setSelectedUser(null);
        setVisible(false);
        setRVisible(true);
        getUsers();
    };

    const onSubmit = async (data: createUser) => {
        const r2 = await createUser(data, selectedWebs);
        setSelectedUser(null);
        setVisible(false);
        setRVisible(true);
        getUsers();
    };

    const delUser = () => {
        setQVisible(true);
    };

    const toggleWeb = (id:number) => {
        setSelectedWebs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const onConfirm = async (id:number | undefined) => {
        setQVisible(false);
        setVisible(false);
        const r = await deleteUser(id);
        setRVisible(true);
        getUsers();
    };

    const onQCancel = () => {
        setQVisible(false);
    };

    const onRCancel = () => {
        setRVisible(false);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
            <ScrollView
                refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
                className='px-4 py-6'
            >
                <View>
                    <Pressable 
                        onPress={() => openCreateModal()}
                        className='bg-vomuni-100 p-4 rounded-2xl mb-6 flex-row items-center justify-center'
                    >
                        <Ionicons name='person-add-outline' size={22} color={colors.light} />
                        <Text className='text-light font-montserrat-bold text-lg ml-2'>
                            Nuevo Usuario
                        </Text>
                    </Pressable>
                </View>
                {allUsers.map(user => (
                    <Pressable
                        key={user.id_user}
                        className='bg-charcoal p-5 rounded-2xl mb-4'
                        onPress={() => openModal(user)}
                    >
                        <View>
                            <Text className='text-light font-montserrat-regular text-lg'>
                                {user.name} {user.lastname}
                            </Text>
                            <Text className='text-light font-montserrat-bold text-xl mt-1'>
                                {user.user}
                            </Text>
                            <Text className='text-silver font-montserrat-regular text-lg mt-1'>
                                {user.webs.length} corredores
                            </Text>
                        </View>
                    </Pressable>
                ))}

                <RNModal
                    visible={visible}
                    transparent
                    animationType='fade'
                >
                    <View className='flex-1 bg-black/70 justify-center px-6'>
                        
                        <View className='bg-steel rounded-3xl p-6 max-h-[80%]'>

                            {selectedUser ? (
                                <View>
                                    <View className='flex-row justify-between'>
                                        <Text className='text-light text-xl font-montserrat-bold mb-4'>
                                            Administrar corredores
                                        </Text>
                                        <Pressable
                                            onPress={() => delUser()}
                                        >
                                            <Ionicons name='trash' color={colors.rmuni[100]} size={30} />
                                        </Pressable>
                                    </View>
                                    <Text className='text-silver font-montserrat-regular text-lg mb-4'>
                                        {selectedUser?.user} - {selectedUser?.name} {selectedUser?.lastname}
                                    </Text>
                                </View>
                            ) : (

                                <View className='mb-4'>

                                    <Text className='text-light text-xl font-montserrat-bold mb-4'>
                                        Crear usuario
                                    </Text>

                                    <Controller 
                                        control={control}
                                        name='name'
                                        rules={{required: 'Escribe un nombre para el usuario'}}
                                        render={({ field: { onChange, onBlur, value } }) => (

                                            <View 
                                                className={`w-full rounded-2xl px-4 py-1 border bg-charcoal flex-row items-center 
                                                        ${errors.name ? 'border-rmuni-100' : 'border-borgray'}
                                                `}
                                            >
                                                <TextInput 
                                                    className='flex-1 text-light font-montserrat-regular text-lg'
                                                    placeholder='Nombre'
                                                    placeholderTextColor={colors.borgray}
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                    value={value}
                                                />
                                            </View>

                                        )}
                                    />

                                    {errors.name && (
                                        <Text className="text-rmuni-100 font-montserrat-bold mt-2 self-start">
                                            {errors.name.message as string}
                                        </Text>
                                    )}

                                    <Controller 
                                        control={control}
                                        name='lastname'
                                        rules={{required: 'Escribe un apellido para el usuario'}}
                                        render={({ field: { onChange, onBlur, value } }) => (

                                            <View 
                                                className={`w-full rounded-2xl px-4 py-1 border bg-charcoal flex-row items-center mt-2
                                                    ${errors.lastname ? 'border-rmuni-100' : 'border-borgray'}
                                                `}
                                            >
                                                <TextInput 
                                                    className='flex-1 text-light font-montserrat-regular text-lg'
                                                    placeholder='Apellido'
                                                    placeholderTextColor={colors.borgray}
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                    value={value}
                                                />
                                            </View>

                                        )}
                                    />

                                    {errors.lastname && (
                                        <Text className="text-rmuni-100 font-montserrat-bold mt-2 self-start">
                                            {errors.lastname.message as string}
                                        </Text>
                                    )}

                                    <Controller 
                                        control={control}
                                        name='user'
                                        rules={{
                                            required: 'Escribe un usuario',
                                            validate: (value) => {
                                                if (isUsernameTaken(value, allUsers)) {
                                                    return 'Este usuario ya existe';
                                                }
                                                return true;
                                            }
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (

                                            <View 
                                                className={`w-full rounded-2xl px-4 py-1 border bg-charcoal flex-row items-center mt-2
                                                    ${errors.user ? 'border-rmuni-100' : 'border-borgray'}
                                                `}
                                            >
                                                <TextInput 
                                                    className='flex-1 text-light font-montserrat-regular text-lg'
                                                    placeholder='Usuario'
                                                    placeholderTextColor={colors.borgray}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => {
                                                        onChange(text);
                                                        trigger('user');
                                                    }}
                                                    value={value}
                                                    autoCapitalize='none'
                                                />
                                            </View>

                                        )}
                                    />

                                    {errors.user && (
                                        <Text className="text-rmuni-100 font-montserrat-bold mt-2 self-start">
                                            {errors.user.message as string}
                                        </Text>
                                    )}

                                </View>
                            )}

                            <ScrollView>
                                {allWebs.map(web => {
                                    const checked = selectedWebs.includes(web.id_web);
                                    return (
                                        <Pressable
                                            key={web.id_web}
                                            className='flex-row items-center py-4 border-b border-charcoal'
                                            onPress={() => toggleWeb(web.id_web)}
                                        >
                                            <Ionicons 
                                                name={checked ? 'checkbox' : 'square-outline'}
                                                size={22}
                                                color={checked ? colors.vomuni[100] : colors.silver}
                                            />
                                            <Text className='text-light text-lg font-montserrat-medium ml-3 flex-1'>
                                                {web.name}
                                            </Text>
                                        </Pressable>
                                    )
                                })}
                            </ScrollView>

                            <View className='flex-row mt-6'>
                                <Pressable
                                    onPress={() => onCancel()}
                                    className='flex-1 py-3 rounded-xl border border-silver mr-2'
                                >
                                    <Text className='text-silver text-center font-montserrat-bold'>
                                        Cancelar
                                    </Text>
                                </Pressable>
                                {selectedUser ? (
                                    <Pressable
                                        onPress={() => save()}
                                        className='flex-1 py-3 rounded-xl bg-vomuni-100 ml-2'
                                    >
                                        <Text className='text-light text-center font-montserrat-bold'>
                                            Guardar
                                        </Text>
                                    </Pressable>
                                ):(
                                    <Pressable
                                        onPress={handleSubmit(onSubmit)}
                                        className='flex-1 py-3 rounded-xl bg-vomuni-100 ml-2'
                                    >
                                        <Text className='text-light text-center font-montserrat-bold'>
                                            Crear
                                        </Text>
                                    </Pressable>
                                )}
                            </View>

                        </View>

                    </View>
                </RNModal>

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
                            <Ionicons name="help-circle-outline" size={80} color={colors.acmuni[100]} />
                        </View>

                        <Text className="text-light text-4xl font-montserrat-bold text-center mb-2">
                            AVISO
                        </Text>

                        <Text className="text-silver text-xl font-montserrat-semi-bold text-center mb-6">
                            ¿Seguro desea eliminar este usuario?
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
                                onPress={() => onConfirm(selectedUser?.id_user)}
                                className="flex-1 py-3 rounded-2xl border border-rmuni-100 items-center"
                            >
                                <Text className='text-rmuni-100 font-montserrat-bold'>
                                    ELIMINAR
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

            </ScrollView>
        </KeyboardAvoidingView>
    );

};

export default users;