import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { theme } from "./colors";

export default function App() {
  const [home, setHome] = useState(true);
  const toHome = () => setHome(true);
  const toOffice = () => setHome(false);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={toHome}>
          <Text
            style={{
              ...styles.btnText,
              color: home ? theme.activation : theme.deactivation,
            }}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toOffice}>
          <Text
            style={{
              ...styles.btnText,
              color: !home ? theme.activation : theme.deactivation,
            }}
          >
            Office
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 100,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  btnText: {
    fontSize: 40,
    fontWeight: "500",
  },
});
