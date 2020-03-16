import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Text from '../../component/Text';
import Header from '../../component/Header';
import BackButton from '../../component/BackButton';
import {moderateScale, scale} from '../../libs/reactSizeMatter/scalingUtils';
import SearchIcon from '../../../assets/svg/search_icon.svg';
import ClearTextIcon from '../../../assets/svg/clear_text.svg';
import {SvgXml} from 'react-native-svg';
import {CommonColors, CommonSize, CommonStyles} from '../../utils/CommonStyles';
import _ from 'lodash';

const RECENT = [
  {value: 'When the practice is correct, faith increases'},
  {value: 'Is there interest?'},
  {value: 'Nothing personal, only dhamma at work'},
  {value: 'The investigation is not through thinking'},
];

const RECOMMEND = [
  {value: 'Aging brings wisdom for the wise'},
  {value: 'We can’t let go; we can only be honest about the experience'},
  {value: 'The right attitude towards decay and death'},
  {value: 'Never stop learning'},
  {value: 'Reasonable thinking through awareness and wisdom'},
];

export default function SearchScreen() {
  const [textSearch, setTextSearch] = React.useState('');
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <Header
          left={<BackButton isShowBackLabel={false} />}
          center={
            <View style={styles.search}>
              <SvgXml style={{marginHorizontal: scale(5)}} xml={SearchIcon} />
              <TextInput
                style={styles.searchInput}
                value={textSearch}
                placeholder={'Search for stories, note, likes, and tags'}
                onChangeText={value => setTextSearch(value)}
              />
              {!_.isEmpty(textSearch) && (
                <TouchableOpacity onPress={() => setTextSearch('')}>
                  <SvgXml style={{marginRight: scale(5)}} xml={ClearTextIcon} />
                </TouchableOpacity>
              )}
            </View>
          }
          centerStyle={{
            alignItems: 'flex-start',
            left: scale(53),
          }}
          // right={
          //   !_.isEmpty(textSearch) && (
          //     <TouchableOpacity onPress={() => console.warn(textSearch)}>
          //       <Text style={styles.cancelButton}>Cancel</Text>
          //     </TouchableOpacity>
          //   )
          // }
        />
        <View style={styles.body}>
          <View style={styles.recentView}>
            <Text style={styles.recentLabel}>Recent</Text>
            <TouchableOpacity>
              <Text style={styles.clearLabel}>Clear</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            {RECENT.map((element, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setTextSearch(element.value)}
                  key={index}>
                  <Text style={styles.rowView}>{element.value}</Text>
                  {index !== RECENT.length - 1 && (
                    <View
                      style={[
                        CommonStyles.separatorStyle,
                        {marginLeft: scale(16)},
                      ]}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.recommend}>Recommended</Text>
          <View style={styles.content}>
            {RECOMMEND.map((element, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setTextSearch(element.value)}
                  key={index}>
                  <Text style={[styles.rowView, {color: '#309975'}]}>
                    {element.value}
                  </Text>
                  {index !== RECOMMEND.length - 1 && (
                    <View
                      style={[
                        CommonStyles.separatorStyle,
                        {marginLeft: scale(16)},
                      ]}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cancelButton: {
    fontSize: moderateScale(17),
  },
  searchInput: {
    flex: 1,
    paddingRight: scale(5),
  },
  search: {
    width: scale(306),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: 'rgba(196,196,196, 0.25)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  recentLabel: {
    fontSize: moderateScale(13),
    color: 'rgba(125,125,125, 0.5)',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  clearLabel: {
    fontSize: moderateScale(13),
    color: 'rgba(125,125,125, 0.5)',
  },
  rowView: {
    lineHeight: scale(24),
    paddingVertical: scale(9.5),
    paddingHorizontal: scale(16),
  },
  recentView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    marginTop: scale(10),
    marginBottom: scale(5),
  },
  content: {
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderColor: CommonColors.border,
    borderBottomWidth: 0.5,
  },
  recommend: {
    fontSize: moderateScale(13),
    color: 'rgba(125,125,125, 0.5)',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: scale(40),
    marginBottom: scale(5),
    paddingHorizontal: scale(16),
  },
});
