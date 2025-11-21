# Passo 0: Instalação de Ferramentas Necessárias (Versão Leve)

## 📱 Método Leve: SDK Command Line Tools + Dispositivo Físico

Este guia usa a instalação **mínima** necessária, economizando recursos do seu PC.

### O que você vai precisar:
- PC com Windows
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

1. Acesse: **https://nodejs.org/**
2. Baixe a versão **LTS** (Long Term Support)
   - Versão recomendada: 18.x ou 20.x
3. Execute o instalador `.msi` baixado
4. Durante a instalação:
   - ✅ Aceite os termos de licença
   - ✅ Mantenha o caminho padrão de instalação
   - ✅ Marque "Automatically install the necessary tools" (se aparecer)
   - Clique em "Next" → "Install"
5. Aguarde a conclusão (2-3 minutos)

### Verificar instalação:

**Feche qualquer PowerShell aberto e abra um NOVO PowerShell:**

```powershell
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

1. Acesse: **https://adoptium.net/**
2. Configure o download:
   - Operating System: **Windows**
   - Architecture: **x64**
   - Package Type: **JDK**
   - Version: **17 (LTS)**
3. Clique em "Download" (arquivo .msi, ~180 MB)
4. Execute o instalador
5. Durante a instalação:
   - ✅ Marque "Set JAVA_HOME variable"
   - ✅ Marque "Add to PATH"
   - ✅ Marque "JavaSoft (Oracle) registry keys"
   - Clique em "Next" → "Install"

### Verificar instalação:

**Abra um NOVO PowerShell:**

```powershell
java -version
```

✅ **Resultado esperado:**
```
openjdk version "17.0.9" 2023-10-17
OpenJDK Runtime Environment Temurin-17.0.9+9 (build 17.0.9+9)
```

---

## 3. Instalação do Android SDK Command Line Tools

### Passo A: Baixar as ferramentas

1. Acesse: **https://developer.android.com/studio#command-tools**
2. Role para baixo até encontrar "Command line tools only"
3. Baixe: **commandlinetools-win-XXXXX_latest.zip** (~150 MB)
4. Arquivo baixado: geralmente vai para `C:\Users\SeuUsuario\Downloads\`

### Passo B: Criar estrutura de pastas

**Abra o PowerShell e execute:**

```powershell
# Criar pasta para o Android SDK
New-Item -ItemType Directory -Path "C:\Android" -Force
New-Item -ItemType Directory -Path "C:\Android\cmdline-tools" -Force
```

### Passo C: Extrair o arquivo

1. Vá até a pasta **Downloads**
2. Clique com botão direito no arquivo `commandlinetools-win-XXX_latest.zip`
3. Escolha "Extrair tudo..."
4. Extraia para uma pasta temporária

Você verá uma pasta `cmdline-tools` contendo:
```
cmdline-tools/
├── bin/
├── lib/
└── ...
```

5. **IMPORTANTE:** Renomeie essa pasta `cmdline-tools` para `latest`
6. Mova a pasta `latest` para dentro de `C:\Android\cmdline-tools\`

### Estrutura final deve ficar:

```
C:\Android\
└── cmdline-tools\
    └── latest\
        ├── bin\
        ├── lib\
        └── ...
```

---

## 4. Configurar Variáveis de Ambiente

### Passo A: Abrir configurações

1. Pressione `Windows + R`
2. Digite: `sysdm.cpl`
3. Pressione Enter
4. Vá para aba "Avançado"
5. Clique em "Variáveis de Ambiente..."

### Passo B: Criar ANDROID_HOME

Na seção **"Variáveis do sistema"** (parte inferior):

1. Clique em "Novo..."
2. Preencha:
   - **Nome da variável:** `ANDROID_HOME`
   - **Valor da variável:** `C:\Android`
3. Clique em "OK"

### Passo C: Atualizar PATH

Ainda em "Variáveis do sistema":

1. Encontre e selecione a variável `Path`
2. Clique em "Editar..."
3. Clique em "Novo" e adicione:
   ```
   C:\Android\cmdline-tools\latest\bin
   ```
4. Clique em "Novo" novamente e adicione:
   ```
   C:\Android\platform-tools
   ```
5. Clique em "OK" em todas as janelas

### Passo D: Verificar

**Feche TODOS os PowerShell e abra um NOVO como Administrador:**

```powershell
echo $env:ANDROID_HOME
```

✅ **Resultado esperado:** `C:\Android`

---

## 5. Instalar Componentes do Android SDK

### Aceitar licenças:

```powershell
sdkmanager --licenses
```

- Digite `y` e pressione Enter para cada licença
- Serão várias licenças, aceite todas

### Instalar platform-tools (inclui ADB):

```powershell
sdkmanager "platform-tools"
```

### Instalar Android Platform (API 34):

```powershell
sdkmanager "platforms;android-34"
```

### Instalar Build Tools:

```powershell
sdkmanager "build-tools;34.0.0"
```

### Verificar instalações:

```powershell
sdkmanager --list_installed
```

✅ **Você deve ver:**
```
build-tools;34.0.0
platform-tools
platforms;android-34
```

### Testar ADB:

**Feche e abra um NOVO PowerShell:**

```powershell
adb --version
```

✅ **Resultado esperado:**
```
Android Debug Bridge version 1.0.41
```

---

## 6. Preparar o Celular Android

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

No PowerShell:

```powershell
adb devices
```

✅ **Resultado esperado:**
```
List of devices attached
ABC123456789    device
```

O código será diferente, mas deve mostrar `device` ao lado.

---

## 7. Verificação Final - Checklist Completo

Execute cada comando e verifique:

```powershell
# 1. Node.js
node --version          # Deve mostrar: v20.x.x ou v18.x.x
npm --version           # Deve mostrar: 10.x.x ou superior
npx --version           # Deve mostrar: 10.x.x ou superior

# 2. Java
java -version           # Deve mostrar: openjdk version "17.0.x"

# 3. Android SDK
echo $env:ANDROID_HOME  # Deve mostrar: C:\Android

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
- [ ] Celular em modo desenvolvedor
- [ ] Depuração USB habilitada
- [ ] Celular reconhecido pelo ADB

---

## 🎉 Pronto!

Se todos os itens acima estão marcados, você está pronto para criar seu app React Native!

**Próximo passo:** Vá para `02-criando-projeto.md`

---

## 🔧 Solução de Problemas Comuns

### "sdkmanager não é reconhecido"
**Causa:** PATH não configurado ou terminal não foi reiniciado
**Solução:**
1. Verifique se o PATH tem: `C:\Android\cmdline-tools\latest\bin`
2. Feche TODOS os PowerShell
3. Abra um NOVO PowerShell
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

4. **Driver USB não instalado**
   ```powershell
   # Reinstalar driver
   adb kill-server
   adb start-server
   adb devices
   ```

5. **Firewall/Antivírus bloqueando**
   - Temporariamente desative o antivírus
   - Tente novamente

### "Error: ANDROID_HOME não está definido"
**Solução:**
1. Execute novamente o Passo 4
2. Reinicie o PowerShell
3. Se não funcionar, reinicie o PC

### Instalação do SDK falha
**Solução:**
```powershell
# Limpar e tentar novamente
Remove-Item -Recurse -Force C:\Android
# Recomece do Passo 3
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
