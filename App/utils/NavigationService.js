import { NavigationActions, StackActions } from 'react-navigation';


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

function popToTop(){
  _navigator.dispatch(
    StackActions.popToTop()
  );
}

function getParam(key) {
  return _navigator.getParam(key);
}

export default {
  navigate,
  setTopLevelNavigator,
  getParam,
  popToTop,
};