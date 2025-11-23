import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.content}>
          <Text style={styles.title}>🎉 Bem-vindo ao React Native!</Text>
          <Text style={styles.subtitle}>Seu app está rodando com Expo</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>✅ Hot Reload ativado</Text>
            <Text style={styles.infoText}>✅ Edite App.tsx e veja as mudanças</Text>
            <Text style={styles.infoText}>✅ Agite o celular para abrir o menu</Text>
          </View>
          <Text style={styles.footer}>
            Edite o arquivo App.tsx para começar! 🚀
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    width: '100%',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  footer: {
    fontSize: 14,
    color: '#999',
    marginTop: 20,
    textAlign: 'center',
  },
});
