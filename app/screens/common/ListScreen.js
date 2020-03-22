import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../../component/Text';
import Header from '../../component/Header';
import BackButton from '../../component/BackButton';
import {CommonStyles} from '../../utils/CommonStyles';
import GridViewList from '../home/GridViewList';
import ListViewList from '../home/ListViewList';

export default function ListScreen(props) {
  const {title, type = 0} = props.route.params;
  return (
    <View style={{flex: 1}}>
      <Header
        left={<BackButton />}
        center={
          <Text style={[CommonStyles.headerTitle, {color: '#1A1A1A'}]}>
            {title}
          </Text>
        }
      />
      {type === 1 && <GridViewList />}
      {type === 2 && <ListViewList />}
    </View>
  );
}

const styles = StyleSheet.create({});
