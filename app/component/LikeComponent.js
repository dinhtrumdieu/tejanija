import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import SplashScreen from 'react-native-splash-screen';
import {ShadowStyle} from '../utils/CommonStyles';
import {scale} from '../libs/reactSizeMatter/scalingUtils';

const colors = {
    transparent: 'transparent',
    white: '#fff',
    heartColor: '#e92f3c',
    textPrimary: '#515151',
    black: '#000',
};

const card = {
    photographer: 'Paweł Karniej',
    photo: {uri: 'https://instagram.fqyy1-1.fna.fbcdn.net/vp/3c9a078e2ca06b6f23495a58f4d5790e/5D38A6B6/t51.2885-15/e35/56706298_321117518554648_5665440507722377382_n.jpg?_nc_ht=instagram.fqyy1-1.fna.fbcdn.net'},
    key: 'pkarniej',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        width: scale(48),
        height: scale(48),
        borderRadius: scale(24),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        ...ShadowStyle,
        position: 'absolute',
        bottom: -scale(22),
        right: scale(16),
    },
    image: {
        marginTop: 10,
        height: 280,
        width: '92%',
    },
    photoDescriptionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 10,
    },
    icon: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animatedIcon: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        borderRadius: 160,
        opacity: 0,
    },
    text: {
        textAlign: 'center',
        fontSize: 13,
        backgroundColor: colors.transparent,
        color: colors.textPrimary,
    },
    textPhotographer: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        textAlign: 'left',
        paddingTop: 0,
    },
});

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

class Like extends React.Component {
    constructor(props) {
        SplashScreen.hide();
        super(props);

        this.state = {
            liked: false,
        };

        this.lastPress = 0;
    }

    handleLargeAnimatedIconRef = (ref) => {
        this.largeAnimatedIcon = ref;
    };

    handleSmallAnimatedIconRef = (ref) => {
        this.smallAnimatedIcon = ref;
    };

    animateIcon = () => {
        const {liked} = this.state;
        this.largeAnimatedIcon.stopAnimation();

        if (liked) {
            this.largeAnimatedIcon.bounceIn()
                .then(() => this.largeAnimatedIcon.bounceOut());
            this.smallAnimatedIcon.pulse(200);
        } else {
            this.largeAnimatedIcon.bounceIn()
                .then(() => {
                    this.largeAnimatedIcon.bounceOut();
                    this.smallAnimatedIcon.bounceIn();
                })
                .then(() => {
                    if (!liked) {
                        this.setState(prevState => ({liked: !prevState.liked}));
                    }
                });
        }
    };

    handleOnPress = () => {
        const time = new Date().getTime();
        const delta = time - this.lastPress;
        const doublePressDelay = 400;

        if (delta < doublePressDelay) {
            this.animateIcon();
        }
        this.lastPress = time;
    };

    handleOnPressLike = () => {
        this.smallAnimatedIcon.bounceIn();
        this.setState(prevState => ({liked: !prevState.liked}));
    };

    render() {
        const {liked} = this.state;
        return (
            <TouchableOpacity
                activeOpacity={0.4}
                style={styles.container}
                onPress={this.handleOnPressLike}
            >
                <AnimatedIcon
                    ref={this.handleSmallAnimatedIconRef}
                    name={liked ? 'heart' : 'hearto'}
                    color={liked ? colors.heartColor : colors.textPrimary}
                    size={22}
                    style={styles.icon}
                />
            </TouchableOpacity>

        );
    }
}

export default Like;
