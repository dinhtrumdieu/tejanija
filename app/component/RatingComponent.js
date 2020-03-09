import React, {Component} from 'react';
import {View, Text} from 'react-native';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
import StarIcon from '../../assets/svg/app/rate.svg';
import StarActiveIcon from '../../assets/svg/app/rate_active.svg';
import {SvgXml} from 'react-native-svg';

export default class RatingComponent extends Component {

    renderNumberRating = (rate = 5) => {
        let view = [];
        for (let i = 0; i < rate; i++) {
            view.push(<SvgXml width={10} height={10} key={i} xml={StarActiveIcon}/>);
        }

        for (let i = 5; i > rate; i--) {
            view.push(<SvgXml width={10} height={10} key={i} xml={StarIcon}/>);
        }
        return view;
    };

    render() {
        const {rate} = this.props;
        return (
            <View style={styles.container}>
                {this.renderNumberRating(rate)}
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        width: '80@s',
        justifyContent: 'space-between',
        marginHorizontal: '10@s',
    },
});
