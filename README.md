# 📚 Guia Completo: React Native para Android (Versão Leve)

## 👋 Bem-vindo!

Este é um guia completo e detalhado para criar aplicativos React Native para Android **sem precisar do Android Studio**, perfeito para PCs com recursos limitados.

---

## 🖥️ Escolha Seu Sistema Operacional

**Este guia tem versões específicas para Windows e Linux!**

- 🪟 **Windows:** Use os arquivos sem sufixo (ex: `00-instalacao-ferramentas.md`)
- 🐧 **Linux:** Use os arquivos com sufixo `-linux` (ex: `00-instalacao-ferramentas-linux.md`)

Os documentos `03-estrutura-projeto.md` e `06-desenvolvimento.md` são **iguais para ambos** os sistemas operacionais.

---

## 📑 Índice dos Documentos

Siga os documentos nesta ordem:

### 🔧 Fase 1: Preparação (Fazer uma vez)

1. **[00-alternativas-instalacao.md](./spec/00-alternativas-instalacao.md)** | **[Linux](./spec/00-alternativas-instalacao-linux.md)**
   - Entenda as diferenças entre usar Android Studio ou não
   - Escolha qual método usar
   - **Você escolheu: SDK Command Line Tools (método leve)**

2. **[00-instalacao-ferramentas.md](./spec/00-instalacao-ferramentas.md)** | **[Linux](./spec/00-instalacao-ferramentas-linux.md)** ⭐ **COMECE AQUI**
   - Instalar Node.js
   - Instalar Java JDK
   - Instalar Android SDK Command Line Tools
   - Configurar variáveis de ambiente
   - Preparar celular Android
   - ⏱️ Tempo: 30-60 minutos

3. **[01-introducao.md](./spec/01-introducao.md)**
   - O que é React Native
   - Visão geral do guia
   - Pré-requisitos adicionais

### 🚀 Fase 2: Criando o Projeto

4. **[02-criando-projeto.md](./spec/02-criando-projeto.md)** | **[Linux](./spec/02-criando-projeto-linux.md)**
   - Comando para criar o projeto
   - Opções de versão
   - Estrutura inicial
   - Verificar instalação
   - ⏱️ Tempo: 5-10 minutos

### 📖 Fase 3: Entendendo o Projeto

5. **[03-estrutura-projeto.md](./spec/03-estrutura-projeto.md)** *(igual para Windows e Linux)*
   - Entender pastas e arquivos
   - Onde você vai programar
   - Arquivos de configuração
   - Como organizar o código
   - ⏱️ Tempo de leitura: 15 minutos

6. **[04-configuracao-android.md](./spec/04-configuracao-android.md)** | **[Linux](./spec/04-configuracao-android-linux.md)**
   - Configurar Gradle
   - Otimizar para PC lento
   - Adicionar permissões
   - Mudar nome do app
   - Fast Refresh
   - ⏱️ Tempo: 20 minutos

### 🎮 Fase 4: Executando e Desenvolvendo

7. **[05-executando-app.md](./spec/05-executando-app.md)** | **[Linux](./spec/05-executando-app-linux.md)** ⭐ **MOMENTO MÁGICO**
   - Executar o app no celular
   - Testar Fast Refresh
   - Menu de desenvolvimento
   - Debug e logs
   - Solução de problemas
   - ⏱️ Tempo: 10-30 minutos (primeira compilação)

8. **[06-desenvolvimento.md](./spec/06-desenvolvimento.md)** *(igual para Windows e Linux)*
   - Componentes básicos (View, Text, Button, etc.)
   - Estilização com StyleSheet
   - Estados (useState)
   - Navegação entre telas
   - Fazer requisições HTTP
   - Armazenar dados localmente
   - Exemplo completo: App de tarefas
   - ⏱️ Tempo: Leia conforme precisar

### 📦 Fase 5: Distribuindo o App

9. **[07-build-apk.md](./spec/07-build-apk.md)** | **[Linux](./spec/07-build-apk-linux.md)**
   - Gerar APK Debug (rápido)
   - Gerar APK Release (otimizado)
   - Criar keystore
   - Assinar o APK
   - Reduzir tamanho do APK
   - Mudar versão
   - Publicar na Play Store (AAB)
   - ⏱️ Tempo: 30-60 minutos

### 📝 Referência Rápida

10. **[08-resumo-completo.md](./spec/08-resumo-completo.md)** | **[Linux](./spec/08-resumo-completo-linux.md)** ⭐ **GUIA DE REFERÊNCIA**
    - Todos os comandos em um só lugar
    - Checklist completo
    - Solução rápida de problemas
    - Template de código
    - Use este documento quando você já souber o que fazer!

---

## 🎯 Roadmap do Seu Aprendizado

### Semana 1: Configuração
- [ ] Instalar todas as ferramentas (Dia 1-2)
- [ ] Criar primeiro projeto (Dia 3)
- [ ] Executar no celular (Dia 3-4)
- [ ] Entender estrutura de arquivos (Dia 5)
- [ ] Fazer pequenas modificações (Dia 6-7)

### Semana 2: Desenvolvimento Básico
- [ ] Criar interface simples
- [ ] Usar componentes básicos
- [ ] Estilizar com StyleSheet
- [ ] Usar estados (useState)
- [ ] Criar app de lista de tarefas

### Semana 3: Recursos Avançados
- [ ] Adicionar navegação entre telas
- [ ] Instalar bibliotecas externas
- [ ] Fazer requisições HTTP
- [ ] Armazenar dados localmente
- [ ] Adicionar ícones

### Semana 4: Distribuição
- [ ] Gerar APK de desenvolvimento
- [ ] Criar keystore
- [ ] Gerar APK de produção
- [ ] Testar em outros celulares
- [ ] Preparar para Play Store (opcional)

---

## 🚦 Por Onde Começar?

### Se você é TOTALMENTE NOVO:

1. **Escolha seu SO:** Windows ou Linux
2. Leia **00-instalacao-ferramentas.md** (ou `-linux.md`)
3. Instale tudo passo a passo
4. Vá para **02-criando-projeto.md** (ou `-linux.md`)
5. Continue na ordem até **05-executando-app.md** (ou `-linux.md`)
6. Quando o app rodar no celular, comemore! 🎉
7. Leia **06-desenvolvimento.md** conforme precisar (igual para ambos)
8. Use **08-resumo-completo.md** (ou `-linux.md`) como referência

### Se você JÁ TEM experiência com programação:

1. **Escolha seu SO:** Windows ou Linux
2. Leia **00-instalacao-ferramentas.md** (ou `-linux.md`) e instale as ferramentas
3. Pule para **08-resumo-completo.md** (ou `-linux.md`) para referência rápida
4. Crie o projeto: `npx react-native init MeuApp`
5. Execute: `npm run android` (Windows) ou `npm run android` após `chmod +x android/gradlew` (Linux)
6. Consulte os outros documentos quando precisar

### Se você ESTÁ VOLTANDO depois de um tempo:

1. **Escolha seu SO:** Windows ou Linux
2. Vá direto para **08-resumo-completo.md** (ou `-linux.md`)
3. Use como cola para comandos
4. Consulte documentos específicos se esquecer algo

---

## 💡 Dicas Importantes

### ✅ O que FAZER:

- Siga os passos na ordem
- Teste cada etapa antes de avançar
- Anote suas senhas (keystore)
- Salve seus arquivos importantes
- Experimente e faça testes
- Consulte a documentação quando tiver dúvidas

### ❌ O que NÃO fazer:

- Não pule a instalação das ferramentas
- Não ignore erros (resolva-os antes de continuar)
- Não modifique `node_modules/`
- Não perca seu arquivo keystore
- Não desista no primeiro erro
- Não tente fazer tudo de uma vez

---

## 🎓 Recursos Adicionais

### Documentação Oficial:
- React Native: https://reactnative.dev/
- React: https://react.dev/

### Bibliotecas Populares:
- React Navigation: https://reactnavigation.org/
- React Native Directory: https://reactnative.directory/

### Comunidades:
- Stack Overflow: https://stackoverflow.com/questions/tagged/react-native
- Reddit: https://www.reddit.com/r/reactnative/
- Discord: Reactiflux

### Canais YouTube (em português):
- Sujeito Programador
- Código Fonte TV
- Rocketseat

---

## 🆘 Precisa de Ajuda?

### Erro durante instalação?
→ Consulte **00-instalacao-ferramentas.md** (ou `-linux.md`) seção "Solução de Problemas"

### Erro ao criar projeto?
→ Consulte **02-criando-projeto.md** (ou `-linux.md`) seção "Solução de Problemas"

### App não compila?
→ Consulte **05-executando-app.md** (ou `-linux.md`) seção "Solução de Problemas"

### Não sabe como fazer algo?
→ Consulte **06-desenvolvimento.md** ou **08-resumo-completo.md** (ou `-linux.md`)

### Erro ao gerar APK?
→ Consulte **07-build-apk.md** (ou `-linux.md`) seção "Solução de Problemas"

---

## 📊 Especificações Técnicas Usadas

| Ferramenta | Versão Recomendada |
|-----------|-------------------|
| Node.js | 18.x ou 20.x LTS |
| Java JDK | 17 (LTS) |
| Android SDK | API 34 (Android 14) |
| Build Tools | 34.0.0 |
| React Native | Latest (0.73+) |
| Gradle | 8.x |

---

## 🎯 Objetivos Deste Guia

Ao completar este guia, você será capaz de:

- ✅ Instalar e configurar ambiente React Native (sem Android Studio)
- ✅ Criar projetos React Native do zero
- ✅ Desenvolver interfaces com componentes nativos
- ✅ Testar apps no seu celular físico
- ✅ Usar Fast Refresh para desenvolvimento rápido
- ✅ Instalar e usar bibliotecas externas
- ✅ Fazer requisições HTTP e armazenar dados
- ✅ Gerar APKs para distribuição
- ✅ Assinar APKs com keystore
- ✅ Resolver problemas comuns
- ✅ Publicar na Play Store (opcional)

---

## 📏 Convenções Usadas Neste Guia

### Blocos de código PowerShell:
```powershell
npm run android
```

### Blocos de código TypeScript/JavaScript:
```typescript
const [valor, setValor] = useState(0);
```

### Blocos de código XML/Gradle:
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### Símbolos:
- ⭐ = Muito importante
- ✅ = Recomendado / Correto
- ❌ = Não recomendado / Incorreto
- ⚠️ = Atenção / Cuidado
- 💡 = Dica
- 🔧 = Solução de problema
- ⏱️ = Tempo estimado
- 📱 = Relacionado ao celular
- 💾 = Relacionado a arquivos/código

---

## 🎊 Pronto para Começar!

Abra o arquivo **00-instalacao-ferramentas.md** e comece sua jornada!

Boa sorte e bons estudos! 🚀

---

## 📝 Sobre Este Guia

- **Criado:** Novembro 2024
- **Foco:** React Native para Android sem Android Studio
- **Nível:** Iniciante a Intermediário
- **Plataformas:** Windows 10/11 e Linux (Ubuntu/Debian)
- **Idioma:** Português (Brasil)
- **Objetivo:** Ensinar de forma prática e detalhada

**Última atualização:** Novembro 2024

---

## 🐧 Desenvolvendo no Linux

Este guia agora inclui **versões completas para Linux**! Se você usa Linux, aproveite os benefícios:

- ✅ **Builds 20-30% mais rápidos** que Windows
- ✅ **Menos problemas com permissões de arquivo**
- ✅ **Terminal bash/zsh mais poderoso**
- ✅ **ADB funciona melhor "out of the box"**
- ✅ **File watching mais eficiente**
- ✅ **Scripts de automação mais fáceis**

Siga os documentos com sufixo `-linux` para instruções específicas!

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
