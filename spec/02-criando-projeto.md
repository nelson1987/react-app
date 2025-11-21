# Passo 2: Criando o Projeto React Native

## ⚠️ Pré-requisito
Certifique-se de que completou **TODOS** os passos do arquivo `00-instalacao-ferramentas.md` antes de continuar.

---

## 1. Escolher o Local do Projeto

Primeiro, decida onde você quer criar seu projeto. Recomendamos criar em uma pasta de fácil acesso.

### Exemplo de estrutura:

```
C:\git\native-app\     (pasta raiz do projeto - onde você está agora)
```

---

## 2. Criar o Projeto React Native

### Comando para criar o projeto:

Abra o PowerShell na pasta `C:\git\native-app` e execute:

```powershell
npx react-native@latest init NativeApp
```

### O que este comando faz?

- `npx`: Executa pacotes npm sem instalar globalmente
- `react-native@latest`: Usa a versão mais recente do React Native
- `init`: Comando para inicializar um novo projeto
- `NativeApp`: Nome do seu aplicativo (você pode mudar para o nome que quiser)

### Durante a execução:

O comando irá:
1. Baixar o template do React Native
2. Instalar todas as dependências necessárias
3. Configurar o projeto para Android e iOS
4. Criar toda a estrutura de arquivos

⏱️ **Tempo estimado:** 5-10 minutos (depende da velocidade da internet)

---

## 3. Alternativa: Criar com uma versão específica

Se você quiser usar uma versão específica do React Native:

```powershell
npx react-native@latest init NativeApp --version 0.73.0
```

Versões recomendadas:
- `0.73.0` - Versão estável mais recente (novembro 2024)
- `0.72.0` - Versão LTS anterior

---

## 4. Verificar a criação do projeto

Após a conclusão, você deve ver uma estrutura como esta:

```
C:\git\native-app\
└── NativeApp\
    ├── android\          (código nativo Android)
    ├── ios\              (código nativo iOS)
    ├── node_modules\     (dependências instaladas)
    ├── .gitignore
    ├── App.tsx           (componente principal do app)
    ├── app.json          (configurações do app)
    ├── babel.config.js   (configuração do Babel)
    ├── index.js          (ponto de entrada do app)
    ├── metro.config.js   (configuração do Metro bundler)
    ├── package.json      (dependências e scripts)
    ├── tsconfig.json     (configuração TypeScript)
    └── README.md
```

---

## 5. Navegar para a pasta do projeto

```powershell
cd NativeApp
```

Agora você está dentro da pasta do projeto!

---

## 6. Entender o package.json

Abra o arquivo `package.json` para ver os scripts disponíveis:

```json
{
  "name": "NativeApp",
  "version": "0.0.1",
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint ."
  }
}
```

### Scripts importantes:

- `npm run android` - Compila e executa o app no Android
- `npm start` - Inicia o Metro bundler (servidor de desenvolvimento)
- `npm test` - Executa os testes
- `npm run lint` - Verifica erros de código

---

## 7. Verificar instalação das dependências

Execute para garantir que tudo está instalado:

```powershell
npm install
```

Este comando reinstala todas as dependências caso algo tenha falhado.

---

## 8. Estrutura inicial criada ✅

Seu projeto React Native foi criado com sucesso!

**Próximo passo:** Vá para `03-estrutura-projeto.md` para entender a estrutura de arquivos do projeto.

---

## 🔧 Solução de Problemas

### Erro: "npx não é reconhecido"
**Solução:** Volte para `00-instalacao-ferramentas.md` e instale o Node.js corretamente.

### Erro durante a instalação de dependências
**Solução:**
```powershell
# Limpar cache do npm
npm cache clean --force

# Tentar novamente
npx react-native@latest init NativeApp
```

### Erro de permissão
**Solução:** Execute o PowerShell como Administrador

### Processo muito lento
**Solução:** 
- Verifique sua conexão com a internet
- Desative temporariamente o antivírus (pode estar bloqueando)
- Use uma rede mais rápida

---

## 📝 Resumo dos Comandos

```powershell
# Criar projeto
npx react-native@latest init NativeApp

# Entrar na pasta do projeto
cd NativeApp

# Reinstalar dependências (se necessário)
npm install

# Verificar versão do React Native
npx react-native --version
```

