# 🚀 Configuração Android - React Native no WSL2

## ✅ Configuração Concluída

O ambiente Android SDK foi configurado com sucesso no seu WSL2!

### 📦 O que foi instalado:

- ✅ **Android SDK Command Line Tools** (versão 12.0)
- ✅ **Android Platform 34** (Android 14)
- ✅ **Build Tools 34.0.0**
- ✅ **Platform Tools** (contém ADB versão 1.0.41)
- ✅ **Variáveis de ambiente** configuradas no `.bashrc`

### 📍 Localização do SDK:

```
~/Android/Sdk/
```

---

## 🎯 Próximos Passos

### 1. **Abrir Novo Terminal WSL**

**IMPORTANTE**: Feche e reabra seu terminal WSL para carregar as novas variáveis de ambiente.

### 2. **Verificar Instalação**

No novo terminal WSL, execute:

```bash
# Verificar ANDROID_HOME
echo $ANDROID_HOME
# Deve mostrar: /home/nsneto/Android/Sdk

# Verificar ADB
adb version
# Deve mostrar: Android Debug Bridge version 1.0.41
```

### 3. **Conectar Dispositivo Android via WiFi**

Como o WSL2 não tem acesso direto ao USB, usaremos conexão via WiFi.

#### 🔌 Primeira Conexão (Requer USB temporariamente)

1. **No seu Android:**
   - Ative **Opções do Desenvolvedor**
   - Ative **Depuração USB**
   - Conecte o celular ao PC via cabo USB
   - Autorize o computador quando aparecer o pop-up

2. **No Windows PowerShell:**
   ```powershell
   # Conectar USB ao WSL (somente Windows 11 com usbipd)
   # Se não tiver, pule para "Alternativa"
   ```

3. **Alternativa: Usar ADB do Windows**
   
   a. Baixe o **Platform Tools**: https://developer.android.com/tools/releases/platform-tools
   
   b. Extraia em `C:\platform-tools`
   
   c. No PowerShell (como Admin):
   ```powershell
   cd C:\platform-tools
   .\adb.exe devices
   # Seu dispositivo deve aparecer
   
   # Habilitar TCP/IP na porta 5555
   .\adb.exe tcpip 5555
   ```
   
   d. **Obter IP do celular:**
   - Configurações → Sobre o telefone → Status → Endereço IP
   - Ou: Configurações → Wi-Fi → (toque na rede conectada)
   
   e. **Desconectar o cabo USB**
   
   f. **Conectar via WiFi:**
   ```powershell
   .\adb.exe connect SEU_IP:5555
   # Exemplo: .\adb.exe connect 192.168.1.100:5555
   ```

4. **No WSL:**
   
   Use o script que criei para você:
   
   ```bash
   cd /mnt/c/git/react-app
   ./connect-android.sh
   ```
   
   Ou manualmente:
   ```bash
   # Salve o IP do seu celular
   export DEVICE_IP="192.168.1.100"  # Substitua pelo seu IP
   
   # Conectar
   adb connect $DEVICE_IP:5555
   
   # Verificar conexão
   adb devices -l
   ```

#### 🔄 Reconexões Futuras

Depois da primeira configuração, basta executar:

```bash
cd /mnt/c/git/react-app
./connect-android.sh
```

Ou:

```bash
adb connect SEU_IP:5555
adb devices
```

---

## 🏃‍♂️ Executar o App React Native

### Passo 1: Iniciar Metro Bundler

```bash
cd /mnt/c/git/react-app
npm start
```

### Passo 2: Em outro terminal WSL, instalar o app

```bash
cd /mnt/c/git/react-app
npm run android
```

---

## 🐛 Troubleshooting

### Problema: "SDK location not found"

```bash
# Verificar se o arquivo existe
cat android/local.properties
# Deve mostrar: sdk.dir=/home/nsneto/Android/Sdk
```

### Problema: "adb: command not found"

```bash
# Fechar e reabrir o terminal WSL
# Ou carregar manualmente:
source ~/.bashrc

# Verificar
which adb
```

### Problema: "No connected devices"

```bash
# Verificar conexão
adb devices

# Se vazio, reconectar:
adb connect SEU_IP:5555

# Restart ADB server
adb kill-server
adb start-server
adb connect SEU_IP:5555
```

### Problema: "Connection refused"

- Certifique-se que celular e PC estão na **mesma rede WiFi**
- Verifique se o IP do celular não mudou
- Reinicie o modo TCP no celular:
  ```bash
  # Conectar via USB novamente e executar:
  adb tcpip 5555
  ```

### Problema: Build muito lento

O WSL2 com arquivos em `/mnt/c/` pode ser lento. Considere mover o projeto para dentro do WSL:

```bash
# Copiar projeto para home do WSL
cp -r /mnt/c/git/react-app ~/react-app
cd ~/react-app
npm install
```

---

## 📝 Comandos Úteis

```bash
# Listar dispositivos
adb devices -l

# Ver logs do Android
adb logcat

# Instalar APK manualmente
adb install -r android/app/build/outputs/apk/debug/app-debug.apk

# Reiniciar ADB
adb kill-server
adb start-server

# Desconectar dispositivo
adb disconnect SEU_IP:5555

# Limpar build do Android
cd android && ./gradlew clean && cd ..

# Resetar Metro cache
npm start -- --reset-cache
```

---

## 🎯 Resumo Rápido

```bash
# 1. Abrir novo terminal WSL
# 2. Verificar ambiente
adb version

# 3. Conectar dispositivo
./connect-android.sh

# 4. Executar app
npm start           # Terminal 1
npm run android     # Terminal 2
```

---

## 💡 Dicas

1. **Mantenha o IP salvo**: Após a primeira conexão, o IP fica salvo em `~/.android-device-ip`
2. **Conexão automática**: O script `connect-android.sh` tenta reconectar automaticamente
3. **Performance**: Se estiver lento, mova o projeto para `~/` ao invés de `/mnt/c/`
4. **Rede estável**: Use WiFi 5GHz para melhor performance
5. **Dispositivo sempre ativo**: Configure o celular para não dormir durante desenvolvimento

---

## 📚 Recursos Adicionais

- [React Native - Running on Device](https://reactnative.dev/docs/running-on-device)
- [ADB Wireless Debugging](https://developer.android.com/tools/adb#wireless)
- [WSL2 USB Support](https://learn.microsoft.com/en-us/windows/wsl/connect-usb)

---

**Configurado com ❤️ usando WSL2 + Cursor AI**

