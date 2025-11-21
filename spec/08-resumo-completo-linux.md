# Resumo Completo: Guia de Referência Rápida (Linux)

## 🚀 Guia Rápido para Refazer o Projeto do Zero

Este é um guia de referência para você refazer tudo sozinho no Linux!

---

## 📋 Pré-requisitos (Instalar uma vez)

### 1. Node.js
- Via NodeSource: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -  && sudo apt install -y nodejs`
- Versão: 18.x ou 20.x (LTS)
- Verificar: `node --version`

### 2. Java JDK 17
- Instalar: `sudo apt install -y openjdk-17-jdk`
- Verificar: `java -version`

### 3. Android SDK Command Line Tools
- Download: https://developer.android.com/studio#command-tools
- Extrair para: `~/Android/Sdk/cmdline-tools/latest/`

```bash
cd ~/Downloads
unzip commandlinetools-linux-*_latest.zip
mkdir -p ~/Android/Sdk/cmdline-tools
mv cmdline-tools ~/Android/Sdk/cmdline-tools/latest
```

### 4. Variáveis de Ambiente

Adicione ao `~/.bashrc` ou `~/.zshrc`:

```bash
# Android SDK
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
```

Depois:
```bash
source ~/.bashrc  # ou source ~/.zshrc
```

### 5. Instalar componentes Android SDK

```bash
sdkmanager --licenses
sdkmanager "platform-tools"
sdkmanager "platforms;android-34"
sdkmanager "build-tools;34.0.0"
```

### 6. Configurar regras udev (específico Linux)

```bash
# Criar arquivo de regras
sudo nano /etc/udev/rules.d/51-android.rules
```

Adicione:
```
SUBSYSTEM=="usb", ATTR{idVendor}=="18d1", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTR{idVendor}=="04e8", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTR{idVendor}=="2717", MODE="0666", GROUP="plugdev"
```

Depois:
```bash
sudo chmod a+r /etc/udev/rules.d/51-android.rules
sudo usermod -aG plugdev $USER
sudo udevadm control --reload-rules
sudo udevadm trigger
```

**Reinicie o PC** para aplicar.

### 7. Preparar celular Android

```
Configurações → Sobre o telefone → Tocar 7x em "Número da compilação"
→ Opções do desenvolvedor → Ativar "Depuração USB"
```

---

## 🆕 Criar Novo Projeto

```bash
# 1. Criar projeto
npx react-native@latest init NomeDoProjeto

# 2. Entrar na pasta
cd NomeDoProjeto

# 3. Dar permissão ao gradlew
chmod +x android/gradlew

# 4. Conectar celular via USB

# 5. Verificar conexão
adb devices

# 6. Executar no celular
npm run android
```

---

## 🔄 Fluxo de Trabalho Diário

```bash
# 1. Conectar celular via USB

# 2. Verificar conexão
adb devices

# 3. Navegar para o projeto
cd ~/projetos/native-app/NomeApp

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

```bash
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

### Otimizar para PC com boa RAM

**Arquivo:** `android/gradle.properties`
```properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=1024m
org.gradle.caching=true
org.gradle.parallel=true
org.gradle.workers.max=4
```

---

## 📱 Gerar APK

### APK Debug (rápido, para testar):

```bash
cd android
./gradlew assembleDebug
cd ..
```

**Localização:** `android/app/build/outputs/apk/debug/app-debug.apk`

### APK Release (otimizado, para distribuir):

**1. Gerar keystore (apenas uma vez):**
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore ~/keystores/meu-app-key.keystore -alias meu-app-alias -keyalg RSA -keysize 2048 -validity 10000
```

**2. Configurar:** `android/app/build.gradle`
```gradle
android {
    signingConfigs {
        release {
            storeFile file('/home/usuario/keystores/meu-app-key.keystore')
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
```bash
cd android
./gradlew assembleRelease
cd ..
```

**Localização:** `android/app/build/outputs/apk/release/app-release.apk`

---

## 🐛 Debug e Logs

```typescript
// Exibir no terminal do Metro
console.log('Mensagem');
console.warn('Aviso');
console.error('Erro');

// Abrir menu de desenvolvimento no celular
// - Agite o celular
// - Ou: adb shell input keyevent 82
```

### Ver logs do Android:

```bash
# Ver todos os logs
adb logcat

# Filtrar React Native
adb logcat | grep -i "ReactNative"

# Apenas erros
adb logcat *:E

# Salvar em arquivo
adb logcat > logs.txt
```

---

## 🧹 Limpar Build (quando algo não funciona)

```bash
# Limpar cache do Metro
npx react-native start --reset-cache

# Limpar build Android
cd android
./gradlew clean
cd ..

# Limpar node_modules (último recurso)
rm -rf node_modules
npm install
```

---

## 🔧 Comandos ADB Úteis

```bash
# Ver dispositivos conectados
adb devices

# Instalar APK
adb install caminho/do/app.apk

# Desinstalar app
adb uninstall com.seuapp

# Reiniciar ADB
adb kill-server
adb start-server

# Ver logs do Android (logcat)
adb logcat

# Limpar logs
adb logcat -c

# Abrir menu dev
adb shell input keyevent 82

# Copiar arquivo para celular
adb push arquivo.apk /sdcard/Download/

# Baixar arquivo do celular
adb pull /sdcard/screenshot.png ~/Pictures/

# Screenshot
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png

# Gravar vídeo (Ctrl+C para parar)
adb shell screenrecord /sdcard/demo.mp4
```

---

## ⚡ Atalhos do Metro Bundler

Quando o Metro está rodando (`npm start`):

- `r` - Recarregar app
- `d` - Abrir menu dev no dispositivo
- `i` - Rodar no iOS (não funciona no Linux)
- `a` - Rodar no Android
- `j` - Abrir debugger

---

## 🐧 Aliases Úteis para Linux

Adicione ao `~/.bashrc` ou `~/.zshrc`:

```bash
# Atalhos React Native
alias rn-run='npm run android'
alias rn-start='npm start'
alias rn-clean='cd android && ./gradlew clean && cd .. && npm start -- --reset-cache'
alias rn-devices='adb devices'
alias rn-menu='adb shell input keyevent 82'
alias rn-reload='adb shell input text "RR"'
alias rn-logs='adb logcat | grep -i "ReactNative"'
alias rn-doctor='npx react-native doctor'

# Atalhos ADB
alias adb-restart='adb kill-server && adb start-server'
alias adb-screen='adb shell screencap -p /sdcard/screenshot.png && adb pull /sdcard/screenshot.png'
```

Depois: `source ~/.bashrc`

Agora use: `rn-run`, `rn-menu`, `rn-logs`, etc.

---

## 🎯 Checklist Projeto Completo

### Instalação inicial:
- [ ] Node.js instalado
- [ ] Java JDK 17 instalado
- [ ] Android SDK instalado
- [ ] ANDROID_HOME configurado
- [ ] PATH configurado
- [ ] Regras udev configuradas
- [ ] Celular com depuração USB habilitada

### Criar projeto:
- [ ] `npx react-native init NomeApp`
- [ ] `cd NomeApp`
- [ ] `chmod +x android/gradlew`
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
- [ ] Guardei keystore em local seguro (com backup!)

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

## 🆘 Problemas Comuns (Linux específico)

### npx não é reconhecido
```bash
# Verificar instalação do Node
node --version
npm --version

# Reinstalar se necessário
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### adb devices não mostra dispositivo
```bash
# Verificar regras udev
ls -la /etc/udev/rules.d/51-android.rules

# Recarregar regras
sudo udevadm control --reload-rules
sudo usermod -aG plugdev $USER

# Reiniciar ADB
adb kill-server
adb start-server
adb devices

# Se não funcionar, reinicie o PC
sudo reboot
```

### Permission denied ao executar gradlew
```bash
chmod +x android/gradlew
```

### Build muito lento
```properties
# Em android/gradle.properties (PC com pouca RAM)
org.gradle.jvmargs=-Xmx1536m
org.gradle.workers.max=2

# Para PC com mais RAM (8GB+)
org.gradle.jvmargs=-Xmx4096m
org.gradle.workers.max=4
org.gradle.caching=true
org.gradle.parallel=true
```

### App crasha ao abrir
```bash
# Ver logs
adb logcat *:E

# Limpar e recompilar
cd android
./gradlew clean
cd ..
npm run android
```

### Fast Refresh não funciona
```bash
# No terminal
adb shell input keyevent 82

# No celular:
# Agitar → Enable Fast Refresh → Reload
```

### EACCES: permission denied (npm)
```bash
# NUNCA use sudo com npm!
# Configure npm para usar pasta do usuário
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# Adicione ao ~/.bashrc
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
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

## 🐧 Script de Build Automatizado (Linux)

Crie um arquivo `build-release.sh`:

```bash
#!/bin/bash

echo "🚀 Iniciando build do APK Release..."

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Limpar build anterior
echo "🧹 Limpando build anterior..."
cd android
./gradlew clean
cd ..

# Gerar APK Release
echo "📦 Gerando APK Release..."
cd android
./gradlew assembleRelease

if [ $? -eq 0 ]; then
    cd ..
    
    # Criar pasta de releases
    mkdir -p releases
    
    # Copiar APK com timestamp
    TIMESTAMP=$(date +%Y%m%d-%H%M%S)
    cp android/app/build/outputs/apk/release/app-release.apk releases/app-v$TIMESTAMP.apk
    
    echo -e "${GREEN}✅ Build concluído!${NC}"
    echo "📦 APK: $(ls -lh releases/app-v$TIMESTAMP.apk)"
    
    # Mostrar tamanho
    SIZE=$(du -h releases/app-v$TIMESTAMP.apk | cut -f1)
    echo "📏 Tamanho: $SIZE"
else
    echo -e "${RED}❌ Erro no build!${NC}"
    exit 1
fi
```

Dar permissão e usar:

```bash
chmod +x build-release.sh
./build-release.sh
```

---

## 🎓 Você Está Pronto!

Com este guia, você pode:
- ✅ Criar projetos React Native do zero no Linux
- ✅ Desenvolver apps para Android
- ✅ Testar no seu celular
- ✅ Gerar APKs para distribuição
- ✅ Resolver problemas comuns
- ✅ Usar o poder do terminal Linux

**Boa sorte com seus projetos!** 🚀

---

## 💡 Vantagens de Desenvolver no Linux

- ✅ **Builds 20-30% mais rápidos** que Windows
- ✅ **Menos problemas com permissões**
- ✅ **Terminal bash/zsh poderoso**
- ✅ **ADB funciona melhor**
- ✅ **File watching mais eficiente**
- ✅ **Sem antivírus atrapalhando**
- ✅ **Scripts de automação fáceis**

Você escolheu a melhor plataforma! 🐧🚀

---

## 📞 Precisa de Ajuda?

- Releia os arquivos na pasta `spec/`
- Use os comandos de referência acima
- Consulte a documentação oficial
- Pesquise no Stack Overflow
- Use os aliases criados!

**Dica final:** O melhor jeito de aprender é fazendo. Crie projetos pequenos, erre, aprenda e evolua!

**E aproveite o Linux!** O terminal é seu melhor amigo no desenvolvimento React Native. 🐧💪

