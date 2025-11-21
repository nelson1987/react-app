# Passo 5: Executando o App no Celular Android

## 🚀 Finalmente! Vamos rodar o app no seu celular!

---

## Pré-requisitos

Antes de continuar, certifique-se:

- [ ] Completou **todos** os passos anteriores
- [ ] Celular conectado via USB
- [ ] Depuração USB habilitada
- [ ] Comando `adb devices` mostra seu dispositivo

---

## Método 1: Comando Único (Recomendado)

### Execute este comando na pasta do projeto:

```powershell
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

---

## Método 2: Passo a Passo (Entender o processo)

### Passo A: Iniciar o Metro Bundler

**Terminal 1** (deixe aberto):

```powershell
npm start
```

ou

```powershell
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

**Terminal 2** (novo PowerShell):

```powershell
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

**Método 2:** No terminal, pressione `d` (com Metro rodando)

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
| `i` | Rodar no iOS (não funciona no Windows) |
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
4. Abra **DevTools** no Chrome (F12)
5. Console mostra os logs!

---

## Parar a Execução

### Parar o app no celular:
- Feche o app normalmente (botão de fechar/recentes)

### Parar o Metro Bundler:
- No terminal do Metro, pressione **Ctrl + C**

### Desinstalar o app do celular:
```powershell
adb uninstall com.nativeapp
```

(substitua `com.nativeapp` pelo seu applicationId)

---

## Executar Novamente

Depois da primeira vez, execute apenas:

```powershell
npm run android
```

Será **muito mais rápido** (30s - 2min) porque:
- Gradle usa cache
- Dependências já estão compiladas
- Só recompila o que mudou

---

## 🔧 Solução de Problemas

### Erro: "Could not connect to development server"

**Causa:** Metro Bundler não está rodando

**Solução:**
```powershell
npm start
```

### Erro: "app:installDebug FAILED"

**Causa:** Dispositivo não reconhecido ou desconectado

**Solução:**
```powershell
adb devices          # Verificar conexão
adb kill-server      # Reiniciar ADB
adb start-server
```

### Erro: "SDK location not found"

**Causa:** ANDROID_HOME não configurado

**Solução:**
```powershell
echo $env:ANDROID_HOME    # Deve mostrar: C:\Android
```

Se não mostrar, volte para `00-instalacao-ferramentas.md` passo 4.

### App não atualiza com Fast Refresh

**Solução:**
1. Agite o celular
2. Abra o menu de desenvolvimento
3. Ative "Enable Fast Refresh"
4. Toque em "Reload"

### Tela branca no app

**Solução:**
```powershell
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

1. **Feche programas pesados** (Chrome, jogos, etc.)

2. **Use o cache do Gradle:**
```properties
# Em android/gradle.properties
org.gradle.caching=true
```

3. **Compile menos vezes:** Use Fast Refresh ao invés de recompilar

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

---

## 🎯 Fluxo de Trabalho Diário

Quando você voltar a trabalhar no projeto:

```powershell
# 1. Conectar celular via USB

# 2. Verificar conexão
adb devices

# 3. Entrar na pasta do projeto
cd C:\git\native-app\NativeApp

# 4. Executar
npm run android

# 5. Desenvolver! 🚀
# Edite App.tsx, salve, veja mudanças instantâneas!
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

**Próximo passo:** Vá para **06-desenvolvimento.md** para aprender a criar interfaces e funcionalidades!

