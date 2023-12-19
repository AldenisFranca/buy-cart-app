import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions
} from "react-native";
import { useMyContext } from "../context/MyContext";

const products = [
  { id: 1, category: 1, name: "Old But Gold", price: 10, uri: "https://scontent-for1-1.xx.fbcdn.net/v/t39.30808-6/344813871_223090183681783_519138428414569610_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=c83dfd&_nc_ohc=rE6L0pCiM70AX-OW1DK&_nc_ht=scontent-for1-1.xx&oh=00_AfDC3qXAl_6tMsekzM6ltIbBDf_4yDIxZb8l94Z0jk6UiQ&oe=6585D0FD" },
  { id: 2, category: 1, name: "K-Pop Burger", price: 15, uri: "https://i.pinimg.com/736x/d8/42/2e/d8422ea0ff820af4ce2df4bd24a91d58.jpg" },
  { id: 3, category: 1, name: "Old Man Burger", price: 20, uri: "https://scontent-for1-1.xx.fbcdn.net/v/t39.30808-6/406463028_18405552379030673_1997468362526500577_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=3635dc&_nc_ohc=shyGcYfB_8AAX_KNkbZ&_nc_ht=scontent-for1-1.xx&oh=00_AfC-ndQ3_IOLp-6jMkQpPWbdzt_oHIFD1TQES4uoCiAAIA&oe=65867CBC" },
  { id: 4, category: 2, name: "Double Burger", price: 25, uri: "https://scontent-for1-1.xx.fbcdn.net/v/t39.30808-6/399323202_18400319359030673_8211737531510815795_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=3635dc&_nc_ohc=Yb-qt1hqtEsAX8l8OXO&_nc_ht=scontent-for1-1.xx&oh=00_AfC1Jfh2RQ3w30Ihctl39yQDuSeCFWu27vgB_mBucPMmmw&oe=6585D286" },
  { id: 5, category: 2, name: "Rusty Burger", price: 30, uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7F5v9n_Aoe40COx-rDBkAUYka3LKK3etNfLfXktRNZ-o776wEzVh69xyVwVvYXGVEiUE&usqp=CAU" },
  { id: 6, category: 3, name: "El Chapo", price: 35, uri: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=40&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 7, category: 3, name: "1/2 Década", price: 40, uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUJGIf0lRGVKvLdaG6dkpcWgzbQS8qi7V-tB2BQ2m3qqhselcuNi8vkpUaDIo5-7zF500&usqp=CAU" },
  { id: 8, category: 4, name: "Pastrami Burger", price: 45, uri: "https://static.wixstatic.com/media/b2b717_4d684d0bd8b34ee18b5233cf1f308637~mv2.jpg/v1/crop/x_15,y_178,w_689,h_691/fill/w_640,h_602,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/IMG_4689.jpg" },
  { id: 9, category: 4, name: "Gorgon Bacon", price: 50, uri: "https://i0.wp.com/www.ohamburguerperfeito.com.br/wp-content/uploads/2017/05/raw.jpg" },
];

const HomeScreen = ({ navigation }) => {
  const { addToCart, delToCart, cart } = useMyContext();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [category, setCategory] = useState();

  const renderProductsItem = ({ item }) => (
    <View style={{
      width: Dimensions.get('window').width / 2.4,
    }}>
      <TouchableOpacity
        key={item.id}
        style={{
          backgroundColor: item.id % 2 == 0 ? '#7f89c6' : '#a97ec5',
          alignItems: 'center',
          marginRight: 10,
          borderRadius: 16,
          borderTopEndRadius: 0,
          paddingVertical: 10
        }}
        onPress={() => {
          navigation.navigate("Product", { item: item });
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
        <Text style={{
          paddingVertical: 5,
          fontSize: 18,
          color: 'white',
          fontWeight: 500
        }}>{item.name}</Text>
        <Text style={{
          fontSize: 18,
          fontWeight: 500,
          color: 'white'
        }}>$ {item.price}</Text>
      </TouchableOpacity>
    </View>
  );

  const getLenCart = (cart) => {
    let total = 0;
    cart.map(item => total += item.quantity);
    return total
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#7f89c6',
    }}>

      <View style={{ width: '100%', alignItems: 'center', paddingVertical: 10 }}>
        <Image
          source={{
            uri: 'https://pngfreepic.com/wp-content/uploads/2022/04/Delivery-courier-Motor-vehicle-Bike-Free-Vector-png.png',
          }}
          style={{
            width: '80%',
            aspectRatio: '1.3 / 1',
            objectFit: 'fill',
            borderRadius: 16,
            transform: [{ scaleX: -1 }]
          }}
        />
      </View>

      <View style={{
        width: '100%',
        backgroundColor: 'white',
        marginTop: 20,
        paddingVertical: 20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}>
        <View style={{
          width: '80%',
          marginHorizontal: '10%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: "center",
        }}>
          <TouchableOpacity style={{
            backgroundColor: category == 1 ? '#7f89c6' : 'transparent',
            padding: 10,
            borderRadius: 12
          }}
            onPress={() => { setCategory(category != 1 ? 1 : null) }}
          >
            <Text style={{
              color: category == 1 ? 'white' : 'black',
              fontWeight: 500
            }}>Burguer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: category == 2 ? '#7f89c6' : 'transparent',
            padding: 10,
            borderRadius: 12
          }}
            onPress={() => { setCategory(category != 2 ? 2 : null) }}
          >
            <Text style={{
              color: category == 2 ? 'white' : 'black',
              fontWeight: 500
            }}>Pizza</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: category == 3 ? '#7f89c6' : 'transparent',
            padding: 10,
            borderRadius: 12
          }}
            onPress={() => { setCategory(category != 3 ? 3 : null) }}
          >
            <Text style={{
              color: category == 3 ? 'white' : 'black',
              fontWeight: 500
            }}>Pasta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: category == 4 ? '#7f89c6' : 'transparent',
            padding: 10,
            borderRadius: 12
          }}
            onPress={() => { setCategory(category != 4 ? 4 : null) }}
          >
            <Text style={{
              color: category == 4 ? 'white' : 'black',
              fontWeight: 500
            }}>Popular</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={products.filter(produto => {
          if (category == null) return produto
          else if (category == produto.category) return produto
        })}
        numColumns={2}
        style={{
          width: '100%',
          backgroundColor: 'white',
        }}
        contentContainerStyle={{
          rowGap: 10,
          paddingBottom: 45,
          paddingHorizontal: 45,
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductsItem}
      />

      <View style={{
        width: '100%',
        backgroundColor: 'white',
        paddingVertical: 30,
        borderTopWidth: 1,
        borderTopColor: 'darkgrey'
      }}>
        <View style={{
          width: '80%',
          marginHorizontal: '10%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: "center",
        }}>
          <TouchableOpacity style={{
            backgroundColor: '#E9E1EB',
            padding: 10,
            borderRadius: 12
          }}
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

          <TouchableOpacity style={{ padding: 10 }}
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
export default HomeScreen;
