import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
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

const TODOS_KEY = "@toDos";
const HOME_KEY = "@home";

export default function App() {
  const [home, setHome] = useState(true);
  const toHome = async () => {
    setHome(true);
    await AsyncStorage.setItem(HOME_KEY, "true");
  };
  const toOffice = async () => {
    setHome(false);
    await AsyncStorage.setItem(HOME_KEY, "false");
  };
  const loadHome = async () => {
    const str = await AsyncStorage.getItem(HOME_KEY);
    if (str === "true") {
      setHome(true);
    } else {
      setHome(false);
    }
  };
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    try {
      await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(toSave));
    } catch (error) {
      Alert.alert(error);
    }
  };
  const loadToDos = async () => {
    try {
      const str = await AsyncStorage.getItem(TODOS_KEY);
      setToDos(JSON.parse(str));
    } catch (error) {
      Alert.alert(error);
    }
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
      [Date.now()]: { text, home: home, complete: false, editable: false },
    });
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  const toggleCompleteToDo = async (key) => {
    const newToDos = { ...toDos };
    newToDos[key].complete = !toDos[key].complete;
    setToDos(newToDos);
    await saveToDos(newToDos);
  };
  const toggleEditableToDo = async (key) => {
    if (toDos[key].complete) {
      Alert.alert("Uncheck complete before edit");
      return;
    }
    const newToDos = { ...toDos };
    newToDos[key].editable = !toDos[key].editable;
    setToDos(newToDos);
    await saveToDos(newToDos);
  };
  const onSubmitEditing = async (key) => {
    const newToDos = { ...toDos };
    toDos[key].editable = false;
    setToDos(newToDos);
    await saveToDos(newToDos);
  };
  const onEditText = (key, text) => {
    setToDos({
      ...toDos,
      [key]: { ...toDos[key], text },
    });
  };
  useEffect(() => {
    loadHome();
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
              {toDos[key].editable ? (
                <TextInput
                  returnKeyType="done"
                  onSubmitEditing={() => onSubmitEditing(key)}
                  onChangeText={(text) => onEditText(key, text)}
                  value={toDos[key].text}
                  style={styles.toDoText}
                />
              ) : (
                <Text
                  style={{
                    ...styles.toDoText,
                    textDecorationLine: toDos[key].complete
                      ? "line-through"
                      : "none",
                  }}
                >
                  {toDos[key].text}
                </Text>
              )}

              <View style={styles.icon}>
                <TouchableOpacity onPress={() => toggleCompleteToDo(key)}>
                  {toDos[key].complete ? (
                    <Fontisto
                      name="checkbox-active"
                      size={20}
                      color={theme.icon}
                    />
                  ) : (
                    <Fontisto
                      name="checkbox-passive"
                      size={20}
                      color={theme.icon}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleEditableToDo(key)}>
                  {toDos[key].editable ? (
                    <MaterialIcons
                      name="mode-edit"
                      size={20}
                      color={theme.icon}
                    />
                  ) : (
                    <MaterialIcons
                      name="edit-off"
                      size={20}
                      color={theme.icon}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteToDo(key)}>
                  <Fontisto name="trash" size={20} color={theme.icon} />
                </TouchableOpacity>
              </View>
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
  icon: {
    flexDirection: "row",
  },
});
