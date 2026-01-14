import { Image } from 'react-native';

const Logo = ({ className = '' }) => {

    return (
        <Image
            source={require('@/assets/images/ave.png')}
            className={className}
            resizeMode="contain"
        />
    );

};

export default Logo;