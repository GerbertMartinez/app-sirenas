import useAuth from '@/hooks/useAuth';
import { colors } from '@/tailwind.config';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

const RightHeader = () => {

    const {logout, level} = useAuth();

    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    return (
        <View>
            <TouchableOpacity onPress={openMenu}>
                <Ionicons 
                    name="ellipsis-vertical-outline"
                    size={22} 
                    color={colors.light}
                    style={{ marginRight: 18 }}
                />
                <View className="absolute right-4 bg-primary rounded-[6px] w-[12px] h-[12px] flex items-center justify-center" />
            </TouchableOpacity>
        
            <Modal transparent visible={visible} animationType="fade">
                <Pressable className="flex-1 bg-black/50" onPress={() => setVisible(false)}>
                    <View className="absolute right-4 top-14 bg-charcoal rounded-2xl p-3 w-[60%]">

                        {level === '1' && (
                            <MenuItem
                                icon="cog-outline"
                                label="Administrar"
                                onPress={() => {
                                    setVisible(false);
                                    router.push('/admin')
                                }}
                            />
                        )}

                        <MenuItem
                            icon="bar-chart-outline"
                            label="Reportes"
                            onPress={() => {
                                setVisible(false);
                                router.push('/reports')
                            }}
                        />

                        <MenuItem
                            icon="key-outline"
                            label="Cambiar Contraseña"
                            onPress={() => {
                                setVisible(false);
                                router.push('/changePass')
                            }}
                        />

                        <View className="h-px bg-steel my-2" />

                        <MenuItem
                            icon="log-out-outline"
                            label="Cerrar sesión"
                            danger
                            onPress={() => {
                                setVisible(false);
                                logout();
                            }}
                        />

                    </View>
                </Pressable>
            </Modal>
        </View>
    );

};

const MenuItem = ({ icon, label, onPress, danger = false }: any) => (

    <Pressable
      onPress={onPress}
      className="flex-row items-center py-3 px-2 rounded-xl active:bg-slate-700"
    >
        <Ionicons
            name={icon}
            size={25}
            color={danger ? colors.rmuni[100] : colors.light}
        />
        <Text
            className={`ml-3 font-montserrat-semi-bold text-lg ${
                danger ? 'text-rmuni-100' : 'text-light'
            }`}
        >
            {label}
        </Text>
    </Pressable>

);

export default RightHeader;