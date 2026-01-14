import { colors } from '@/tailwind.config';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const admin = () => {

    return (
        <View className='flex-1 flex-row justify-between items-center px-6 gap-5'>
            <Pressable 
                className='flex-1 bg-charcoal rounded-3xl p-6 items-center'
                onPress={() => router.push('/webs')}
            >
                <Ionicons name="link-outline" size={48} color={colors.light} />
                <Text className='text-light text-xl font-montserrat-bold'>
                    Corredores
                </Text>
            </Pressable>
            <Pressable 
                className='flex-1 bg-charcoal rounded-3xl p-6 items-center'
                onPress={() => router.push('/users')}
            >
                <Ionicons name="person-outline" size={48} color={colors.light} />
                <Text className='text-light text-xl font-montserrat-bold'>
                    Usuarios
                </Text>
            </Pressable>
        </View>
    );

};

export default admin;