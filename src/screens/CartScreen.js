import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useMyContext } from "../context/MyContext"; // Certifique-se de substituir 'seuArquivo' pelo caminho correto

const CartScreen = ({ route, navigation }) => {
  const { addToCart, delToCart, cart, removeFromCart } = useMyContext();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const getProductQuantity = (productId) => {
    const cartItem = cart.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const getTotal = (cart) => {
    let total = 0;
    cart.map(item => total += item.price * item.quantity);
    return total
  }

  const renderCartItem = ({ item }) => (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: '80%',
          marginVertical: 5,
          flexDirection: "row",
          columnGap: 8,
          borderRadius: 16,
          // backgroundColor: 'white',
        }}
      >
        <Image
          source={{
            uri: item.uri,
          }}
          style={{
            width: 100, height: 100,
            objectFit: 'fill',
            borderRadius: 16,
          }}
        />
        <View style={{ width: '63%' }}>
          <Text style={{ fontSize: 18, fontWeight: 500, paddingTop: 5, }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 500, textAlign: 'right' }}>
            $ {item.price * item.quantity}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: "center", columnGap: 8 }}>
            <TouchableOpacity
              onPress={() => {
                addToCart({ ...item, quantity: selectedQuantity });
              }}
            >
              <Image
                source={{
                  uri: "https://www.clker.com/cliparts/s/7/R/k/j/Z/icon-add.svg.hi.png",
                }}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>

            <Text style={{ fontSize: 18, fontWeight: 500, }}>
              {item.quantity}
            </Text>

            <TouchableOpacity
              onPress={() => {
                delToCart({ ...item, quantity: selectedQuantity });
              }}
            >
              <Image
                source={{
                  uri: "https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/subtract-circle-red-512.png",
                }}
                style={{ width: 20, height: 20, }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                removeFromCart(item.id);
              }}
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
                }}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#a97ec5" }}>
      <Text style={{
        width: '80%',
        paddingBottom: 20,
        fontSize: 24,
        fontWeight: 500,
        color: 'white',
      }}>My Order</Text>

      <View style={{
        width: '80%',
        marginBottom: 20,
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
          <Text style={{ color: 'white', fontWeight: 500 }}>Pizza</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ padding: 10 }}
          onPress={() => { }}
        >
          <Text style={{ color: 'white', fontWeight: 500 }}>Pasta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ padding: 10 }}
          onPress={() => { }}
        >
          <Text style={{ color: 'white', fontWeight: 500 }}>Popular</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cart}
        style={{
          width: '100%',
          backgroundColor: 'white',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
        contentContainerStyle={{
          rowGap: 10,
          paddingVertical: 45,
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
      />

      <View style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderTopWidth: 3,
        borderColor: '#d0d0d0',
        paddingTop: 15,
        paddingHorizontal: '12%'
      }}>
        <Text style={{
          fontSize: 18,
          fontWeight: 500,
        }}>Total: $ {getTotal(cart)}</Text>
        <TouchableOpacity style={{
          backgroundColor: '#7f89c7',
          padding: 10,
          paddingHorizontal: 20,
          borderRadius: 16
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 500,
            color: 'white',
          }}>Card</Text>
        </TouchableOpacity>
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
export default CartScreen;
