import RightHeader from '@/components/RightHeader';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, Stack } from 'expo-router';
import { colors } from '../../tailwind.config';

const StackLayout = () => {

    const onBackClick = (canGoBack: boolean | undefined) => {
        if (canGoBack) {
            router.back();
        }
    };

    return (
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: colors.dark,
                    },
                    headerTintColor: colors.dark,
                    contentStyle: {
                        backgroundColor: colors.obsidian
                    },
                    headerRight: ({ canGoBack }) => {
                        if (canGoBack) return null;
                        return (
                            <RightHeader />
                        )
                    },
                    headerLeft: ({ canGoBack }) => {

                        if (!canGoBack) return null;

                        return (
                            <Ionicons 
                                name={canGoBack ? 'arrow-back-outline' : 'hand-left-outline'}
                                size={20}
                                color={colors.light}
                                onPress={() => onBackClick(canGoBack)}
                            />
                        )
                        
                    }
                }}
            >
                <Stack.Screen 
                    name='home'
                    options={{}}
                />
                <Stack.Screen 
                    name='detail/[id]'
                />
                <Stack.Screen
                    name='mainDetail'
                />
                <Stack.Screen 
                    name='siren/[id]'
                />
                <Stack.Screen 
                    name='admin'
                />
                <Stack.Screen 
                    name='webs'
                />
                <Stack.Screen 
                    name='users'
                />
                <Stack.Screen 
                    name='reports'
                />
            </Stack>

    );

};

export default StackLayout;