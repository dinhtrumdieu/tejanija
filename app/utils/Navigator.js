import {NavigationActions, StackActions} from 'react-navigation';

let _navigator;

let isNavigateToMarketsScreen = false;
const specialMarketsScreenName = [];
const paramsForSpecialScreenInMarketsScreen = [];

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        }),
    );
}

function push(routeName, params) {
    _navigator.dispatch(
        StackActions.push({
            routeName,
            params,
        }),
    );
}

function goBack() {
    _navigator.dispatch(
        NavigationActions.back({}),
    );
}

function pop(number) {
    _navigator.dispatch(
        StackActions.pop({
            n: number,
        }),
    );
}

function replace(routeName, params) {
    _navigator.dispatch(
        StackActions.replace({
            routeName,
            params,
        }),
    );
}

function resetScreen(routeName, params) {
    _navigator.dispatch(
        StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName, params}),
            ],
        }),
    );
}

async function navigateToSpecialMarketsScreen(parent, routeNameInMarketsScreen, params) {
    isNavigateToMarketsScreen = true;
    paramsForSpecialScreenInMarketsScreen[0] = params;
    specialMarketsScreenName[0] = routeNameInMarketsScreen;
    parent.navigate('MarketsScreen');
}

function setIsNavigateToSpecialMarketsScreen(value) {
    isNavigateToMarketsScreen = false;
}

function getSpecialMarketsScreenName() {
    return specialMarketsScreenName[0];
}

function getSpecialMarketsScreenParams() {
    return paramsForSpecialScreenInMarketsScreen[0];
}

function isNavigateToSpecialMarketsScreen() {
    return isNavigateToMarketsScreen;
}

// add other navigation functions that you need and export them

export default {
    resetScreen,
    goBack,
    pop,
    navigate,
    setTopLevelNavigator,
    navigateToSpecialMarketsScreen,
    getSpecialMarketsScreenParams,
    isNavigateToSpecialMarketsScreen,
    getSpecialMarketsScreenName,
    setIsNavigateToSpecialMarketsScreen,
    replace,
    push,
};
