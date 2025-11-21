# Resumo Completo: Guia de Referência Rápida

## 🚀 Guia Rápido para Refazer o Projeto do Zero

Este é um guia de referência para você refazer tudo sozinho!

---

## 📋 Pré-requisitos (Instalar uma vez)

### 1. Node.js
- Download: https://nodejs.org/
- Versão: 18.x ou 20.x (LTS)
- Verificar: `node --version`

### 2. Java JDK 17
- Download: https://adoptium.net/
- Verificar: `java -version`

### 3. Android SDK Command Line Tools
- Download: https://developer.android.com/studio#command-tools
- Extrair para: `C:\Android\cmdline-tools\latest\`

### 4. Variáveis de Ambiente

```powershell
# Criar ANDROID_HOME
setx ANDROID_HOME "C:\Android" /M

# Adicionar ao PATH
# Via interface gráfica: sysdm.cpl → Avançado → Variáveis de Ambiente
# Adicione:
# - C:\Android\cmdline-tools\latest\bin
# - C:\Android\platform-tools
```

### 5. Instalar componentes Android SDK

```powershell
sdkmanager --licenses
sdkmanager "platform-tools"
sdkmanager "platforms;android-34"
sdkmanager "build-tools;34.0.0"
```

### 6. Preparar celular Android

```
Configurações → Sobre o telefone → Tocar 7x em "Número da compilação"
→ Opções do desenvolvedor → Ativar "Depuração USB"
```

---

## 🆕 Criar Novo Projeto

```powershell
# 1. Criar projeto
npx react-native@latest init NomeDoProjeto

# 2. Entrar na pasta
cd NomeDoProjeto

# 3. Conectar celular via USB

# 4. Verificar conexão
adb devices

# 5. Executar no celular
npm run android
```

---

## 🔄 Fluxo de Trabalho Diário

```powershell
# 1. Conectar celular via USB

# 2. Verificar conexão
adb devices

# 3. Navegar para o projeto
cd C:\git\native-app\NativeApp

# 4. Executar
npm run android

# 5. Editar App.tsx
# Fast Refresh atualiza automaticamente!

# 6. Parar: Ctrl + C no terminal do Metro
```

---

## 📝 Estrutura de Arquivos

```
NomeDoApp/
├── App.tsx                 ⭐ EDITAR - Código do app
├── package.json            ⭐ Dependências
├── app.json                ⭐ Nome do app
├── android/
│   ├── app/
│   │   ├── build.gradle    ⭐ Versão e ID do app
│   │   └── src/main/
│   │       ├── AndroidManifest.xml  ⭐ Permissões
│   │       └── res/
│   │           ├── mipmap-*/        ⭐ Ícones
│   │           └── values/
│   │               └── strings.xml  ⭐ Nome do app
│   └── gradle.properties   ⭐ Configurações de build
└── node_modules/           ❌ Não editar
```

---

## 🎨 Componentes Básicos

```typescript
import {
  View,           // Container
  Text,           // Texto
  Button,         // Botão simples
  TouchableOpacity, // Botão customizável
  TextInput,      // Campo de texto
  Image,          // Imagem
  ScrollView,     // Área com scroll
  FlatList,       // Lista performática
} from 'react-native';

// Usar estados
import {useState} from 'react';
const [valor, setValor] = useState(0);

// Estilização
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
```

---

## 📦 Instalar Bibliotecas

```powershell
# Ícones
npm install react-native-vector-icons

# Navegação
npm install @react-navigation/native react-native-screens react-native-safe-area-context @react-navigation/native-stack

# Armazenamento local
npm install @react-native-async-storage/async-storage

# HTTP
npm install axios

# Após instalar, recompilar:
npm run android
```

---

## 🔨 Configurações Comuns

### Mudar nome do app

**Arquivo:** `app.json`
```json
{
  "name": "NomeApp",
  "displayName": "Nome Exibido"
}
```

**Ou:** `android/app/src/main/res/values/strings.xml`
```xml
<string name="app_name">Nome do App</string>
```

### Adicionar permissão

**Arquivo:** `android/app/src/main/AndroidManifest.xml`
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### Mudar versão do app

**Arquivo:** `android/app/build.gradle`
```gradle
defaultConfig {
    versionCode 2          // Número interno
    versionName "1.1"      // Versão exibida
}
```

### Otimizar para PC lento

**Arquivo:** `android/gradle.properties`
```properties
org.gradle.jvmargs=-Xmx1536m -XX:MaxMetaspaceSize=512m
org.gradle.caching=true
org.gradle.parallel=true
```

---

## 📱 Gerar APK

### APK Debug (rápido, para testar):

```powershell
cd android
.\gradlew assembleDebug
cd ..
```

**Localização:** `android\app\build\outputs\apk\debug\app-debug.apk`

### APK Release (otimizado, para distribuir):

**1. Gerar keystore (apenas uma vez):**
```powershell
keytool -genkeypair -v -storetype PKCS12 -keystore meu-app-key.keystore -alias meu-app-alias -keyalg RSA -keysize 2048 -validity 10000
```

**2. Configurar:** `android/app/build.gradle`
```gradle
android {
    signingConfigs {
        release {
            storeFile file('../../meu-app-key.keystore')
            storePassword 'SUA_SENHA'
            keyAlias 'meu-app-alias'
            keyPassword 'SUA_SENHA'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
        }
    }
}
```

**3. Gerar APK:**
```powershell
cd android
.\gradlew assembleRelease
cd ..
```

**Localização:** `android\app\build\outputs\apk\release\app-release.apk`

---

## 🐛 Debug e Logs

```typescript
// Exibir no terminal do Metro
console.log('Mensagem');
console.warn('Aviso');
console.error('Erro');

// Abrir menu de desenvolvimento no celular
// - Agite o celular
// - Ou pressione Ctrl + M no terminal
```

---

## 🧹 Limpar Build (quando algo não funciona)

```powershell
# Limpar cache do Metro
npx react-native start --reset-cache

# Limpar build Android
cd android
.\gradlew clean
cd ..

# Limpar node_modules (último recurso)
Remove-Item -Recurse -Force node_modules
npm install
```

---

## 🔧 Comandos ADB Úteis

```powershell
# Ver dispositivos conectados
adb devices

# Instalar APK
adb install caminho\do\app.apk

# Desinstalar app
adb uninstall com.seuapp

# Reiniciar ADB
adb kill-server
adb start-server

# Ver logs do Android (logcat)
adb logcat

# Limpar logs
adb logcat -c
```

---

## ⚡ Atalhos do Metro Bundler

Quando o Metro está rodando (`npm start`):

- `r` - Recarregar app
- `d` - Abrir menu dev no dispositivo
- `i` - Rodar no iOS (não funciona no Windows)
- `a` - Rodar no Android

---

## 🎯 Checklist Projeto Completo

### Instalação inicial:
- [ ] Node.js instalado
- [ ] Java JDK 17 instalado
- [ ] Android SDK instalado
- [ ] ANDROID_HOME configurado
- [ ] PATH configurado
- [ ] Celular com depuração USB habilitada

### Criar projeto:
- [ ] `npx react-native init NomeApp`
- [ ] `cd NomeApp`
- [ ] `npm run android`
- [ ] App rodando no celular

### Desenvolvimento:
- [ ] Editei App.tsx
- [ ] Fast Refresh funcionando
- [ ] Instalei bibliotecas necessárias
- [ ] Adicionei permissões necessárias
- [ ] Mudei nome e ícone do app

### Gerar APK:
- [ ] Criei keystore
- [ ] Configurei signing no build.gradle
- [ ] Gerei APK release
- [ ] Testei APK em dispositivo
- [ ] Guardei keystore em local seguro

---

## 📚 Recursos de Aprendizado

### Documentação:
- React Native: https://reactnative.dev/
- React Navigation: https://reactnavigation.org/
- React Native Directory: https://reactnative.directory/

### Tutoriais:
- React Native Tutorial: https://reactnative.dev/docs/tutorial
- FreeCodeCamp: https://www.freecodecamp.org/news/tag/react-native/

### Comunidade:
- Stack Overflow: https://stackoverflow.com/questions/tagged/react-native
- Reddit: https://www.reddit.com/r/reactnative/
- Discord: Reactiflux

---

## 🆘 Problemas Comuns

### npx não é reconhecido
```powershell
# Reinstalar Node.js
# Fechar todos os terminais
# Abrir novo terminal
```

### adb devices não mostra dispositivo
```powershell
# Verificar cabo USB
# Verificar depuração USB no celular
# Reinstalar driver: adb kill-server && adb start-server
```

### Build muito lento
```properties
# Em android/gradle.properties
org.gradle.jvmargs=-Xmx1536m
org.gradle.workers.max=2
```

### App crasha ao abrir
```powershell
# Ver logs
adb logcat

# Limpar e recompilar
cd android
.\gradlew clean
cd ..
npm run android
```

### Fast Refresh não funciona
```
# No celular:
# Agitar → Enable Fast Refresh → Reload
```

---

## 💾 Template de App Básico

```typescript
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

function App(): JSX.Element {
  const [texto, setTexto] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Meu App</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite algo..."
        value={texto}
        onChangeText={setTexto}
      />
      
      <TouchableOpacity
        style={styles.botao}
        onPress={() => console.log(texto)}>
        <Text style={styles.botaoTexto}>Clique</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  botao: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
```

---

## 🎓 Você Está Pronto!

Com este guia, você pode:
- ✅ Criar projetos React Native do zero
- ✅ Desenvolver apps para Android
- ✅ Testar no seu celular
- ✅ Gerar APKs para distribuição
- ✅ Resolver problemas comuns

**Boa sorte com seus projetos!** 🚀

---

## 📞 Precisa de Ajuda?

- Releia os arquivos na pasta `spec/`
- Consulte a documentação oficial
- Pesquise no Stack Overflow
- Pratique e experimente!

**Dica final:** O melhor jeito de aprender é fazendo. Crie projetos pequenos, erre, aprenda e evolua!

