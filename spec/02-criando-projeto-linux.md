# Passo 2: Criando o Projeto React Native (Linux)

## ⚠️ Pré-requisito
Certifique-se de que completou **TODOS** os passos do arquivo `00-instalacao-ferramentas-linux.md` antes de continuar.

---

## 1. Escolher o Local do Projeto

Primeiro, decida onde você quer criar seu projeto. Recomendamos criar em uma pasta de fácil acesso.

### Exemplo de estrutura:

```
~/projetos/native-app/     (pasta raiz do projeto)
```

Ou:

```
~/git/native-app/          (se você usa git)
```

### Criar a pasta:

```bash
# Criar pasta para seus projetos (se não existir)
mkdir -p ~/projetos/native-app

# Navegar para a pasta
cd ~/projetos/native-app
```

---

## 2. Criar o Projeto React Native

### Comando para criar o projeto:

Abra o terminal na pasta `~/projetos/native-app` e execute:

```bash
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

### Saída esperada:

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

                  Welcome to React Native!
                  Learn once, write anywhere

✔ Downloading template
✔ Copying template
✔ Processing template
✔ Installing dependencies

Run instructions for Android:
  • Have an Android emulator running (quickest way to get started), or a device connected.
  • cd "NativeApp" && npx react-native run-android
```

---

## 3. Alternativa: Criar com uma versão específica

Se você quiser usar uma versão específica do React Native:

```bash
npx react-native@latest init NativeApp --version 0.73.0
```

Versões recomendadas:
- `0.73.0` - Versão estável mais recente (novembro 2024)
- `0.72.0` - Versão LTS anterior

---

## 4. Verificar a criação do projeto

Após a conclusão, você deve ver uma estrutura como esta:

```bash
ls -la NativeApp/
```

Estrutura esperada:

```
~/projetos/native-app/
└── NativeApp/
    ├── android/          (código nativo Android)
    ├── ios/              (código nativo iOS)
    ├── node_modules/     (dependências instaladas)
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

```bash
cd NativeApp
```

Agora você está dentro da pasta do projeto!

Para verificar onde você está:

```bash
pwd
```

Deve mostrar algo como: `/home/seu-usuario/projetos/native-app/NativeApp`

---

## 6. Entender o package.json

Abra o arquivo `package.json` para ver os scripts disponíveis:

```bash
cat package.json
```

Ou com seu editor favorito:

```bash
# VSCode
code package.json

# Nano
nano package.json

# Vim
vim package.json
```

Conteúdo relevante:

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

```bash
npm install
```

Este comando reinstala todas as dependências caso algo tenha falhado.

---

## 8. Dar permissão de execução ao Gradle (Linux específico)

No Linux, você precisa dar permissão de execução ao arquivo `gradlew`:

```bash
chmod +x android/gradlew
```

Isso permite que o Gradle seja executado corretamente.

---

## 9. Estrutura inicial criada ✅

Seu projeto React Native foi criado com sucesso!

**Próximo passo:** Vá para `03-estrutura-projeto.md` para entender a estrutura de arquivos do projeto.

---

## 🔧 Solução de Problemas

### Erro: "npx: command not found"
**Solução:** Volte para `00-instalacao-ferramentas-linux.md` e instale o Node.js corretamente.

```bash
node --version
npm --version
```

### Erro durante a instalação de dependências
**Solução:**
```bash
# Limpar cache do npm
npm cache clean --force

# Tentar novamente
npx react-native@latest init NativeApp
```

### Erro de permissão ao instalar
**Causa:** Tentando instalar com sudo (não faça isso!)

**Solução:** **NUNCA use sudo com npm!**

```bash
# Se você tem problemas de permissão, configure npm para usar pasta do usuário
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# Adicione ao ~/.bashrc ou ~/.zshrc
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Processo muito lento
**Solução:** 
- Verifique sua conexão com a internet
- Use uma rede mais rápida
- Tente em outro horário (servidores npm podem estar lentos)

### Erro: "EACCES: permission denied"
**Causa:** Permissões incorretas no diretório

**Solução:**
```bash
# Corrigir permissões da pasta npm
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER ~/.config
```

### Erro: "Cannot find module"
**Causa:** Instalação incompleta

**Solução:**
```bash
# Remover node_modules e reinstalar
rm -rf node_modules
npm install
```

---

## 📝 Resumo dos Comandos

```bash
# Criar projeto
npx react-native@latest init NativeApp

# Entrar na pasta do projeto
cd NativeApp

# Dar permissão ao Gradle (Linux específico)
chmod +x android/gradlew

# Reinstalar dependências (se necessário)
npm install

# Verificar versão do React Native
npx react-native --version
```

---

## 💡 Dicas Específicas para Linux

### Usar yarn ao invés de npm (opcional, mas mais rápido)

Se preferir usar yarn:

```bash
# Instalar yarn
sudo npm install -g yarn

# Criar projeto com yarn
npx react-native@latest init NativeApp --pm yarn

# Comandos ficam:
yarn android
yarn start
```

### Estrutura recomendada no Linux

```
~/projetos/
├── native-app/       # Projeto atual
├── outro-app/        # Outros projetos
└── estudos/          # Projetos de estudo
```

### Atalho para editar no VSCode

Se você tem VSCode instalado:

```bash
cd NativeApp
code .
```

Abre o projeto diretamente no VSCode!

### Verificar espaço em disco

Antes de criar o projeto:

```bash
df -h ~
```

Certifique-se de ter pelo menos **2 GB livres**.

---

## 🚀 Próximos Passos

1. ✅ Projeto criado
2. ⏭️ Entender estrutura (`03-estrutura-projeto.md`)
3. ⏭️ Configurar Android (`04-configuracao-android-linux.md`)
4. ⏭️ Executar no celular (`05-executando-app-linux.md`)

Continue para o próximo documento!

---

## 📊 O que foi instalado?

```bash
# Ver tamanho do projeto
du -sh NativeApp/

# Normalmente: ~200-300 MB
```

### Principais componentes:

- **node_modules/** - ~180 MB (dependências JavaScript)
- **android/** - ~10 MB (código nativo Android)
- **App.tsx** - Código principal do seu app
- **package.json** - Lista de dependências

---

## 🐧 Comandos Úteis Linux

```bash
# Ver estrutura de pastas
tree -L 2 NativeApp/

# Se não tiver tree instalado:
sudo apt install tree

# Ver arquivos ocultos
ls -la NativeApp/

# Buscar arquivos específicos
find NativeApp/ -name "*.tsx"

# Ver espaço usado
du -sh NativeApp/*
```

---

## ✅ Checklist de Sucesso

- [ ] Comando `npx react-native init` executou sem erros
- [ ] Pasta `NativeApp/` foi criada
- [ ] Arquivo `package.json` existe
- [ ] Pasta `node_modules/` foi criada
- [ ] Pasta `android/` existe
- [ ] Permissão de execução dada ao `gradlew`
- [ ] Consigo navegar para pasta: `cd NativeApp`

Se todos os itens estão marcados, você está pronto para o próximo passo! 🎉

