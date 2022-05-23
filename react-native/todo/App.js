import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { theme } from "./colors";

const STORAGE_KEY = "@toDos";

export default function App() {
  const [home, setHome] = useState(true);
  const toHome = () => setHome(true);
  const toOffice = () => setHome(false);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    const str = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(str));
  };
  const deleteToDo = async (id) => {
    Alert.alert("Delete to do", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Sure",
        style: "destructive",
        onPress: async () => {
          const newToDos = { ...toDos };
          delete newToDos[id];
          setToDos(newToDos);
          await saveToDos(newToDos);
        },
      },
    ]);
  };
  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = Object.assign({}, toDos, {
      [Date.now()]: { text, home: home },
    });
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  useEffect(() => {
    loadToDos();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
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
      <TextInput
        returnKeyType="done"
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        value={text}
        placeholder={home ? "Add a to do at home" : "Add a to do at office"}
        style={styles.input}
      />
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].home === home ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Fontisto name="trash" size={20} color={theme.trashBtn} />
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
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
  input: {
    backgroundColor: theme.inputBg,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.toDoBg,
    marginBottom: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  toDoText: {
    color: theme.toDoText,
    fontSize: 17,
    fontWeight: "400",
  },
});
