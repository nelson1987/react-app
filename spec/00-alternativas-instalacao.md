# Alternativas de Instalação: Android Studio vs SDK Command Line Tools

## A pergunta: Preciso mesmo instalar o Android Studio?

**Resposta curta:** Não é obrigatório, mas é **altamente recomendado**, especialmente para iniciantes.

---

## O que você realmente precisa?

Para desenvolver apps React Native para Android, você precisa de:

### ✅ Obrigatórios:
1. **Node.js** - Para executar JavaScript
2. **JDK (Java)** - Para compilar código Android
3. **Android SDK** - Ferramentas de desenvolvimento Android
4. **Android SDK Platform-Tools** - Inclui o ADB (Android Debug Bridge)
5. **Android SDK Build-Tools** - Para compilar o app

### ❓ Opcionais:
- **Android Studio** - IDE completa (inclui tudo acima + emulador + interface gráfica)
- **Emulador Android** - Para testar sem dispositivo físico

---

## Opção 1: Instalar Android Studio (RECOMENDADO) ⭐

### Vantagens:
- ✅ **Mais fácil** - Tudo em um pacote
- ✅ **Interface gráfica** - SDK Manager visual
- ✅ **Emulador incluído** - Testa sem celular
- ✅ **Device Manager** - Gerencia dispositivos virtuais facilmente
- ✅ **Logcat visual** - Vê logs de forma amigável
- ✅ **Debugging avançado** - Ferramentas de depuração
- ✅ **Atualizações automáticas** - SDK sempre atualizado
- ✅ **Suporte oficial** - Documentação completa

### Desvantagens:
- ❌ **Grande** - ~1.5 GB de download + 4-5 GB instalado
- ❌ **Recursos** - Consome RAM e espaço em disco

### Ideal para:
- Iniciantes
- Quem não tem experiência com linha de comando
- Quem precisa de emulador
- Desenvolvimento profissional

---

## Opção 2: SDK Command Line Tools apenas (AVANÇADO)

### Como instalar:

#### 1. Baixar SDK Command Line Tools:
- Acesse: https://developer.android.com/studio#command-tools
- Baixe "Command line tools only" para Windows
- Extraia para: `C:\Android\cmdline-tools\latest\`

#### 2. Configurar variáveis de ambiente:
```powershell
# Definir ANDROID_HOME
setx ANDROID_HOME "C:\Android" /M

# Adicionar ao PATH
setx PATH "%PATH%;%ANDROID_HOME%\cmdline-tools\latest\bin;%ANDROID_HOME%\platform-tools" /M
```

#### 3. Instalar componentes via linha de comando:

**Feche e abra um novo PowerShell como Administrador:**

```powershell
# Aceitar licenças
sdkmanager --licenses

# Instalar plataforma Android
sdkmanager "platform-tools" "platforms;android-34"

# Instalar build-tools
sdkmanager "build-tools;34.0.0"

# Listar pacotes instalados
sdkmanager --list_installed
```

### Vantagens:
- ✅ **Leve** - Muito menos espaço em disco
- ✅ **Rápido** - Instalação mais rápida
- ✅ **Controle total** - Instala apenas o necessário

### Desvantagens:
- ❌ **Complexo** - Requer conhecimento de linha de comando
- ❌ **Sem emulador fácil** - Mais difícil de configurar
- ❌ **Sem interface gráfica** - Tudo via terminal
- ❌ **Sem ferramentas visuais** - Debugging mais difícil

### Ideal para:
- Usuários avançados
- Quem tem dispositivo físico Android
- Servidores CI/CD
- Ambiente com recursos limitados

---

## Opção 3: Híbrida (SDK Tools + Dispositivo Físico) ⚡

### Cenário:
Você tem um celular Android e quer testar apenas nele, sem emulador.

### O que instalar:
1. **Node.js** ✅
2. **JDK** ✅
3. **Android SDK Command Line Tools** ✅ (Opção 2)
4. **Habilitar USB Debugging no celular** ✅

### Como habilitar USB Debugging:

#### No seu celular Android:
1. Vá em **Configurações** → **Sobre o telefone**
2. Toque 7 vezes em "Número da compilação" ou "Versão do MIUI/One UI"
3. Volte e entre em **Opções do desenvolvedor**
4. Ative **Depuração USB**
5. Conecte o celular ao PC via USB
6. Aceite a mensagem de "Permitir depuração USB"

#### Verificar conexão:
```powershell
adb devices
```

Você deve ver seu dispositivo listado.

### Vantagens:
- ✅ **Teste real** - Vê como funciona no dispositivo real
- ✅ **Performance real** - Sem limitações do emulador
- ✅ **Menos espaço** - Não precisa de emulador

### Desvantagens:
- ❌ **Celular necessário** - Precisa estar sempre conectado
- ❌ **Cabo USB** - Dependência física

---

## Comparação Rápida

| Característica | Android Studio | SDK Tools Apenas | Híbrida |
|---------------|----------------|------------------|---------|
| Tamanho | 5-6 GB | ~500 MB | ~500 MB |
| Dificuldade | Fácil ⭐ | Difícil ⭐⭐⭐ | Média ⭐⭐ |
| Emulador | ✅ Sim | ❌ Não* | ❌ Não |
| Interface Gráfica | ✅ Sim | ❌ Não | ❌ Não |
| Ideal para iniciante | ✅ Sim | ❌ Não | ⚠️ Talvez |
| Requer celular | ❌ Não | ⚠️ Recomendado | ✅ Sim |

\* É possível configurar emulador via linha de comando, mas é complexo

---

## Minha Recomendação

### Para você:

Se você está começando com React Native e quer aprender:
- **Use Android Studio** (Opção 1)
- É mais fácil, tem interface gráfica, e você pode usar emulador

Depois que você ganhar experiência:
- Você pode desinstalar o Android Studio
- Manter apenas o SDK que ficou instalado
- Usar apenas dispositivo físico

---

## Como testar APENAS no celular físico (sem emulador)

Se você decidir não usar emulador, siga estes passos:

### 1. Instalar ferramentas mínimas:
- Node.js (obrigatório)
- JDK (obrigatório)
- Android SDK via Command Line Tools OU Android Studio

### 2. Preparar o celular:
```
Configurações → Sobre o telefone → Tocar 7x em "Número da compilação"
→ Voltar → Opções do desenvolvedor → Ativar "Depuração USB"
```

### 3. Conectar celular ao PC:
- Conecte via cabo USB
- Selecione "Transferência de arquivos" ou "MTP"
- Aceite permissão de depuração USB no celular

### 4. Verificar conexão:
```powershell
adb devices
```

### 5. Executar o app:
```powershell
npm run android
```

O app será instalado diretamente no seu celular!

---

## Decisão Final

**Para este tutorial, vou assumir que você está usando a Opção 1 (Android Studio)**, pois é mais amigável para iniciantes.

Se você quiser usar outra opção, me avise e adapto a documentação!

---

## Próximos passos

- Se vai usar **Android Studio**: Continue com `00-instalacao-ferramentas.md`
- Se vai usar **SDK Tools apenas**: Use a Opção 2 deste documento
- Se tem dúvidas: Pergunte!

---

## 💡 Dica Pro

Muitos desenvolvedores começam com Android Studio e depois de dominarem React Native, migram para SDK Tools + dispositivo físico para economizar recursos.

Você pode fazer essa transição quando quiser!

