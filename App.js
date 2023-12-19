import React, { useState } from "react";
import {
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MyProvider } from "./src/context/MyContext";
import HomeScreen from "./src/screens/HomeScreen";
import CartScreen from "./src/screens/CartScreen";
import ProductScreen from "./src/screens/ProductScreen";

const Stack = createStackNavigator();

const App = () => {
  const [cartLen, setCartLen] = useState(0);

  return (
    <MyProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation, route }) => ({
              title: '',
              headerStyle: {
                backgroundColor: '#7f89c6',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => { }}
                >
                  <Image
                    source={{
                      uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png",
                    }}
                    style={{
                      width: 25, height: 25,
                      marginLeft: '25%',
                      marginTop: '25%',
                      objectFit: 'fill'
                    }}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => { }}
                >
                  <Image
                    source={{
                      uri: "https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png",
                    }}
                    style={{
                      width: 25, height: 25,
                      marginRight: '15%',
                      marginTop: '15%',
                      objectFit: 'fill'
                    }}
                  />
                </TouchableOpacity>
              )
            })}
          />
          < Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#a97ec5',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          < Stack.Screen
            name="Product"
            component={ProductScreen}
            options={({ navigation, route }) => ({
              title: '',
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Cart");
                  }}
                >
                  <Image
                    source={{
                      uri: "https://cdn.icon-icons.com/icons2/1369/PNG/512/-shopping-cart_90604.png",
                    }}
                    style={{
                      width: 35, height: 35,
                      marginRight: '15%',
                      marginTop: '15%',
                      objectFit: 'fill'
                    }}
                  />
                </TouchableOpacity>
              )
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MyProvider>
  );
};
export default App;
