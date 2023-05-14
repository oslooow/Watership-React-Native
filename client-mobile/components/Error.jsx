import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function Error() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/under-construction.png")}
        alt="Under construction"
        style={styles.image}
      />
      <Text style={styles.heading}>Oops!</Text>
      <Text style={styles.message}>
        This page is currently under construction. Please check back later.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  image: {
    width: "100%",
    height: 240,
    marginBottom: 32,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 32,
  },
});
