# 📚 Guia Completo: React Native para Android (Versão Leve)

## 👋 Bem-vindo!

Este é um guia completo e detalhado para criar aplicativos React Native para Android **sem precisar do Android Studio**, perfeito para PCs com recursos limitados.

---

## 📑 Índice dos Documentos

Siga os documentos nesta ordem:

### 🔧 Fase 1: Preparação (Fazer uma vez)

1. **[00-alternativas-instalacao.md](./00-alternativas-instalacao.md)**
   - Entenda as diferenças entre usar Android Studio ou não
   - Escolha qual método usar
   - **Você escolheu: SDK Command Line Tools (método leve)**

2. **[00-instalacao-ferramentas.md](./00-instalacao-ferramentas.md)** ⭐ **COMECE AQUI**
   - Instalar Node.js
   - Instalar Java JDK
   - Instalar Android SDK Command Line Tools
   - Configurar variáveis de ambiente
   - Preparar celular Android
   - ⏱️ Tempo: 30-60 minutos

3. **[01-introducao.md](./01-introducao.md)**
   - O que é React Native
   - Visão geral do guia
   - Pré-requisitos adicionais

### 🚀 Fase 2: Criando o Projeto

4. **[02-criando-projeto.md](./02-criando-projeto.md)**
   - Comando para criar o projeto
   - Opções de versão
   - Estrutura inicial
   - Verificar instalação
   - ⏱️ Tempo: 5-10 minutos

### 📖 Fase 3: Entendendo o Projeto

5. **[03-estrutura-projeto.md](./03-estrutura-projeto.md)**
   - Entender pastas e arquivos
   - Onde você vai programar
   - Arquivos de configuração
   - Como organizar o código
   - ⏱️ Tempo de leitura: 15 minutos

6. **[04-configuracao-android.md](./04-configuracao-android.md)**
   - Configurar Gradle
   - Otimizar para PC lento
   - Adicionar permissões
   - Mudar nome do app
   - Fast Refresh
   - ⏱️ Tempo: 20 minutos

### 🎮 Fase 4: Executando e Desenvolvendo

7. **[05-executando-app.md](./05-executando-app.md)** ⭐ **MOMENTO MÁGICO**
   - Executar o app no celular
   - Testar Fast Refresh
   - Menu de desenvolvimento
   - Debug e logs
   - Solução de problemas
   - ⏱️ Tempo: 10-30 minutos (primeira compilação)

8. **[06-desenvolvimento.md](./06-desenvolvimento.md)**
   - Componentes básicos (View, Text, Button, etc.)
   - Estilização com StyleSheet
   - Estados (useState)
   - Navegação entre telas
   - Fazer requisições HTTP
   - Armazenar dados localmente
   - Exemplo completo: App de tarefas
   - ⏱️ Tempo: Leia conforme precisar

### 📦 Fase 5: Distribuindo o App

9. **[07-build-apk.md](./07-build-apk.md)**
   - Gerar APK Debug (rápido)
   - Gerar APK Release (otimizado)
   - Criar keystore
   - Assinar o APK
   - Reduzir tamanho do APK
   - Mudar versão
   - Publicar na Play Store (AAB)
   - ⏱️ Tempo: 30-60 minutos

### 📝 Referência Rápida

10. **[08-resumo-completo.md](./08-resumo-completo.md)** ⭐ **GUIA DE REFERÊNCIA**
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

1. Leia **00-instalacao-ferramentas.md**
2. Instale tudo passo a passo
3. Vá para **02-criando-projeto.md**
4. Continue na ordem até **05-executando-app.md**
5. Quando o app rodar no celular, comemore! 🎉
6. Leia **06-desenvolvimento.md** conforme precisar
7. Use **08-resumo-completo.md** como referência

### Se você JÁ TEM experiência com programação:

1. Leia **00-instalacao-ferramentas.md** (instale as ferramentas)
2. Pule para **08-resumo-completo.md** (referência rápida)
3. Crie o projeto: `npx react-native init MeuApp`
4. Execute: `npm run android`
5. Consulte os outros documentos quando precisar

### Se você ESTÁ VOLTANDO depois de um tempo:

1. Vá direto para **08-resumo-completo.md**
2. Use como cola para comandos
3. Consulte documentos específicos se esquecer algo

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
→ Consulte **00-instalacao-ferramentas.md** seção "Solução de Problemas"

### Erro ao criar projeto?
→ Consulte **02-criando-projeto.md** seção "Solução de Problemas"

### App não compila?
→ Consulte **05-executando-app.md** seção "Solução de Problemas"

### Não sabe como fazer algo?
→ Consulte **06-desenvolvimento.md** ou **08-resumo-completo.md**

### Erro ao gerar APK?
→ Consulte **07-build-apk.md** seção "Solução de Problemas"

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
- **Plataforma:** Windows 10/11
- **Idioma:** Português (Brasil)
- **Objetivo:** Ensinar de forma prática e detalhada

**Última atualização:** Novembro 2024

