import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { width } = useWindowDimensions();

  const titleSize = width * 0.055;
  const buttonTextSize = width * 0.045;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#075E54" barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WhatsApp</Text>

        <View style={styles.tabsContainer}>
          <Text style={[styles.tab, styles.activeTab]}>CHATS</Text>
          <Text style={styles.tab}>STATUS</Text>
          <Text style={styles.tab}>CALLS</Text>
        </View>
      </View>

      {/* BODY */}
      <View style={styles.body}>
        <View style={styles.iconWrapper}>
          <Image
            source={require("../../Assets/Images/tickr.png")}   // temporary empty object (prevents crash)
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.title, { fontSize: titleSize }]}>
          You haven’t chat yet
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={[styles.buttonText, { fontSize: buttonTextSize }]}>
            Start Chatting
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECE5DD",
  },

  header: {
    backgroundColor: "#075E54",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },

  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  tab: {
    color: "#B2DFDB",
    fontSize: 14,
    fontWeight: "500",
  },

  activeTab: {
    color: "#FFFFFF",
    borderBottomWidth: 3,
    borderBottomColor: "#FFFFFF",
    paddingBottom: 5,
  },

  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  iconWrapper: {
    width: 110,
    height: 110,
    backgroundColor: "#25D366",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  icon: {
    width: 50,
    height: 50,
  },

  title: {
    color: "#000",
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#25D366",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});