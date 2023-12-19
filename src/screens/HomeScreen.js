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
  { id: 3, category: 1, name: "Old Man Burger", price: 22, uri: "https://scontent-for1-1.xx.fbcdn.net/v/t39.30808-6/406463028_18405552379030673_1997468362526500577_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=3635dc&_nc_ohc=shyGcYfB_8AAX_KNkbZ&_nc_ht=scontent-for1-1.xx&oh=00_AfC-ndQ3_IOLp-6jMkQpPWbdzt_oHIFD1TQES4uoCiAAIA&oe=65867CBC" },
  { id: 4, category: 1, name: "Double Burger", price: 25, uri: "https://scontent-for1-1.xx.fbcdn.net/v/t39.30808-6/399323202_18400319359030673_8211737531510815795_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=3635dc&_nc_ohc=Yb-qt1hqtEsAX8l8OXO&_nc_ht=scontent-for1-1.xx&oh=00_AfC1Jfh2RQ3w30Ihctl39yQDuSeCFWu27vgB_mBucPMmmw&oe=6585D286" },
  { id: 5, category: 1, name: "Rusty Burger", price: 28, uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7F5v9n_Aoe40COx-rDBkAUYka3LKK3etNfLfXktRNZ-o776wEzVh69xyVwVvYXGVEiUE&usqp=CAU" },
  { id: 6, category: 1, name: "El Chapo", price: 34, uri: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=40&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 7, category: 1, name: "1/2 Década", price: 41, uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUJGIf0lRGVKvLdaG6dkpcWgzbQS8qi7V-tB2BQ2m3qqhselcuNi8vkpUaDIo5-7zF500&usqp=CAU" },
  { id: 8, category: 1, name: "Pastrami Burger", price: 45, uri: "https://static.wixstatic.com/media/b2b717_4d684d0bd8b34ee18b5233cf1f308637~mv2.jpg/v1/crop/x_15,y_178,w_689,h_691/fill/w_640,h_602,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/IMG_4689.jpg" },
  { id: 9, category: 1, name: "Gorgon Bacon", price: 50, uri: "https://i0.wp.com/www.ohamburguerperfeito.com.br/wp-content/uploads/2017/05/raw.jpg" },
  { id: 10, category: 2, name: "Pepperoni", price: 35, uri: "https://img.freepik.com/fotos-gratis/uma-deliciosa-pizza-recem-feita-em-um-fundo-preto_125540-5052.jpg?size=626&ext=jpg" },
  { id: 11, category: 2, name: "Carne de sol", price: 42, uri: "https://img.freepik.com/fotos-gratis/uma-fatia-de-pizza-crocante-com-carne-e-queijo_140725-6974.jpg?size=626&ext=jpg" },
  { id: 12, category: 2, name: "Quatro Queijos", price: 30, uri: "https://img.freepik.com/fotos-gratis/pizza-deliciosa-dentro-de-casa_23-2150873912.jpg?size=626&ext=jpg" },
  { id: 13, category: 2, name: "Calabresa", price: 22, uri: "https://img.freepik.com/fotos-gratis/pizza-de-calabresa-com-azeitonas-na-placa-de-madeira_140725-5374.jpg?size=626&ext=jpg" },
  { id: 14, category: 2, name: "Presunto", price: 25, uri: "https://img.freepik.com/fotos-premium/pizza-no-sortimento-fatias-de-pizza-com-carne-cogumelos-tomate-e-outros-vegetais-pizza-italiana_234415-804.jpg?size=626&ext=jpg&ga=GA1.1.1865783181.1703006119&semt=sph" },
  { id: 15, category: 2, name: "Vegana", price: 38, uri: "https://img.freepik.com/fotos-gratis/close-up-em-uma-deliciosa-pizza_23-2150852103.jpg?size=626&ext=jpg" },
  { id: 16, category: 3, name: "Tagliatelle", price: 35, uri: "https://img.freepik.com/fotos-gratis/deliciosa-massa-no-prato_23-2150690617.jpg?w=740&t=st=1703007119~exp=1703007719~hmac=490b695a97bfdab66c310fc115e0e3c85ce68c45784bcca7220822d98318560d" },
  { id: 17, category: 3, name: "Fusili", price: 32, uri: "https://img.freepik.com/psd-premium/uma-tigela-de-macarrao-com-bacon-e-salsa-sobre-uma-mesa-xadrez_410516-104707.jpg?size=626&ext=jpg&ga=GA1.1.1865783181.1703006119&semt=sph" },
  { id: 18, category: 3, name: "Penne", price: 30, uri: "https://img.freepik.com/fotos-gratis/vista-lateral-do-garfo-com-macarrao-com-molho-de-tomate-e-queijo-parmesao_140725-12887.jpg?size=626&ext=jpg&ga=GA1.1.1865783181.1703006119&semt=sph" },
  { id: 19, category: 3, name: "Lasanha à Bolonhesa", price: 48, uri: "https://img.freepik.com/fotos-gratis/deliciosa-massa-no-prato_23-2150690693.jpg?size=626&ext=jpg&ga=GA1.1.1865783181.1703006119&semt=sph" },
  { id: 20, category: 3, name: "Espaguete", price: 25, uri: "https://img.freepik.com/psd-premium/prato-de-espaguete-com-molho-vermelho-e-folhas-de-manjericao-em-fundo-transparente_812337-4003.jpg?size=626&ext=jpg&ga=GA1.1.1865783181.1703006119&semt=sph" },
  { id: 21, category: 3, name: "Fettuccine", price: 40, uri: "https://img.freepik.com/psd-premium/uma-tigela-de-espaguete-com-tomate-e-azeitonas_176841-64430.jpg?size=626&ext=jpg&ga=GA1.1.1865783181.1703006119&semt=sph" },
  { id: 22, category: 4, name: "Old But Gold", price: 10, uri: "https://scontent-for1-1.xx.fbcdn.net/v/t39.30808-6/344813871_223090183681783_519138428414569610_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=c83dfd&_nc_ohc=rE6L0pCiM70AX-OW1DK&_nc_ht=scontent-for1-1.xx&oh=00_AfDC3qXAl_6tMsekzM6ltIbBDf_4yDIxZb8l94Z0jk6UiQ&oe=6585D0FD" },
  { id: 23, category: 4, name: "K-Pop Burger", price: 15, uri: "https://i.pinimg.com/736x/d8/42/2e/d8422ea0ff820af4ce2df4bd24a91d58.jpg" },
  { id: 24, category: 4, name: "Old Man Burger", price: 22, uri: "https://scontent-for1-1.xx.fbcdn.net/v/t39.30808-6/406463028_18405552379030673_1997468362526500577_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=3635dc&_nc_ohc=shyGcYfB_8AAX_KNkbZ&_nc_ht=scontent-for1-1.xx&oh=00_AfC-ndQ3_IOLp-6jMkQpPWbdzt_oHIFD1TQES4uoCiAAIA&oe=65867CBC" },
  { id: 25, category: 4, name: "Pepperoni", price: 35, uri: "https://img.freepik.com/fotos-gratis/uma-deliciosa-pizza-recem-feita-em-um-fundo-preto_125540-5052.jpg?size=626&ext=jpg" },
  { id: 26, category: 4, name: "Carne de sol", price: 42, uri: "https://img.freepik.com/fotos-gratis/uma-fatia-de-pizza-crocante-com-carne-e-queijo_140725-6974.jpg?size=626&ext=jpg" },
  { id: 27, category: 4, name: "Quatro Queijos", price: 30, uri: "https://img.freepik.com/fotos-gratis/pizza-deliciosa-dentro-de-casa_23-2150873912.jpg?size=626&ext=jpg" },
  { id: 28, category: 4, name: "Penne", price: 30, uri: "https://img.freepik.com/fotos-gratis/vista-lateral-do-garfo-com-macarrao-com-molho-de-tomate-e-queijo-parmesao_140725-12887.jpg?size=626&ext=jpg&ga=GA1.1.1865783181.1703006119&semt=sph" },
  { id: 29, category: 4, name: "Lasanha à Bolonhesa", price: 48, uri: "https://img.freepik.com/fotos-gratis/deliciosa-massa-no-prato_23-2150690693.jpg?size=626&ext=jpg&ga=GA1.1.1865783181.1703006119&semt=sph" },
  { id: 30, category: 4, name: "Espaguete", price: 25, uri: "https://img.freepik.com/psd-premium/prato-de-espaguete-com-molho-vermelho-e-folhas-de-manjericao-em-fundo-transparente_812337-4003.jpg?size=626&ext=jpg&ga=GA1.1.1865783181.1703006119&semt=sph" }
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
