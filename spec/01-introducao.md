# Guia Completo: Criando um Aplicativo React Native para Android

## Introdução

Este guia completo irá ajudá-lo a criar um aplicativo React Native do zero para uso no seu celular Android pessoal.

## O que é React Native?

React Native é um framework desenvolvido pelo Facebook que permite criar aplicativos móveis nativos usando JavaScript e React. Com ele, você pode desenvolver apps para Android e iOS usando uma única base de código.

## Pré-requisitos

Antes de começar, você precisará ter instalado:

### 1. Node.js (versão 18 ou superior)
- Download: https://nodejs.org/
- Verifique a instalação: `node --version`

### 2. Java Development Kit (JDK 17)
- Download: https://adoptium.net/
- Verifique a instalação: `java -version`

### 3. Android Studio
- Download: https://developer.android.com/studio
- Necessário para o Android SDK e emulador

### 4. Variáveis de Ambiente (Windows)

Você precisará configurar as seguintes variáveis de ambiente:

#### ANDROID_HOME
1. Abra "Configurações do Sistema" → "Variáveis de Ambiente"
2. Crie uma nova variável de sistema chamada `ANDROID_HOME`
3. Valor: `C:\Users\SeuUsuario\AppData\Local\Android\Sdk`

#### Path
Adicione ao Path do sistema:
- `%ANDROID_HOME%\platform-tools`
- `%ANDROID_HOME%\emulator`
- `%ANDROID_HOME%\tools`
- `%ANDROID_HOME%\tools\bin`

### 5. Verificar Instalação do Android SDK

No Android Studio:
1. Abra "SDK Manager" (ícone de cubo)
2. Instale:
   - Android SDK Platform 34 (ou mais recente)
   - Android SDK Build-Tools
   - Android Emulator
   - Android SDK Platform-Tools

## Estrutura deste Guia

Este guia está dividido em várias partes:

1. **01-introducao.md** (este arquivo) - Introdução e pré-requisitos
2. **02-criando-projeto.md** - Comandos para criar o projeto
3. **03-estrutura-projeto.md** - Entendendo a estrutura de arquivos
4. **04-configuracao-android.md** - Configurações específicas para Android
5. **05-executando-app.md** - Como executar no celular ou emulador
6. **06-desenvolvimento.md** - Dicas de desenvolvimento
7. **07-build-apk.md** - Como gerar o APK para instalar no celular

## Próximo Passo

Continue para o arquivo **02-criando-projeto.md** para começar a criar seu aplicativo!

