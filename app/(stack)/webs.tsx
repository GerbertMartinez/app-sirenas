import useAdmin from '@/hooks/useAdmin';
import useData from '@/hooks/useData';
import { colors } from '@/tailwind.config';
import { AllWeb, createWeb } from '@/types/data';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, RefreshControl, Modal as RNModal, ScrollView, Text, TextInput, View } from 'react-native';
import Modal from "react-native-modal";

const webs = () => {

    const { loading, getAllWebs, allWebs, getSirens, sirens } = useData();
    const { editWebSirens, createWeb, deleteWeb } = useAdmin();

    const [visible, setVisible] = useState(false);
    const [selectedWeb, setSelectedWeb] = useState<AllWeb | null>(null);
    const [selectedSirens, setSelectedSirens] = useState<number[]>([]);
    const [Qvisible, setQVisible] = useState(false);
    const [Rvisible, setRVisible] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        trigger
    } = useForm<createWeb>({
        reValidateMode: 'onChange',
        defaultValues: {
            name: ''
        }
    });

    useEffect(() => {
        getAllWebs();
        getSirens();
    },[]);

    const isNameTaken = (name: string, webs: AllWeb[]) => {
        return webs.some(
            w => w.name.toLowerCase() === name.toLowerCase()
        );
    };

    const onRefresh = () => {
        getAllWebs();
    };

    const openModal = async (web: AllWeb) => {
        setSelectedWeb(web);
        setSelectedSirens(web.sirens.map(s => s.id_siren));
        const r = await getSirens();
        setVisible(true);
    };

    const openCreateModal = async () => {
        setSelectedWeb(null);
        reset();
        setSelectedSirens([]);
        await getSirens();
        setVisible(true);
    };

    const onCancel = () => {
        setSelectedWeb(null);
        setVisible(false);
    };

    const save = async () => {
        const r = await editWebSirens(selectedWeb?.id_web, selectedSirens);
        setSelectedWeb(null);
        setVisible(false);
        setRVisible(true);
        getAllWebs();
    };

    const onSubmit = async (data: createWeb) => {
        const r2 = await createWeb(data, selectedSirens);
        setSelectedWeb(null);
        setVisible(false);
        setRVisible(true);
        getAllWebs();
    };

    const delWeb = () => {
        setQVisible(true);
    };

    const toggleSiren = (id: number) => {
        setSelectedSirens(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const onConfirm = async (id: number | undefined) => {
        setQVisible(false);
        setVisible(false);
        const r = await deleteWeb(id);
        setRVisible(true);
        getAllWebs();
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
                        <Ionicons name='add-circle-outline' size={22} color={colors.light} />
                        <Text className='text-light font-montserrat-bold text-lg ml-2'>
                            Nuevo Corredor
                        </Text>
                    </Pressable>
                </View>
                {allWebs.map(web => (
                    <Pressable
                        key={web.id_web}
                        className='bg-charcoal p-5 rounded-2xl mb-4'
                        onPress={() => openModal(web)}
                    >
                        <Text className='text-light font-montserrat-bold text-xl'>
                            {web.name}
                        </Text>
                        <Text className='text-silver font-montserrat-regular text-lg mt-1'>
                            {web.sirens.length} sirenas
                        </Text>
                    </Pressable>
                ))}

                <RNModal 
                    visible={visible}
                    transparent 
                    animationType='fade'
                >
                    <View className="flex-1 bg-black/70 justify-center px-6">

                        <View className='bg-steel rounded-3xl p-6 max-h-[80%]'>

                            {selectedWeb ? (
                                <View>
                                    <View className='flex-row justify-between'>
                                        <Text className='text-light text-xl font-montserrat-bold mb-4'>
                                            Administrar sirenas
                                        </Text>
                                        <Pressable
                                            onPress={() => delWeb()}
                                        >
                                            <Ionicons name='trash' color={colors.rmuni[100]} size={30} />
                                        </Pressable>
                                    </View>
                                    <Text className='text-silver font-montserrat-regular text-lg mb-4'>
                                        {selectedWeb?.name}
                                    </Text>        
                                </View>
                            ) : (
                                <View className='mb-4'>

                                    <Text className='text-light text-xl font-montserrat-bold mb-4'>
                                        Crear corredor
                                    </Text>

                                    <Controller 
                                        control={control}
                                        name='name'
                                        rules={{
                                            required: 'Escribe un nombre para el corredor',
                                            validate: (value) => {
                                                if (isNameTaken(value, allWebs)) {
                                                    return 'El corredor ya existe';
                                                }
                                                return true;
                                            }
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <View
                                                className={`w-full rounded-2xl px-4 py-1 border bg-charcoal flex-row items-center mt-2
                                                    ${errors.name ? 'border-rmuni-100' : 'border-borgray'}
                                                `}
                                            >
                                                <TextInput 
                                                    className='flex-1 text-light font-montserrat-regular text-lg'
                                                    placeholder='Nombre'
                                                    placeholderTextColor={colors.borgray}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => {
                                                        onChange(text);
                                                        trigger('name');
                                                    }}
                                                    value={value}
                                                />
                                            </View>
                                        )}
                                    />

                                    {errors.name && (
                                        <Text className='text-rmuni-100 font-montserrat-bold mt-2 self-start'>
                                            {errors.name.message as string}
                                        </Text>
                                    )}

                                </View>
                            )}                            

                            <ScrollView>
                                {sirens.map(siren => {
                                    const checked = selectedSirens.includes(siren.id_siren);
                                    return (
                                        <Pressable 
                                            key={siren.id_siren}
                                            className='flex-row items-center py-4 border-b border-charcoal'
                                            onPress={() => toggleSiren(siren.id_siren)}
                                        >
                                            <Ionicons 
                                                name={checked ? 'checkbox' : 'square-outline'}
                                                size={22}
                                                color={checked ? colors.vomuni[100] : colors.silver }
                                            />
                                            <Text className='text-light text-lg font-montserrat-medium ml-3 flex-1'>
                                                {siren.name}
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
                                {selectedWeb ? (
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
                            ¿Seguro desea eliminar este corredor?
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
                                onPress={() => onConfirm(selectedWeb?.id_web)}
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

export default webs;