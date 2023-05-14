import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, headerBackImageSource } from "native-base";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Navbar from "./components/Navbar";

const client = new ApolloClient({
  uri: "https://mobile.oslooow.site",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Navbar />
        </NavigationContainer>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
