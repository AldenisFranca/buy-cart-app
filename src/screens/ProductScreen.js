import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { useMyContext } from "../context/MyContext";

const ProductScreen = ({ route, navigation }) => {
  const { item } = route.params;

  const { addToCart, delToCart, cart } = useMyContext();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const [quantity, setQuantity] = useState(1);

  const getProductQuantity = (productId) => {
    const cartItem = cart.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const getLenCart = (cart) => {
    let total = 0;
    cart.map(item => total += item.quantity);
    return total
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white',
    }}>
      {getLenCart(cart) > 0 && <View style={{
        position: 'absolute', zIndex: 1,
        top: 1, right: getLenCart(cart) > 9 ? 24 : 32,
        backgroundColor: '#a97ec5',
        padding: 2, paddingHorizontal: 8,
        borderRadius: 16
      }}>
        <Text style={{
          color: 'white',
          fontWeight: 500,
        }}>{getLenCart(cart) < 100 ? getLenCart(cart) : 99}</Text>
      </View>}

      <View style={{
        width: '80%',
        marginHorizontal: '10%',
        marginVertical: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
      }}>
        <TouchableOpacity style={{
          backgroundColor: '#7f89c6',
          padding: 10,
          borderRadius: 12
        }}
          disabled
          onPress={() => {
            addToCart({ ...item, quantity: selectedQuantity });
          }}
        >
          <Text style={{ color: 'white', fontWeight: 500 }}>Burguer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ padding: 10 }}
          onPress={() => { }}
        >
          <Text style={{ color: 'black', fontWeight: 500 }}>Pizza</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ padding: 10 }}
          onPress={() => { }}
        >
          <Text style={{ color: 'black', fontWeight: 500 }}>Pasta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ padding: 10 }}
          onPress={() => { }}
        >
          <Text style={{ color: 'black', fontWeight: 500 }}>Popular</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        flex: 1,
        width: '100%',
        marginTop: 20,
        paddingBottom: 20,
        backgroundColor: '#a97ec5',
        alignItems: 'center',
      }}>
        <View style={{
          width: 100, height: 100,
          position: 'absolute',
          left: 0, top: '4.4%',
          zIndex: 2,
          borderRadius: 50,
          backgroundColor: '#a97ec5',
        }}></View>
        <View style={{
          width: 70, height: 60,
          position: 'absolute',
          left: 0, top: 'auto',
          zIndex: 1,
          backgroundColor: 'white',
        }}></View>
        <View style={{
          width: '100%',
          marginLeft: '0%',
          alignItems: 'center',
          borderLeftWidth: Dimensions.get('window').width,
          borderTopWidth: 150,
          borderLeftColor: '#a97ec5',
          borderTopColor: 'white',
          justifyContent: 'center'
        }}>
        </View>
        <Image
          source={{
            uri: item.uri,
          }}
          style={{
            width: 280, height: 280,
            position: 'absolute',
            zIndex: 3,
            top: -45,
            objectFit: 'fill',
            borderRadius: 16,
          }}
        />
        <View style={{
          maxWidth: 280,
          paddingHorizontal: 30,
          paddingVertical: 30,
          marginTop: 100,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          rowGap: 20,
          borderRadius: 24, borderTopEndRadius: 0,
          backgroundColor: 'white'
        }}>
          <Text style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 800
          }}>$ {item.price}</Text>
          <Text style={{
            textAlign: 'center',
            color: '#a97ec5',
            fontSize: 18,
            fontWeight: 800
          }}>{item.name}</Text>

          <View style={{ flexDirection: 'row', alignItems: "center", columnGap: 14 }}>
            <TouchableOpacity
              onPress={() => {
                setQuantity(quantity + 1)
              }}
            >
              <Image
                source={{
                  uri: "https://www.clker.com/cliparts/s/7/R/k/j/Z/icon-add.svg.hi.png",
                }}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>

            <Text style={{ fontSize: 18, fontWeight: 500 }}>{quantity}</Text>

            <TouchableOpacity
              disabled={quantity <= 1}
              onPress={() => {
                setQuantity(quantity - 1)
              }}
            >
              <Image
                source={{
                  uri: "https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/subtract-circle-red-512.png",
                }}
                style={{ width: 20, height: 20, }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              for (let i = 0; i < quantity; i++) {
                addToCart({ ...item, quantity: quantity });
              }
            }}
          >
            <View style={{
              backgroundColor: '#7f89c6',
              paddingHorizontal: 48,
              paddingVertical: 20,
              borderRadius: 16
            }}>
              <Text style={{
                color: 'white',
                fontWeight: 600,
                fontSize: 20
              }}>Add to Bag</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{
        width: '100%',
        backgroundColor: 'white',
        paddingVertical: 30,
      }}>
        <View style={{
          width: '80%',
          marginHorizontal: '10%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: "center",
        }}>
          <TouchableOpacity style={{ padding: 10 }}
            onPress={() => {
              navigation.navigate('Home')
            }}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
              }}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{ padding: 10 }}
            onPress={() => { }}
          >
            <Image
              source={{
                uri: "https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png",
              }}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{ padding: 10 }}
            onPress={() => { }}
          >
            <Image
              source={{
                uri: "https://icons.veryicon.com/png/o/object/material-design-icons/notifications-1.png",
              }}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: '#E9E1EB',
            padding: 10,
            borderRadius: 12
          }}
            onPress={() => {
              navigation.navigate('Cart')
            }}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/7605/7605078.png",
              }}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default ProductScreen;
