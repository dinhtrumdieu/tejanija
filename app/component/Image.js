import React, {Component} from 'react';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

const AVATAR_DEFAULT = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7w5CAI9hfYGs7FTYVEw3xsLtkLfVgGas7e3qMLvPgPkKm5xI1&s';
export default class ImageCommon extends Component {

    static propTypes = {
        uri: PropTypes.string,
        style: PropTypes.object,
        resizeMode: PropTypes.string,
    };

    render() {
        const {uri, resizeMode, style} = this.props;
        return (
            <FastImage
                style={style}
                source={{
                    uri: uri || AVATAR_DEFAULT,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={resizeMode || FastImage.resizeMode.contain}
            />
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
});
