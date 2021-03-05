import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./screens/home";
import LoginScreen from "./screens/login";

const AppNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
  },
  HomeScreen: {
    screen: HomeScreen,
  },
});

export default createAppContainer(AppNavigator);
