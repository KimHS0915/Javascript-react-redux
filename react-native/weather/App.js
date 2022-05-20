import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { Fontisto } from "@expo/vector-icons";

const API_KEY = "1d7dc479625863f267b33ad299083f6b";
const API_URL = "https://api.openweathermap.org/data/2.5/onecall";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [permission, setPermission] = useState(true);
  const getWeather = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setPermission(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({});
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `${API_URL}?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.date}>
                {new Date(day.dt * 1000).toString().substring(0, 10)}
              </Text>
              <View style={styles.tempWrapper}>
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={40}
                  color="black"
                />
              </View>
              <Text style={styles.mainDescription}>{day.weather[0].main}</Text>
              <Text style={styles.subDescription}>
                {day.weather[0].description}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffd9b3",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 77,
    fontWeight: "400",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  tempWrapper: {
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  temp: {
    marginTop: 55,
    marginBottom: 20,
    fontSize: 125,
    fontWeight: "400",
    fontStyle: "italic",
  },
  mainDescription: {
    marginTop: -20,
    fontSize: 50,
  },
  subDescription: {
    fontSize: 15,
    fontWeight: "200",
    fontStyle: "italic",
  },
  date: {
    fontSize: 30,
    fontWeight: "200",
  },
});
