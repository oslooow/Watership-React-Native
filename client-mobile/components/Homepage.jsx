import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Box, Heading, Center, VStack, Image } from "native-base";
import { useQuery, gql } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PRODUCTS_QUERY = gql`
  query Product {
    products {
      Category {
        name
      }
      description
      mainImg
      name
      price
      id
    }
  }
`;

export default function Homepage() {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);
  const navigation = useNavigation();

  const handleCardPress = (id) => {
    navigation.navigate("Details", { id });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const priceIDR = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(item.price);

    return (
      <TouchableOpacity
        onPress={() => handleCardPress(item.id)}
        style={styles.cardTouchable}
      >
        <Box key={item.name} shadow={2} rounded="lg" style={styles.card}>
          <Image
            source={{ uri: item.mainImg }}
            alt={item.name}
            style={styles.image}
          />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.category}>Category: {item.Category.name}</Text>
          <View style={styles.priceContainer}>
            <Ionicons name="md-pricetag" size={18} color="#333" />
            <Text style={styles.price}> {priceIDR}</Text>
          </View>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Heading style={styles.heading}>Our Products</Heading>
      <FlatList
        data={data.products}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: "#f2f2f2",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  errorText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f00",
  },
  cardTouchable: {
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  description: {
    color: "#777",
    fontSize: 14,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  category: {
    fontSize: 14,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
  },
});
