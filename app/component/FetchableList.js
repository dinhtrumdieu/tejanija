import React, { Component } from 'react';
import {
  FlatList, View, StyleSheet, ActivityIndicator, Platform, ScrollView, RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CommonColors } from '../utils/CommonStyles';
import BaseRequest from '../libs/BaseRequest';
import { scale } from '../libs/reactSizeMatter/scalingUtils';
import EmptyView from './EmptyView';

const INITIAL_PAGE = 0;

export default class FetchableList extends Component {
  constructor(props) {
    super(props);
    const { params, endpoint } = props;
    this.state = {
      loading: false,
      firstLoad: true,
      reachedEnd: false,
      refreshing: false,
      page: INITIAL_PAGE,
      items: [],
      params,
      endpoint,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.endpoint !== state.endpoint || !_.isEqual(nextProps.params, state.params)) {
      return {
        loading: false,
        reachedEnd: false,
        refreshing: false,
        page: INITIAL_PAGE,
        endpoint: nextProps.endpoint,
        params: nextProps.params,
      };
    }
    return null;
  }

    componentDidUpdate = (prevProps, prevState) => {
      const { endpoint, params } = prevProps;
      if (endpoint !== this.state.endpoint || !_.isEqual(params, this.state.params)) {
        this.reload();
      }
    };

    getData() {
      const { items } = this.state;
      return items;
    }

    updateItem(keyName, keyValue, newItem) {
      const { items } = this.state;
      this.setState({
        items: items.map((item) => {
          if (item[keyName] === keyValue) {
            return { ...item, ...newItem };
          }
          return item;
        }),
      });
    }

    addItemToFirst(item) {
      if (this.state.items.length <= 0) {
        this.setState({ items: [item] });
      } else if (item.id && this.state.items[0].id && item.id !== this.state.items[0].id) {
        this.setState(prev => ({
          items: [item, ...prev.items],
        }));
      }
    }

    removeItem(item) {
      const { items } = this.state;
      const index = items.indexOf(item);
      if (index !== -1) items.splice(index, 1);
      this.setState({ items });
    }

    removeAll() {
      this.setState({ items: [] });
    }

    componentDidMount() {
      this.fetchFirstTime();
    }

    getItems = (data, page) => {
      const { exceptPage } = this.props;
      if (exceptPage && exceptPage[page]) {
        const { dataPath } = exceptPage[page];
        if (!dataPath) return data;
        const paths = dataPath.split('.');
        paths.forEach((path) => {
          data = data[path];
        });
        return data;
      }

      const { dataPath } = this.props;
      if (!dataPath) return data;
      const paths = dataPath.split('.');

      paths.forEach((path) => {
        data = data[path];
      });
      return data;
    };

    getEndpoint = () => this.state.endpoint;

    fetchFirstTime = async () => {
      this.setState({
        loading: true,
      });
      const { params } = this.state;
      const page = INITIAL_PAGE;
      const endpoint = this.getEndpoint(page);
      try {
        const data = await new BaseRequest().get(endpoint, { ...params, page });
        const items = this.getItems(data, page);
        if (items.length !== 0) {
          this.setState({
            items: [...this.state.items, ...items],
            loading: false,
            firstLoad: false,
            page,
          });
        } else {
          this.setState({
            loading: false,
            reachedEnd: true,
            firstLoad: false,
            page,
          });
        }

        const { onLoad } = this.props;
        if (onLoad) {
          onLoad(data, page);
        }
      } catch (error) {
        const { onError } = this.props;
        if (onError) {
          onError(error);
        }
        this.setState({
          loading: false,
          firstLoad: false,
          reachedEnd: true,
        });
      }
    };

    fetchPage = async (page) => {
      this.setState({
        loading: true,
      });
      const { params } = this.state;
      const endpoint = this.getEndpoint(page);
      try {
        const data = await new BaseRequest().get(endpoint, { ...params, page });
        const items = this.getItems(data, page);
        if (items.length !== 0) {
          this.setState({
            items: [...this.state.items, ...items],
            loading: false,
            page,
          });
        } else {
          this.setState({
            loading: false,
            reachedEnd: true,
            page,
          });
        }

        const { onLoad } = this.props;
        if (onLoad) {
          onLoad(data, page);
        }
      } catch (error) {
        const { onError } = this.props;
        if (onError) {
          onError(error);
        }
        this.setState({
          loading: false,
          reachedEnd: true,
        });
      }
    };


    refresh = async () => {
      this.setState({
        refreshing: true,
        loading: true,
        reachedEnd: false,
      });
      const { params } = this.state;
      const page = INITIAL_PAGE;
      const endpoint = this.getEndpoint(page);
      try {
        const data = await new BaseRequest().get(endpoint, { ...params, page });
        const items = this.getItems(data, page);
        if (items.length !== 0) {
          this.setState({
            items,
            loading: false,
            page,
            refreshing: false,
          });
        } else {
          this.setState({
            items: [],
            loading: false,
            reachedEnd: true,
            page,
            refreshing: false,
          });
        }

        const { onLoad } = this.props;
        if (onLoad) {
          onLoad(data, page);
        }
      } catch (error) {
        const { onError } = this.props;
        if (onError) {
          onError(error);
        }
        this.setState({
          loading: false,
          refreshing: false,
          reachedEnd: true,
        });
      }

      const { onRefresh } = this.props;
      if (onRefresh) {
        onRefresh();
      }
    };

    reload = async () => {
      this.setState({
        loading: true,
        reachedEnd: false,
      });
      const { params } = this.state;
      const page = INITIAL_PAGE ;
      const endpoint = this.getEndpoint(page);
      try {
        const data = await new BaseRequest().get(endpoint, { ...params, page });
        const items = this.getItems(data, page);
        if (items.length !== 0) {
          this.setState({
            items,
            loading: false,
            page,
          });
        } else {
          this.setState({
            loading: false,
            reachedEnd: true,
            page,
            items: [],
          });
        }

        const { onLoad } = this.props;
        if (onLoad) {
          onLoad(data, page);
        }
      } catch (error) {
        const { onError } = this.props;
        if (onError) {
          onError(error);
        }
        this.setState({
          loading: false,
          reachedEnd: true,
        });
      }
    };

    onRefresh = () => {
      const { refreshEnable } = this.props;
      if (!refreshEnable) return;

      const { refreshing } = this.state;
      if (!refreshing) {
        this.refresh();
      }
    };

    onEndReached = () => {
      const { loadMoreEnable } = this.props;
      if (!loadMoreEnable) return;

      const { loading, reachedEnd } = this.state;
      if (!reachedEnd && !loading) {
        this.fetchPage(this.state.page + 1);
      }
    };

    renderFooterComponent = () => {
      const { loading, firstLoad, refreshing } = this.state;
      const { showLoadMoreIndicator } = this.props;
      if (loading && !firstLoad && !refreshing && showLoadMoreIndicator) {
        const size = Platform.OS === 'ios' ? 'large' : scale(40);
        return <ActivityIndicator style={{ marginVertical: 4 }} animating size={size} color={CommonColors.mainColor} />;
      }
    };

    render() {
      const { items } = this.state;
      const {
        onScroll,
        style, numColumns, getItemLayout, initialNumToRender, contentContainerStyle, stickyHeaderIndices,
        EmptyComponent, HeaderComponent, keyExtractor, renderItem, renderSeparator, scrollEnabled,
        refreshEnable, loadMoreEnable, extraData, message,
      } = this.props;

      const refreshing = refreshEnable ? this.state.refreshing : false;
      const onRefresh = refreshEnable ? this.onRefresh : null;
      const onEndReached = loadMoreEnable ? this.onEndReached : null;
      const onEndReachedThreshold = loadMoreEnable ? this.props.onEndReachedThreshold || 0.2 : null;
      if ((this.state.firstLoad && this.props.showFirstLoadIndicator)) {
        const size = Platform.OS === 'ios' ? 'large' : scale(40);
        return (
          <View style={styles.FirstLoadWrapper}>
            <ActivityIndicator animating size={size} color={CommonColors.mainColor} />
          </View>
        );
      }

      if (this.state.items.length === 0) {
        return (
          <ScrollView
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            )}
            // contentContainerStyle={styles.Container}
          >
            {HeaderComponent}
            {EmptyComponent || <EmptyView message={message} />}
          </ScrollView>
        );
      }

      return (
        <FlatList
          style={style}
          stickyHeaderIndices={stickyHeaderIndices}
          numColumns={numColumns}
          ListHeaderComponent={HeaderComponent}
          data={items}
          showsVerticalScrollIndicator={false}
          getItemLayout={getItemLayout}
          initialNumToRender={initialNumToRender}
          refreshing={refreshing}
          scrollEnabled={scrollEnabled}
          ItemSeparatorComponent={renderSeparator}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          onEndReachedThreshold={onEndReachedThreshold || 0}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          extraData={extraData || this.state}
          contentContainerStyle={contentContainerStyle}
          onScroll={onScroll}
          ListFooterComponent={this.renderFooterComponent()}
        />
      );
    }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  FirstLoadWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

FetchableList.defaultProps = {
  refreshEnable: true,
  loadMoreEnable: true,
  showFirstLoadIndicator: true,
  showLoadMoreIndicator: true,
  scrollEnabled: true,
  dataPath: '',
};

FetchableList.propTypes = {
  numColumns: PropTypes.number,
  endpoint: PropTypes.string.isRequired,
  renderSeparator: PropTypes.func,
  showFirstLoadIndicator: PropTypes.bool,
  showLoadMoreIndicator: PropTypes.bool,
  refreshEnable: PropTypes.bool,
  keyExtractor: PropTypes.func,
  renderItem: PropTypes.func,
  onEndReachedThreshold: PropTypes.number,
  loadMoreEnable: PropTypes.bool,
  EmptyComponent: PropTypes.element,
  HeaderComponent: PropTypes.element,
  dataPath: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  onRefresh: PropTypes.func,
  exceptPage: PropTypes.object,
};
