# NativeApp - React Native Application

> Aplicativo React Native multiplataforma desenvolvido com TypeScript, suportando Android e iOS.

## 📋 Overview do Projeto

Este é um projeto **React Native** moderno, criado com `@react-native-community/cli` e configurado com TypeScript. O aplicativo utiliza as melhores práticas de desenvolvimento mobile e está otimizado para desenvolvimento com **Cursor AI**.

### 🎯 Características Principais

- **React Native 0.82.1** - Framework para desenvolvimento mobile cross-platform
- **React 19.1.1** - Biblioteca UI mais recente
- **TypeScript 5.8.3** - Tipagem estática para maior segurança e produtividade
- **Safe Area Context** - Gerenciamento inteligente de áreas seguras (notch, status bar, etc)
- **ESLint & Prettier** - Código consistente e padronizado
- **Jest** - Framework de testes unitários completo
- **Metro Bundler** - Bundler otimizado para React Native

### 📦 Estrutura do Projeto

```
react-app/
├── android/              # Código nativo Android (Kotlin)
├── ios/                  # Código nativo iOS (Swift)
├── __tests__/           # Testes automatizados
├── spec/                # Documentação detalhada do projeto
├── App.tsx              # Componente raiz da aplicação
├── index.js             # Entry point da aplicação
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configuração TypeScript
├── babel.config.js      # Configuração Babel
├── metro.config.js      # Configuração Metro Bundler
└── jest.config.js       # Configuração de testes
```

### 🛠️ Stack Tecnológica

| Tecnologia | Versão | Propósito |
|-----------|--------|-----------|
| Node.js | ≥20 | Runtime JavaScript |
| React Native | 0.82.1 | Framework mobile |
| React | 19.1.1 | Biblioteca UI |
| TypeScript | 5.8.3 | Tipagem estática |
| Kotlin | - | Código nativo Android |
| Swift | - | Código nativo iOS |

## 🚀 Começando

### Pré-requisitos

Certifique-se de ter o ambiente configurado corretamente:

- **Node.js** ≥20
- **JDK 17** (para Android)
- **Android Studio** (para desenvolvimento Android)
- **Xcode** (para desenvolvimento iOS - apenas macOS)
- **CocoaPods** (para dependências iOS)

> **Nota**: Consulte o [guia de configuração de ambiente](https://reactnative.dev/docs/set-up-your-environment) oficial para instruções detalhadas.

### 📚 Documentação Completa

Este projeto possui documentação detalhada na pasta `spec/`:

- **Windows**: Guias de instalação e configuração
- **Linux**: Versões específicas para ambiente Linux
- Tópicos incluem: instalação, criação de projeto, estrutura, configuração Android, execução, desenvolvimento e build

### Instalação

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd react-app
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure iOS (apenas macOS)**

```bash
# Instalar bundler Ruby (primeira vez apenas)
bundle install

# Instalar pods
cd ios && bundle exec pod install && cd ..
```

## 🎮 Scripts Disponíveis

### Desenvolvimento

```bash
# Iniciar Metro Bundler
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar testes
npm test

# Lint do código
npm run lint
```

### Build de Produção

Consulte a documentação em `spec/07-build-apk.md` para instruções detalhadas sobre geração de APK/AAB para produção.

## 🔧 Desenvolvimento

### Fast Refresh

O projeto está configurado com **Fast Refresh**, permitindo que alterações no código sejam refletidas instantaneamente no aplicativo sem perder o estado.

### Reload Manual

- **Android**: <kbd>R</kbd> duas vezes ou <kbd>Ctrl</kbd> + <kbd>M</kbd> → Reload
- **iOS**: <kbd>Cmd ⌘</kbd> + <kbd>R</kbd>

### Debug Menu

- **Android**: <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) ou <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS)
- **iOS**: <kbd>Cmd ⌘</kbd> + <kbd>D</kbd>

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm test -- --watch

# Gerar coverage
npm test -- --coverage
```

## 📝 Estrutura do App.tsx

O componente principal utiliza:

- **SafeAreaProvider**: Gerenciamento de áreas seguras
- **useColorScheme**: Detecção de tema claro/escuro
- **StatusBar**: Customização da barra de status
- **NewAppScreen**: Template inicial do React Native

## 🔐 Configurações de Segurança

### Android

- Keystore de debug incluído para desenvolvimento
- ProGuard configurado para builds de release
- Permissões declaradas no `AndroidManifest.xml`

### iOS

- Privacy Info configurado (`PrivacyInfo.xcprivacy`)
- Configurações de segurança no `Info.plist`

## 🤖 Desenvolvimento com Cursor AI

Este projeto está otimizado para uso com o Cursor AI:

- `.gitignore` configurado para ignorar arquivos específicos do Cursor
- Estrutura de código limpa e bem documentada
- TypeScript para melhor autocompleção e sugestões da IA
- Comentários JSDoc quando necessário

## 🐛 Troubleshooting

### Problemas Comuns

**Metro Bundler não inicia:**
```bash
npx react-native start --reset-cache
```

**Erro de build no Android:**
```bash
cd android && ./gradlew clean && cd ..
```

**Erro de pods no iOS:**
```bash
cd ios && bundle exec pod deintegrate && bundle exec pod install && cd ..
```

**Erro de permissões:**
```bash
# Linux/Mac
chmod +x android/gradlew
```

## 📖 Recursos Adicionais

- [React Native Documentation](https://reactnative.dev)
- [React Native Community](https://github.com/react-native-community)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [React Documentation](https://react.dev)

## 📄 Licença

Este projeto é privado.

## 👥 Contribuindo

Consulte os guias na pasta `spec/` para convenções de código e melhores práticas.

---

**Desenvolvido com ❤️ usando React Native e Cursor AI**
