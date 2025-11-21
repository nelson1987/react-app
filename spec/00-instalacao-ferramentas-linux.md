# Passo 0: Instalação de Ferramentas Necessárias (Versão Leve - Linux)

## 📱 Método Leve: SDK Command Line Tools + Dispositivo Físico

Este guia usa a instalação **mínima** necessária, economizando recursos do seu PC Linux.

### O que você vai precisar:
- PC com Linux (Ubuntu/Debian ou derivados)
- Celular Android (para testar o app)
- Cabo USB
- Conexão com internet

### Espaço necessário:
- ~2 GB total (muito menos que Android Studio que precisa de 5-6 GB)

---

## 1. Instalação do Node.js

### O que é?
Node.js é o ambiente que executa JavaScript, essencial para React Native.

### Como instalar:

#### Método 1: Via NodeSource (Recomendado)

```bash
# Atualizar repositórios
sudo apt update

# Instalar curl (se não tiver)
sudo apt install -y curl

# Adicionar repositório do Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Instalar Node.js
sudo apt install -y nodejs
```

#### Método 2: Via apt padrão (pode ser versão antiga)

```bash
sudo apt update
sudo apt install -y nodejs npm
```

### Verificar instalação:

**Abra um novo terminal:**

```bash
node --version
npm --version
npx --version
```

✅ **Resultado esperado:**
```
v20.10.0
10.2.3
10.2.3
```

Os números podem variar, o importante é aparecer as versões.

---

## 2. Instalação do Java Development Kit (JDK)

### O que é?
JDK compila o código Java usado pelo Android.

### Como instalar:

#### Método 1: OpenJDK via apt (Mais fácil)

```bash
# Atualizar repositórios
sudo apt update

# Instalar OpenJDK 17
sudo apt install -y openjdk-17-jdk

# Configurar como padrão (se tiver múltiplas versões)
sudo update-alternatives --config java
```

#### Método 2: Adoptium Temurin (Alternativa)

```bash
# Instalar dependências
sudo apt install -y wget apt-transport-https

# Adicionar repositório Adoptium
wget -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | sudo apt-key add -
echo "deb https://packages.adoptium.net/artifactory/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/adoptium.list

# Instalar
sudo apt update
sudo apt install -y temurin-17-jdk
```

### Verificar instalação:

```bash
java -version
```

✅ **Resultado esperado:**
```
openjdk version "17.0.9" 2023-10-17
OpenJDK Runtime Environment (build 17.0.9+9)
```

---

## 3. Instalação do Android SDK Command Line Tools

### Passo A: Baixar as ferramentas

1. Acesse: **https://developer.android.com/studio#command-tools**
2. Role para baixo até encontrar "Command line tools only"
3. Baixe: **commandlinetools-linux-XXXXX_latest.zip** (~150 MB)
4. Arquivo baixado: geralmente vai para `~/Downloads/`

### Passo B: Criar estrutura de pastas

```bash
# Criar pasta para o Android SDK
mkdir -p ~/Android/Sdk/cmdline-tools
```

### Passo C: Extrair e configurar

```bash
# Ir para a pasta de Downloads
cd ~/Downloads

# Extrair o arquivo (substitua XXXXX pela versão baixada)
unzip commandlinetools-linux-*_latest.zip

# Mover para local correto
mv cmdline-tools ~/Android/Sdk/cmdline-tools/latest
```

### Estrutura final deve ficar:

```
~/Android/Sdk/
└── cmdline-tools/
    └── latest/
        ├── bin/
        ├── lib/
        └── ...
```

---

## 4. Configurar Variáveis de Ambiente

### Detectar seu shell:

```bash
echo $SHELL
```

- Se for `/bin/bash` → edite `~/.bashrc`
- Se for `/bin/zsh` → edite `~/.zshrc`

### Adicionar variáveis de ambiente:

Abra o arquivo de configuração do seu shell:

```bash
# Para bash
nano ~/.bashrc

# Para zsh
nano ~/.zshrc
```

Adicione estas linhas no **final do arquivo**:

```bash
# Android SDK
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
```

Salve o arquivo:
- **Nano:** Pressione `Ctrl + O`, depois `Enter`, depois `Ctrl + X`

### Recarregar configurações:

```bash
# Para bash
source ~/.bashrc

# Para zsh
source ~/.zshrc
```

### Verificar:

```bash
echo $ANDROID_HOME
```

✅ **Resultado esperado:** `/home/seu-usuario/Android/Sdk`

---

## 5. Instalar Componentes do Android SDK

### Aceitar licenças:

```bash
sdkmanager --licenses
```

- Digite `y` e pressione Enter para cada licença
- Serão várias licenças, aceite todas

### Instalar platform-tools (inclui ADB):

```bash
sdkmanager "platform-tools"
```

### Instalar Android Platform (API 34):

```bash
sdkmanager "platforms;android-34"
```

### Instalar Build Tools:

```bash
sdkmanager "build-tools;34.0.0"
```

### Verificar instalações:

```bash
sdkmanager --list_installed
```

✅ **Você deve ver:**
```
build-tools;34.0.0
platform-tools
platforms;android-34
```

### Testar ADB:

**Feche e abra um NOVO terminal:**

```bash
adb --version
```

✅ **Resultado esperado:**
```
Android Debug Bridge version 1.0.41
```

---

## 6. Configurar Regras USB (udev) para Android

### Por que é necessário?
No Linux, você precisa dar permissão para acessar dispositivos USB Android.

### Criar arquivo de regras udev:

```bash
# Criar arquivo de regras
sudo nano /etc/udev/rules.d/51-android.rules
```

### Adicionar regras comuns:

Cole este conteúdo no arquivo:

```
# Google
SUBSYSTEM=="usb", ATTR{idVendor}=="18d1", MODE="0666", GROUP="plugdev"
# Samsung
SUBSYSTEM=="usb", ATTR{idVendor}=="04e8", MODE="0666", GROUP="plugdev"
# Xiaomi
SUBSYSTEM=="usb", ATTR{idVendor}=="2717", MODE="0666", GROUP="plugdev"
# Motorola
SUBSYSTEM=="usb", ATTR{idVendor}=="22b8", MODE="0666", GROUP="plugdev"
# LG
SUBSYSTEM=="usb", ATTR{idVendor}=="1004", MODE="0666", GROUP="plugdev"
# Huawei
SUBSYSTEM=="usb", ATTR{idVendor}=="12d1", MODE="0666", GROUP="plugdev"
# OnePlus
SUBSYSTEM=="usb", ATTR{idVendor}=="2a70", MODE="0666", GROUP="plugdev"
# Asus
SUBSYSTEM=="usb", ATTR{idVendor}=="0b05", MODE="0666", GROUP="plugdev"
```

Salve o arquivo (Ctrl + O, Enter, Ctrl + X)

### Dar permissão e recarregar:

```bash
# Dar permissão ao arquivo
sudo chmod a+r /etc/udev/rules.d/51-android.rules

# Adicionar seu usuário ao grupo plugdev
sudo usermod -aG plugdev $USER

# Recarregar regras udev
sudo udevadm control --reload-rules
sudo udevadm trigger
```

**⚠️ Importante:** Faça logout e login novamente (ou reinicie) para as mudanças terem efeito.

---

## 7. Preparar o Celular Android

### Habilitar Modo Desenvolvedor:

1. No seu celular, vá em **Configurações**
2. Role até **"Sobre o telefone"** ou **"Sobre"**
3. Encontre **"Número da compilação"** ou **"Versão MIUI"** ou **"Número de compilação"**
4. **Toque 7 vezes** nessa opção
5. Você verá uma mensagem: "Você agora é um desenvolvedor!"

### Habilitar Depuração USB:

1. Volte para **Configurações**
2. Procure **"Opções do desenvolvedor"** ou **"Developer options"**
   - Pode estar em: Configurações → Sistema → Opções do desenvolvedor
3. Ative o botão **"Opções do desenvolvedor"** (no topo)
4. Ative **"Depuração USB"** ou **"USB debugging"**
5. Aceite o aviso que aparecer

### Conectar ao PC:

1. Conecte o celular ao PC usando o cabo USB
2. No celular, selecione o modo: **"Transferência de arquivos"** ou **"MTP"**
3. Deve aparecer uma mensagem no celular: **"Permitir depuração USB?"**
4. ✅ Marque "Sempre permitir neste computador"
5. Toque em "OK"

### Verificar conexão:

```bash
adb devices
```

✅ **Resultado esperado:**
```
List of devices attached
ABC123456789    device
```

O código será diferente, mas deve mostrar `device` ao lado.

---

## 8. Verificação Final - Checklist Completo

Execute cada comando e verifique:

```bash
# 1. Node.js
node --version          # Deve mostrar: v20.x.x ou v18.x.x
npm --version           # Deve mostrar: 10.x.x ou superior
npx --version           # Deve mostrar: 10.x.x ou superior

# 2. Java
java -version           # Deve mostrar: openjdk version "17.0.x"

# 3. Android SDK
echo $ANDROID_HOME      # Deve mostrar: /home/usuario/Android/Sdk

# 4. SDK Tools
sdkmanager --version    # Deve mostrar número de versão

# 5. ADB
adb --version           # Deve mostrar: Android Debug Bridge version

# 6. Dispositivo conectado
adb devices             # Deve mostrar seu celular com "device"
```

---

## ✅ Checklist de Sucesso

Marque cada item que funcionou:

- [ ] Node.js instalado e funcionando
- [ ] Java JDK instalado e funcionando
- [ ] Android SDK baixado e extraído
- [ ] ANDROID_HOME configurado
- [ ] PATH atualizado com comandos SDK
- [ ] platform-tools instalado (ADB funciona)
- [ ] Android Platform 34 instalado
- [ ] Build Tools instalado
- [ ] Regras udev configuradas
- [ ] Celular em modo desenvolvedor
- [ ] Depuração USB habilitada
- [ ] Celular reconhecido pelo ADB

---

## 🎉 Pronto!

Se todos os itens acima estão marcados, você está pronto para criar seu app React Native!

**Próximo passo:** Vá para `02-criando-projeto-linux.md`

---

## 🔧 Solução de Problemas Comuns

### "sdkmanager: command not found"
**Causa:** PATH não configurado ou terminal não foi reiniciado
**Solução:**
1. Verifique se o PATH tem: `$ANDROID_HOME/cmdline-tools/latest/bin`
2. Execute: `source ~/.bashrc` (ou `~/.zshrc`)
3. Feche e abra um novo terminal
4. Se não funcionar, reinicie o PC

### "adb devices" não mostra meu celular
**Possíveis causas e soluções:**

1. **Cabo USB ruim**
   - Tente outro cabo
   - Certifique-se que não é cabo apenas de carga

2. **Modo errado no celular**
   - No celular, puxe a barra de notificações
   - Toque em "USB" e selecione "Transferência de arquivos"

3. **Depuração USB não habilitada**
   - Verifique nas Opções do desenvolvedor
   - Desligue e ligue novamente

4. **Regras udev não configuradas**
   ```bash
   # Verificar se o dispositivo é detectado
   lsusb
   
   # Reiniciar ADB como root
   sudo adb kill-server
   sudo adb start-server
   adb devices
   ```

5. **Permissões de usuário**
   ```bash
   # Adicionar ao grupo plugdev
   sudo usermod -aG plugdev $USER
   
   # Logout e login novamente
   ```

### "Error: ANDROID_HOME não está definido"
**Solução:**
1. Execute novamente o Passo 4
2. Execute: `source ~/.bashrc` (ou `~/.zshrc`)
3. Feche e abra um novo terminal
4. Se não funcionar, reinicie o PC

### Instalação do SDK falha
**Solução:**
```bash
# Limpar e tentar novamente
rm -rf ~/Android
# Recomece do Passo 3
```

### Erro de permissão ao instalar pacotes npm
**Solução:**
```bash
# Nunca use sudo com npm!
# Configurar npm para usar pasta do usuário
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# Adicionar ao PATH no ~/.bashrc ou ~/.zshrc
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

## 📊 Comparação de Espaço em Disco

Você economizou:

| Componente | Com Android Studio | Sem Android Studio |
|------------|-------------------|-------------------|
| Android Studio | ~1.5 GB | ❌ 0 GB |
| Android SDK | ~3 GB | ~1.5 GB |
| Emulador + Imagens | ~2 GB | ❌ 0 GB |
| **TOTAL** | **~6.5 GB** | **~1.5 GB** |

💾 **Economia: ~5 GB!**

---

## 🐧 Dicas Específicas para Linux

### Performance
- ✅ Gradle compila **mais rápido** no Linux
- ✅ File watching é mais eficiente
- ✅ ADB funciona melhor que no Windows

### Ferramentas Úteis
```bash
# Ver logs do Android em tempo real
adb logcat

# Monitorar uso de CPU/RAM do dispositivo
adb shell top

# Screenshot
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png
```

### Atalhos para desenvolvimento
Adicione ao seu `~/.bashrc` ou `~/.zshrc`:

```bash
# Atalhos React Native
alias rn-android='npm run android'
alias rn-start='npm start'
alias rn-clean='cd android && ./gradlew clean && cd ..'
alias adb-restart='adb kill-server && adb start-server'
```

Recarregue: `source ~/.bashrc`

Agora você pode usar: `rn-android`, `rn-start`, etc.

