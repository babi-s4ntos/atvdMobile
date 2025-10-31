import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { WebView } from "react-native-webview";

export default function App() {
  const [showWebView, setShowWebView] = useState(false);

  const githubUrl = "https://github.com/babi-s4ntos";
  const profileImage = "https://avatars.githubusercontent.com/babi-s4ntos";
  const nome = "Bárbara Vitória";

  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [glowAnim]);

  const neonGlow = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FF0099", "#FF66CC"],
  });

  return (
    <View style={styles.outerContainer}>
      <Animated.View
        style={[
          styles.screenBorder,
          { borderColor: neonGlow, shadowColor: neonGlow },
        ]}
      >
        <View style={styles.container}>
          {showWebView ? (
            <WebView source={{ uri: githubUrl }} style={{ flex: 1 }} />
          ) : (
            <>
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
              <Text style={styles.name}>{nome}</Text>

              <Animated.View
                style={[
                  styles.button,
                  { shadowColor: neonGlow, borderColor: neonGlow },
                ]}
              >
                <TouchableOpacity
                  onPress={() =>
                    WebBrowser.openBrowserAsync(githubUrl, {
                      presentationStyle:
                        WebBrowser.WebBrowserPresentationStyle.AUTOMATIC,
                    })
                  }
                >
                  <Text style={styles.buttonText}>Abrir perfil no GitHub</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View
                style={[
                  styles.touchable,
                  {
                    borderColor: neonGlow,
                    shadowColor: neonGlow,
                    transform: [
                      {
                        scale: glowAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.05],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => alert("Você clicou no TouchableOpacity!")}
                >
                  <Text style={styles.touchableText}>
                    Clique no TouchableOpacity
                  </Text>
                </TouchableOpacity>
              </Animated.View>

              <Pressable
                style={({ pressed }) => [
                  styles.pressable,
                  { backgroundColor: pressed ? "#FF33CC" : "#FF007F" },
                ]}
                onPress={() => alert("Você clicou no Pressable!")}
              >
                <Text style={styles.pressableText}>Clique no Pressable</Text>
              </Pressable>
            </>
          )}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#000", // fundo preto fora da borda
    alignItems: "center",
    justifyContent: "center",
  },
  screenBorder: {
    width: "90%",
    height: "82%", // 🔥 diminuí para deixar menos espaço vertical
    borderWidth: 6,
    borderRadius: 25,
    shadowOpacity: 0.8,
    shadowRadius: 25,
    backgroundColor: "#0D0D0D",
    overflow: "hidden",
  },
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10, // 🔥 padding menor para reduzir o espaço interno
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 15, // 🔥 margem menor
    borderWidth: 3,
    borderColor: "#FF0099",
    shadowColor: "#FF0099",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF33CC",
    marginBottom: 15,
    textShadowColor: "#FF0099",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  button: {
    backgroundColor: "#1A1A1A",
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginBottom: 15,
    shadowOpacity: 0.9,
    shadowRadius: 15,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  touchable: {
    backgroundColor: "#000",
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginBottom: 15,
    shadowOpacity: 0.9,
    shadowRadius: 12,
  },
  touchableText: {
    color: "#FF66FF",
    fontWeight: "bold",
    textShadowColor: "#FF00FF",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  pressable: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
    shadowColor: "#FF33CC",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
  pressableText: {
    color: "#FFF",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
