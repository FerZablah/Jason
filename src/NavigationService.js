import { NavigationActions } from 'react-navigation';

let _navigator;
const parameters = {
  refresh: '',
  comp: '',
  device: ''
};
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  parameters.refresh = params.refresh;
  parameters.comp = params.comp;
  parameters.device = params.deviceToModify;
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function goBack() {
  _navigator.dispatch(
    NavigationActions.back()
  );
}

function refresh() {
  this.parameters.refresh(this.parameters.comp);
}

// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
  refresh,
  parameters
};
