import { useQuery, gql } from "@apollo/client";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Box, Heading } from "native-base";
import React from "react";

const PRODUCTS_DETAIL_QUERY = gql`
  query Query($productId: ID) {
    product(id: $productId) {
      Category {
        name
      }
      description
      id
      name
      mainImg
      price
    }
  }
`;

export default function Details({ route, navigation }) {
  const { id } = route.params;
  const { loading, error, data } = useQuery(PRODUCTS_DETAIL_QUERY, {
    variables: { productId: id },
  });

  const handleBuyPress = () => {
    navigation.navigate("Error");
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

  const { product } = data;

  const priceIDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(product.price);

  return (
    <View style={styles.container}>
      <Heading style={styles.heading}>{product.name}</Heading>
      <Box shadow={2} rounded="lg" style={styles.card}>
        <Image
          source={{ uri: product.mainImg }}
          alt={product.name}
          style={styles.image}
        />
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.category}>Category: {product.Category.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>Price: {priceIDR}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleBuyPress}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
  },
  card: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 240,
    marginBottom: 16,
    borderRadius: 8,
  },
  description: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  category: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    marginTop: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 4,
    color: "#333",
  },
  button: {
    backgroundColor: "#FF4646",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
