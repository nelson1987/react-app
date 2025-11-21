# Passo 3: Entendendo a Estrutura do Projeto React Native

## 📁 Visão Geral da Estrutura

Após criar o projeto com `npx react-native init NativeApp`, você terá esta estrutura:

```
NativeApp/
├── android/                    # Código nativo Android (Java/Kotlin)
├── ios/                        # Código nativo iOS (Objective-C/Swift)
├── node_modules/               # Dependências instaladas
├── __tests__/                  # Testes automatizados
├── .bundle/                    # Configurações do bundler
├── App.tsx                     # ⭐ Componente principal do app
├── app.json                    # Configurações do app
├── babel.config.js             # Configuração do Babel
├── index.js                    # Ponto de entrada
├── metro.config.js             # Configuração do Metro bundler
├── package.json                # Dependências e scripts npm
├── tsconfig.json               # Configuração TypeScript
├── .gitignore                  # Arquivos ignorados pelo Git
├── .prettierrc.js              # Configuração do Prettier
├── .eslintrc.js                # Configuração do ESLint
└── README.md                   # Documentação do projeto
```

---

## 🔍 Arquivos Principais (Você vai editar estes)

### 1. **App.tsx** - Componente Principal

Este é o coração do seu aplicativo. Todo o código visual começa aqui.

**Localização:** `NativeApp/App.tsx`

**Conteúdo inicial:**
```typescript
import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Olá, React Native!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
```

**É aqui que você vai:**
- Criar a interface do seu app
- Adicionar telas
- Implementar funcionalidades

---

### 2. **index.js** - Ponto de Entrada

Este arquivo registra seu componente App no React Native.

**Localização:** `NativeApp/index.js`

**Conteúdo:**
```javascript
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

**⚠️ Geralmente você NÃO precisa mexer neste arquivo.**

---

### 3. **app.json** - Configurações do App

Define o nome e configurações básicas do aplicativo.

**Localização:** `NativeApp/app.json`

**Conteúdo:**
```json
{
  "name": "NativeApp",
  "displayName": "NativeApp"
}
```

**Campos:**
- `name`: Nome técnico (usado internamente)
- `displayName`: Nome exibido no celular

**Para mudar o nome do app no celular:**
```json
{
  "name": "NativeApp",
  "displayName": "Meu App Incrível"
}
```

---

### 4. **package.json** - Dependências e Scripts

Gerencia as bibliotecas e comandos do projeto.

**Localização:** `NativeApp/package.json`

**Seção importante - Scripts:**
```json
{
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint ."
  }
}
```

**Como usar:**
```powershell
npm run android    # Executar no Android
npm start          # Iniciar o Metro bundler
npm test           # Rodar testes
npm run lint       # Verificar código
```

---

## 📂 Pasta `android/` - Código Nativo Android

Esta pasta contém o projeto Android nativo. Você raramente precisará mexer aqui.

### Estrutura importante:

```
android/
├── app/
│   ├── build.gradle              # ⭐ Configurações do app
│   └── src/
│       └── main/
│           ├── AndroidManifest.xml   # ⭐ Permissões e config
│           ├── java/              # Código Java/Kotlin
│           └── res/               # Recursos (ícones, strings)
│               ├── mipmap-*/      # Ícones do app
│               └── values/
│                   └── strings.xml    # Nome do app
├── build.gradle                  # Config do projeto
├── gradle.properties             # Propriedades do Gradle
└── settings.gradle               # Configurações de módulos
```

### Arquivos que você pode precisar editar:

#### **AndroidManifest.xml**
**Caminho:** `android/app/src/main/AndroidManifest.xml`

**Para que serve:** Define permissões e configurações do app Android.

**Exemplo - Adicionar permissão de internet:**
```xml
<manifest>
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    
    <application>
        ...
    </application>
</manifest>
```

#### **strings.xml**
**Caminho:** `android/app/src/main/res/values/strings.xml`

**Para que serve:** Define o nome do app exibido no Android.

```xml
<resources>
    <string name="app_name">Meu App</string>
</resources>
```

#### **build.gradle (app)**
**Caminho:** `android/app/build.gradle`

**Para que serve:** Configurações de build, versão do app, etc.

```gradle
android {
    defaultConfig {
        applicationId "com.nativeapp"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 1           // Versão interna (número)
        versionName "1.0"       // Versão exibida ao usuário
    }
}
```

---

## 🎨 Recursos do App

### Ícone do App

**Localização:** `android/app/src/main/res/mipmap-*/`

Você encontrará várias pastas:
- `mipmap-mdpi/` - Ícone pequeno
- `mipmap-hdpi/` - Ícone médio
- `mipmap-xhdpi/` - Ícone grande
- `mipmap-xxhdpi/` - Ícone muito grande
- `mipmap-xxxhdpi/` - Ícone extra grande

**Para trocar o ícone:**
1. Crie ícones PNG nos tamanhos corretos
2. Substitua `ic_launcher.png` em cada pasta
3. Recompile o app

---

## 📦 node_modules/

**O que é:** Contém todas as bibliotecas instaladas do projeto.

**Tamanho:** Geralmente 200-500 MB

**⚠️ Importante:**
- Nunca edite arquivos dentro de `node_modules/`
- Nunca commite `node_modules/` no Git (já está no `.gitignore`)
- Para reinstalar: `rm -r node_modules/ && npm install`

---

## ⚙️ Arquivos de Configuração

### babel.config.js
Configura o Babel (transpilador JavaScript).
```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
};
```

### metro.config.js
Configura o Metro bundler (empacotador do React Native).
```javascript
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
```

### tsconfig.json
Configurações do TypeScript.
```json
{
  "extends": "@tsconfig/react-native/tsconfig.json"
}
```

**⚠️ Geralmente você NÃO precisa mexer nestes arquivos.**

---

## 🎯 Onde Você Vai Trabalhar Mais

### 90% do tempo:
- **App.tsx** - Criando a interface e lógica

### 5% do tempo:
- **package.json** - Instalando bibliotecas
- **app.json** - Mudando nome do app

### 5% do tempo:
- **android/app/src/main/AndroidManifest.xml** - Permissões
- **android/app/src/main/res/** - Ícones e recursos

---

## 📝 Exemplo: Estrutura de um App Real

Conforme seu app cresce, você criará esta estrutura:

```
NativeApp/
├── src/                    # Código fonte organizado
│   ├── screens/            # Telas do app
│   │   ├── HomeScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Header.tsx
│   ├── navigation/         # Navegação entre telas
│   │   └── AppNavigator.tsx
│   ├── services/           # APIs e serviços
│   │   └── api.ts
│   ├── utils/              # Funções utilitárias
│   │   └── helpers.ts
│   └── types/              # Tipos TypeScript
│       └── index.ts
├── assets/                 # Imagens e recursos
│   ├── images/
│   └── fonts/
├── android/
├── App.tsx                 # Agora só importa src/navigation
└── package.json
```

**Mas não se preocupe com isso agora!** Comece simples e vá evoluindo.

---

## 🔄 Fluxo de Execução do App

Quando você roda `npm run android`, acontece:

1. **Metro Bundler** inicia (`metro.config.js`)
2. **Babel** transpila o código TypeScript/JSX (`babel.config.js`)
3. **index.js** é o ponto de entrada
4. **App.tsx** é carregado e renderizado
5. **Código nativo Android** exibe o app no celular

---

## 💡 Dicas

### Adicionar uma nova biblioteca:
```powershell
npm install nome-da-biblioteca
```

### Remover uma biblioteca:
```powershell
npm uninstall nome-da-biblioteca
```

### Limpar cache (se algo não funcionar):
```powershell
# Limpar cache do Metro
npx react-native start --reset-cache

# Limpar build do Android
cd android
.\gradlew clean
cd ..
```

---

## ✅ Checklist de Entendimento

- [ ] Sei que **App.tsx** é onde vou programar meu app
- [ ] Sei que **package.json** lista as dependências
- [ ] Sei que **app.json** define o nome do app
- [ ] Sei que **android/** contém código nativo
- [ ] Sei onde estão os ícones do app
- [ ] Sei como adicionar permissões no AndroidManifest.xml
- [ ] Sei que **node_modules/** não deve ser editado

---

## 📚 Próximo Passo

Vá para **04-configuracao-android.md** para configurações específicas do Android!

