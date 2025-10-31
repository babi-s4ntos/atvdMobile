import React from "react";
import { TouchableOpacity, Text, StyleSheet, Linking } from "react-native";
import { WebView } from "react-native-webview";
import * as WebBrowser from "expo-web-browser";

type ExternalLinkProps = {
  href: string;
  title: string;
  useInApp?: boolean; // opcional: se true, abre dentro do app
};

export default function ExternalLink({ href, title, useInApp = false }: ExternalLinkProps) {
  const handlePress = async () => {
    try {
      if (useInApp) {
        // Abre o link dentro do app usando o navegador interno do Expo
        await WebBrowser.openBrowserAsync(href, {
          presentationStyle: WebBrowser.WebBrowserPresentationStyle.AUTOMATIC,
        });
      } else {
        // Abre o link no navegador padrão do dispositivo
        await Linking.openURL(href);
      }
    } catch (error) {
      console.error("Erro ao abrir o link:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F7CAC9",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
