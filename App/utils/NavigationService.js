import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function getParam(key) {
  return _navigator.getParam(key,'default value');
}

export default {
  navigate,
  setTopLevelNavigator,
  getParam,
};