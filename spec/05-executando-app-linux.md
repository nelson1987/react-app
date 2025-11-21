# Passo 5: Executando o App no Celular Android (Linux)

## 🚀 Finalmente! Vamos rodar o app no seu celular!

---

## Pré-requisitos

Antes de continuar, certifique-se:

- [ ] Completou **todos** os passos anteriores
- [ ] Celular conectado via USB
- [ ] Depuração USB habilitada
- [ ] Regras udev configuradas (específico Linux)
- [ ] Comando `adb devices` mostra seu dispositivo

---

## Método 1: Comando Único (Recomendado)

### Execute este comando na pasta do projeto:

```bash
npm run android
```

### O que acontece:

1. **Metro Bundler** inicia (servidor de desenvolvimento)
2. **Gradle** compila o app Android
3. **APK de desenvolvimento** é gerado
4. **App é instalado** no seu celular automaticamente
5. **App abre** no celular
6. Você vê a tela inicial do React Native! 🎉

⏱️ **Tempo da primeira execução:** 3-10 minutos (compilação completa)

⏱️ **Execuções seguintes:** 30 segundos a 2 minutos

💡 **Nota:** No Linux, geralmente é mais rápido que no Windows!

---

## Método 2: Passo a Passo (Entender o processo)

### Passo A: Iniciar o Metro Bundler

**Terminal 1** (deixe aberto):

```bash
npm start
```

ou

```bash
npx react-native start
```

Você verá:

```
               ######                ######
             ###     ####        ####     ###
            ##          ###    ###          ##
            ##             ####             ##
            ##             ####             ##
            ##           ##    ##           ##
            ##         ###      ###         ##
             ##  ####                  #### ##
              #######                #######

               Welcome to Metro v0.76.0
              Fast - Scalable - Integrated
```

**✅ Mantenha este terminal aberto!**

### Passo B: Instalar e Executar no Android

**Terminal 2** (novo terminal):

```bash
# Abra novo terminal (Ctrl + Shift + T)
cd ~/projetos/native-app/NativeApp

npx react-native run-android
```

---

## Durante a Primeira Execução

### Você verá várias mensagens:

```
info Running jetifier to migrate libraries to AndroidX.
info Starting JS server...
info Installing the app...

> Task :app:checkDebugAarMetadata
> Task :app:compileDebugJavaWithJavac
> Task :app:mergeDebugResources
> Task :app:processDebugManifest
> Task :app:installDebug

BUILD SUCCESSFUL in 3m 45s
```

### No celular:

1. Tela ficará branca por alguns segundos
2. Aparecerá "Loading..."
3. App abre com a tela inicial! 🎊

---

## Tela Inicial do React Native

Você verá algo assim no celular:

```
┌──────────────────────┐
│                      │
│    [React Logo]      │
│                      │
│   Edit App.tsx and   │
│   shake or press     │
│   menu button for    │
│   Developer menu     │
│                      │
└──────────────────────┘
```

---

## Testar o Fast Refresh (Recarga Rápida)

### Vamos fazer uma mudança e ver ao vivo!

1. **Abra o arquivo:** `NativeApp/App.tsx`

```bash
# VSCode
code App.tsx

# Nano
nano App.tsx

# Vim
vim App.tsx
```

2. **Encontre esta linha:**
```typescript
<Text>Edit App.tsx</Text>
```

3. **Mude para:**
```typescript
<Text>Olá, meu primeiro app! 🎉</Text>
```

4. **Salve o arquivo** (Ctrl + S)

5. **Olhe para o celular:**
   - Em 1-2 segundos, o texto muda automaticamente!
   - Sem recompilar, sem reinstalar! ⚡

**Isso é o Fast Refresh em ação!**

---

## Menu de Desenvolvimento

### Como abrir:

**Método 1:** Agite o celular (literalmente!) 📱

**Método 2:** Via terminal:

```bash
adb shell input keyevent 82
```

**Método 3:** No terminal do Metro, pressione `d`

### Opções do menu:

```
┌─────────────────────────────┐
│  Reload                     │  ← Recarregar app
│  Enable Fast Refresh        │  ← Recarga automática
│  Toggle Inspector           │  ← Inspecionar elementos
│  Toggle Performance Monitor │  ← Ver FPS e memória
│  Debug                      │  ← Abrir debugger
│  Change Bundle Location     │  ← Mudar servidor
│  Settings                   │  ← Configurações
│  Cancel                     │  ← Fechar menu
└─────────────────────────────┘
```

### Opções recomendadas para ativar:

✅ **Enable Fast Refresh** - Recarga automática ao salvar  
✅ **Toggle Performance Monitor** - Ver performance do app

---

## Atalhos do Metro Bundler

Quando o Metro está rodando no terminal, você pode pressionar:

| Tecla | Ação |
|-------|------|
| `r` | Recarregar o app |
| `d` | Abrir menu de desenvolvedor no dispositivo |
| `i` | Rodar no iOS (não funciona no Linux) |
| `a` | Rodar no Android |
| `j` | Abrir debugger |
| `?` | Mostrar todos os atalhos |

---

## Debugar o App

### Método 1: Console.log no Metro

No seu `App.tsx`:

```typescript
function App(): JSX.Element {
  console.log('App iniciado!');
  console.log('Teste de log');
  
  return (
    <SafeAreaView>
      <Text>Olá!</Text>
    </SafeAreaView>
  );
}
```

**Onde ver:** No terminal do Metro Bundler!

```
LOG  App iniciado!
LOG  Teste de log
```

### Método 2: Chrome DevTools

1. Abra o menu de desenvolvimento no celular
2. Toque em **"Debug"**
3. Abre automaticamente: `http://localhost:8081/debugger-ui/`
4. Abra **DevTools** no Chrome/Firefox (F12)
5. Console mostra os logs!

### Método 3: Logcat do Android (Linux específico)

```bash
# Ver todos os logs em tempo real
adb logcat

# Filtrar apenas logs do React Native
adb logcat | grep -i "ReactNative"

# Filtrar apenas erros
adb logcat *:E

# Salvar logs em arquivo
adb logcat > logs.txt
```

---

## Parar a Execução

### Parar o app no celular:
- Feche o app normalmente (botão de fechar/recentes)

### Parar o Metro Bundler:
- No terminal do Metro, pressione **Ctrl + C**

### Desinstalar o app do celular:
```bash
adb uninstall com.nativeapp
```

(substitua `com.nativeapp` pelo seu applicationId)

---

## Executar Novamente

Depois da primeira vez, execute apenas:

```bash
npm run android
```

Será **muito mais rápido** (30s - 2min) porque:
- Gradle usa cache
- Dependências já estão compiladas
- Só recompila o que mudou

💡 **No Linux, builds incrementais são ainda mais rápidos!**

---

## 🔧 Solução de Problemas

### Erro: "Could not connect to development server"

**Causa:** Metro Bundler não está rodando

**Solução:**
```bash
npm start
```

### Erro: "app:installDebug FAILED"

**Causa:** Dispositivo não reconhecido ou desconectado

**Solução:**
```bash
adb devices          # Verificar conexão
adb kill-server      # Reiniciar ADB
adb start-server
adb devices
```

### Erro: "SDK location not found"

**Causa:** ANDROID_HOME não configurado

**Solução:**
```bash
echo $ANDROID_HOME    # Deve mostrar: /home/usuario/Android/Sdk
```

Se não mostrar, volte para `00-instalacao-ferramentas-linux.md` passo 4.

Adicione ao `~/.bashrc`:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Depois:

```bash
source ~/.bashrc
```

### App não atualiza com Fast Refresh

**Solução:**
1. Agite o celular
2. Abra o menu de desenvolvimento
3. Ative "Enable Fast Refresh"
4. Toque em "Reload"

### Tela branca no app

**Solução:**
```bash
# Limpar cache e reinstalar
npx react-native start --reset-cache

# Em outro terminal
npm run android
```

### Erro de memória do Gradle

**Causa:** PC com pouca RAM

**Solução:** Edite `android/gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx1536m -XX:MaxMetaspaceSize=512m
```

### Build muito lento

**Soluções:**

1. **Feche programas pesados** (Chrome com muitas abas, navegador, etc.)

2. **Use o cache do Gradle:**
```properties
# Em android/gradle.properties
org.gradle.caching=true
org.gradle.parallel=true
```

3. **Compile menos vezes:** Use Fast Refresh ao invés de recompilar

### Erro: "Permission denied" ao executar gradlew

```bash
chmod +x android/gradlew
```

### Dispositivo não aparece no ADB (específico Linux)

**Causa:** Regras udev não configuradas

**Solução:**

```bash
# Verificar se arquivo existe
ls -la /etc/udev/rules.d/51-android.rules

# Se não existir, criar
sudo nano /etc/udev/rules.d/51-android.rules

# Adicionar regras (exemplo para vários fabricantes)
SUBSYSTEM=="usb", ATTR{idVendor}=="18d1", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTR{idVendor}=="04e8", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTR{idVendor}=="2717", MODE="0666", GROUP="plugdev"

# Salvar e recarregar
sudo chmod a+r /etc/udev/rules.d/51-android.rules
sudo usermod -aG plugdev $USER
sudo udevadm control --reload-rules
sudo udevadm trigger

# Reconectar celular e verificar
adb devices
```

---

## 📊 Monitorar Performance

### Ver uso de recursos do app:

No menu de desenvolvimento:
- Ative **"Toggle Performance Monitor"**

Mostrará:
- **RAM**: Memória usada
- **JS Heap**: Memória JavaScript
- **Views**: Número de componentes
- **FPS**: Frames por segundo (idealmente 60 FPS)

### Monitorar via terminal (Linux específico):

```bash
# CPU e memória do app
adb shell top | grep com.nativeapp

# Uso de memória detalhado
adb shell dumpsys meminfo com.nativeapp

# FPS em tempo real
adb shell dumpsys gfxinfo com.nativeapp
```

---

## 🎯 Fluxo de Trabalho Diário

Quando você voltar a trabalhar no projeto:

```bash
# 1. Conectar celular via USB

# 2. Verificar conexão
adb devices

# 3. Entrar na pasta do projeto
cd ~/projetos/native-app/NativeApp

# 4. Executar
npm run android

# 5. Desenvolver! 🚀
# Edite App.tsx, salve, veja mudanças instantâneas!
```

---

## 🐧 Dicas Específicas para Linux

### Atalhos úteis no bashrc/zshrc

Adicione ao `~/.bashrc` ou `~/.zshrc`:

```bash
# Atalhos React Native
alias rn-run='npm run android'
alias rn-start='npm start'
alias rn-menu='adb shell input keyevent 82'
alias rn-reload='adb shell input text "RR"'
alias rn-devices='adb devices'
alias rn-logs='adb logcat | grep -i "ReactNative"'
alias rn-clean='cd android && ./gradlew clean && cd .. && npm start -- --reset-cache'
```

Depois: `source ~/.bashrc`

Agora use: `rn-run`, `rn-menu`, `rn-logs`, etc.

### Abrir múltiplos terminais

```bash
# Terminal 1: Metro Bundler
npm start

# Terminal 2: Logs do Android (Ctrl + Shift + T)
adb logcat | grep -i "ReactNative"

# Terminal 3: Comandos diversos
adb shell input keyevent 82  # Abrir menu dev
```

### Screenshot do app via terminal

```bash
# Tirar screenshot
adb shell screencap -p /sdcard/screenshot.png

# Baixar para PC
adb pull /sdcard/screenshot.png ~/Pictures/

# Ver imagem
xdg-open ~/Pictures/screenshot.png
```

### Gravar vídeo do app

```bash
# Começar gravação (pressione Ctrl+C para parar)
adb shell screenrecord /sdcard/demo.mp4

# Baixar vídeo
adb pull /sdcard/demo.mp4 ~/Videos/

# Assistir
xdg-open ~/Videos/demo.mp4
```

### Reverter porta (se tiver problemas de conexão)

```bash
adb reverse tcp:8081 tcp:8081
```

---

## ✅ Checklist de Sucesso

- [ ] Executei `npm run android` com sucesso
- [ ] App instalou no meu celular
- [ ] App abriu e vi a tela inicial
- [ ] Modifiquei App.tsx e Fast Refresh funcionou
- [ ] Consegui abrir o menu de desenvolvimento
- [ ] Console.log aparece no terminal do Metro
- [ ] Sei como parar e executar novamente

---

## 🎊 Parabéns!

Seu app React Native está rodando no celular!

**Próximo passo:** Vá para **06-desenvolvimento.md** (use a versão Windows, código é igual) para aprender a criar interfaces e funcionalidades!

Depois vá para **07-build-apk-linux.md** para gerar APK de produção!

---

## 💡 Performance no Linux

Você deve notar que no Linux:

- ✅ **Gradle compila mais rápido** (20-30% mais rápido)
- ✅ **Hot Reload é mais instantâneo**
- ✅ **Menos uso de RAM** durante desenvolvimento
- ✅ **ADB funciona melhor** (menos problemas de conexão)
- ✅ **Terminal é mais poderoso** (comandos avançados)

Você fez uma ótima escolha ao usar Linux! 🐧🚀

