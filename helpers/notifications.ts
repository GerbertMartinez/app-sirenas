import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function registerForPushNotifications() {

    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {

        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;

    }

    if (finalStatus !== 'granted') return null;

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);
    await AsyncStorage.setItem('push_token', token);

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('sirena_alert', {
            name: 'Sirena Sísmica',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 500, 500, 500],
            sound: 'alerta',
            lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
            bypassDnd: true
        });
    }

    return token;
    
}