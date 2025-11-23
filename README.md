# NativeApp

Aplicação React Native moderna e limpa, pronta para desenvolvimento.

## 📋 Sobre o Projeto

Este é um projeto React Native puro, configurado com TypeScript e as melhores práticas de desenvolvimento mobile. A aplicação está preparada para rodar em dispositivos Android e iOS.

## 🚀 Tecnologias

- **React Native** 0.76.9
- **React** 18.3.1
- **TypeScript** 5.8.3
- **Jest** para testes
- **ESLint** para qualidade de código
- **Metro Bundler** para bundling

## 📱 Estrutura do Projeto

```
react-app/
├── android/              # Código nativo Android
├── ios/                  # Código nativo iOS
├── __tests__/           # Testes automatizados
├── App.tsx              # Componente principal
├── index.js             # Ponto de entrada
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configuração TypeScript
├── babel.config.js      # Configuração Babel
└── metro.config.js      # Configuração Metro Bundler
```

## 🛠️ Requisitos

- **Node.js** >= 20
- **npm** ou **yarn**
- **WSL2** (se estiver no Windows)
- **Java JDK** 17+ (para Android)
- **Android Studio** (para desenvolvimento Android)
- **Xcode** (para desenvolvimento iOS - apenas macOS)

## ⚙️ Instalação

```bash
# Instalar dependências
npm install

# Ou com yarn
yarn install
```

## 🚀 Como Executar

### Iniciar o Metro Bundler

```bash
npm start
```

O Metro Bundler iniciará e ficará aguardando conexões na porta 8081.

### Desenvolvimento no WSL2

Se você estiver usando WSL2, o projeto está configurado para funcionar corretamente. Certifique-se de:

1. Ter o projeto em `/mnt/c/git/react-app` (ou ajustar o caminho)
2. Executar comandos dentro do WSL2
3. Dispositivos Android conectados via USB com depuração USB ativada

## 📱 Conectar Dispositivo Físico

### Android via USB

1. Conecte o dispositivo via USB
2. Ative a Depuração USB nas Opções do Desenvolvedor
3. Verifique se o dispositivo está conectado:
   ```bash
   adb devices
   ```
4. O Metro Bundler detectará o dispositivo automaticamente

### Configurar IP manualmente (se necessário)

Se o dispositivo não conectar automaticamente:

1. Obtenha o IP do WSL2:
   ```bash
   hostname -I | awk '{print $1}'
   ```
2. No dispositivo, abra o menu de desenvolvedor (agitar o dispositivo)
3. Vá em Settings → Debug server host & port
4. Digite: `SEU_IP:8081` (ex: `172.18.19.87:8081`)
5. Reload

## 🧪 Testes

```bash
# Executar testes
npm test

# Executar testes em watch mode
npm test -- --watch
```

## 🎨 Desenvolvimento

### Hot Reload

O projeto está configurado com Fast Refresh (Hot Reload):
- Edite qualquer arquivo `.tsx` ou `.ts`
- Salve (Ctrl+S)
- As mudanças aparecerão automaticamente no dispositivo

### Menu de Desenvolvedor

No dispositivo físico:
- **Android**: Agite o dispositivo ou pressione o botão de menu
- **iOS**: Agite o dispositivo ou pressione Cmd+D (simulador)

Opções disponíveis:
- Reload
- Debug
- Change Bundle Location
- Settings

## 📦 Scripts Disponíveis

```bash
npm start       # Inicia o Metro Bundler
npm test        # Executa testes
npm run lint    # Verifica qualidade do código
```

## 🔧 Configuração

### TypeScript

O projeto usa TypeScript com configuração estrita. Veja `tsconfig.json` para detalhes.

### ESLint

Configurado com as regras recomendadas do React Native. Execute `npm run lint` para verificar o código.

### Metro Bundler

Configuração customizável em `metro.config.js`.

## 📝 Componente Principal

O componente principal (`App.tsx`) é uma tela simples e funcional que demonstra:
- SafeAreaView para áreas seguras
- Estilização com StyleSheet
- StatusBar
- Text e View components

## 🌐 Rede e Conexão (WSL2)

Para garantir que dispositivos se conectem ao Metro no WSL2:

### Obter IP do WSL2
```bash
wsl hostname -I
```

### Configurar Firewall do Windows
```powershell
# No PowerShell como Administrador
New-NetFirewallRule -DisplayName "Metro Bundler" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 8081
```

## 🐛 Troubleshooting

### Metro não inicia (Erro: Cannot read properties of undefined 'handle')

Este é um problema conhecido com a versão React Native 0.76.9 e o Metro Bundler. Soluções:

**Opção 1: Usar versão estável anterior**
```bash
npm install react-native@0.74.0 --save
rm -rf node_modules package-lock.json
npm install
```

**Opção 2: Aguardar próxima versão**
React Native 0.76.x ainda está em fase de estabilização. Recomenda-se usar 0.74.x para produção.

### Metro não inicia (geral)

```bash
# Limpar cache
rm -rf node_modules
npm install
```

### Dispositivo não conecta

1. Verifique se ambos estão na mesma rede WiFi
2. Configure o firewall (comando acima)
3. Verifique o IP do WSL2
4. Configure manualmente no dispositivo

### Erro de porta em uso

```bash
# Liberar porta 8081
npx react-native start --port 8082
```

## 📄 Licença

Este projeto está sob a licença privada.

## 👨‍💻 Desenvolvimento

Projeto React Native desenvolvido com foco em performance, qualidade de código e melhores práticas.

---

**Versão**: 0.0.1  
**Node**: >=20  
**React Native**: 0.76.9
