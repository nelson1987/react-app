# Passo 7: Gerar APK de Produção

## 📦 Criar APK para Instalar no Celular

Agora que seu app está pronto, vamos gerar um APK de produção que pode ser instalado em qualquer celular Android sem precisar de cabo USB!

---

## Diferença: APK Debug vs APK Release

### APK Debug (desenvolvimento):
- ❌ Muito grande (~50-100 MB)
- ❌ Não otimizado
- ❌ Inclui ferramentas de debug
- ✅ Fácil e rápido de gerar
- **Gerado automaticamente com:** `npm run android`

### APK Release (produção):
- ✅ Menor (~15-30 MB)
- ✅ Otimizado e rápido
- ✅ Pronto para distribuição
- ✅ Sem ferramentas de debug
- **Precisa assinar com chave**

---

## Opção 1: APK Debug (Rápido e Simples)

Se você só quer testar em outros celulares sem publicar na Play Store:

### Gerar APK Debug:

```powershell
cd android
.\gradlew assembleDebug
cd ..
```

### Localização do APK:

```
NativeApp\android\app\build\outputs\apk\debug\app-debug.apk
```

### Instalar em outro celular:

1. Copie o arquivo `app-debug.apk` para o celular via:
   - WhatsApp
   - Email
   - Cabo USB
   - Google Drive
   - Pendrive

2. No celular, abra o arquivo `.apk`

3. Aceite "Instalar aplicativos desconhecidos" (se solicitar)

4. Toque em "Instalar"

5. Pronto! App instalado! 🎉

---

## Opção 2: APK Release (Otimizado e Assinado)

Para gerar um APK de produção, você precisa assinar com uma chave.

### Passo 1: Gerar uma Keystore (Chave de Assinatura)

A keystore é um arquivo que assina seu APK, provando que você é o desenvolvedor.

**⚠️ IMPORTANTE:** Guarde este arquivo em segurança! Sem ele, você não conseguirá atualizar o app na Play Store.

#### Gerar keystore:

```powershell
keytool -genkeypair -v -storetype PKCS12 -keystore meu-app-key.keystore -alias meu-app-alias -keyalg RSA -keysize 2048 -validity 10000
```

#### Perguntas que o comando fará:

```
Digite a senha da área de armazenamento de chaves:
[Digite uma senha forte e ANOTE!]

Digite novamente a nova senha:
[Digite a mesma senha]

Qual é o seu nome e sobrenome?
[Seu nome]

Qual é o nome da sua unidade organizacional?
[Nome da empresa ou deixe em branco]

Qual é o nome da sua empresa?
[Nome da empresa ou deixe em branco]

Qual é o nome da sua Cidade ou Localidade?
[Sua cidade]

Qual é o nome do seu Estado ou Município?
[Seu estado]

Quais são as duas letras do código do país desta unidade?
[BR]

Está correto?
[Digite: sim]
```

#### Resultado:

Arquivo criado: `meu-app-key.keystore` na pasta do projeto

**ANOTE:**
- **Senha do keystore:** (a senha que você digitou)
- **Alias:** `meu-app-alias`

---

### Passo 2: Configurar o Gradle para Usar a Keystore

#### Opção A: Colocar senha no código (mais fácil, menos seguro)

**Arquivo:** `android/app/build.gradle`

Adicione antes de `android {`:

```gradle
android {
    ...
    
    signingConfigs {
        release {
            storeFile file('../../meu-app-key.keystore')
            storePassword 'SUA_SENHA_AQUI'
            keyAlias 'meu-app-alias'
            keyPassword 'SUA_SENHA_AQUI'
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

#### Opção B: Usar arquivo de configuração (mais seguro)

**Arquivo:** `android/gradle.properties`

Adicione no final:

```properties
MYAPP_RELEASE_STORE_FILE=meu-app-key.keystore
MYAPP_RELEASE_KEY_ALIAS=meu-app-alias
MYAPP_RELEASE_STORE_PASSWORD=sua_senha_aqui
MYAPP_RELEASE_KEY_PASSWORD=sua_senha_aqui
```

**Arquivo:** `android/app/build.gradle`

```gradle
android {
    ...
    
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file('../../' + MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

⚠️ **IMPORTANTE:** Adicione `gradle.properties` ao `.gitignore` para não compartilhar suas senhas!

```
# .gitignore
android/gradle.properties
*.keystore
```

---

### Passo 3: Gerar o APK Release

```powershell
cd android
.\gradlew assembleRelease
cd ..
```

⏱️ **Tempo:** 5-10 minutos (primeira vez)

### Localização do APK Release:

```
NativeApp\android\app\build\outputs\apk\release\app-release.apk
```

---

### Passo 4: Instalar o APK Release

1. Copie `app-release.apk` para o celular

2. No celular:
   - Toque no arquivo APK
   - Aceite instalar de fontes desconhecidas
   - Instale

3. **Pronto!** App otimizado e instalado! 🎊

---

## Gerar AAB (Android App Bundle) para Play Store

Se você for publicar na Google Play Store, precisa de um AAB (não APK).

### Gerar AAB:

```powershell
cd android
.\gradlew bundleRelease
cd ..
```

### Localização do AAB:

```
NativeApp\android\app\build\outputs\bundle\release\app-release.aab
```

### Este arquivo é usado para:
- ✅ Publicar na Google Play Store
- ❌ NÃO pode ser instalado diretamente no celular

---

## Otimizações de Build

### Reduzir tamanho do APK:

**Arquivo:** `android/app/build.gradle`

```gradle
android {
    ...
    
    buildTypes {
        release {
            minifyEnabled true           // Remove código não usado
            shrinkResources true         // Remove recursos não usados
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    
    // Gerar APKs separados por arquitetura (mais avançado)
    splits {
        abi {
            enable true
            reset()
            include 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
            universalApk true
        }
    }
}
```

Com `splits`, você terá vários APKs menores:
- `app-armeabi-v7a-release.apk` - Para celulares ARM 32-bit (~12 MB)
- `app-arm64-v8a-release.apk` - Para celulares ARM 64-bit (~15 MB)
- `app-universal-release.apk` - Para todos (maior, ~30 MB)

---

## Mudar Versão do App

Quando você atualizar o app, mude a versão.

**Arquivo:** `android/app/build.gradle`

```gradle
android {
    defaultConfig {
        applicationId "com.nativeapp"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 2              // Aumente este número (era 1)
        versionName "1.1"          // Versão exibida ao usuário
    }
}
```

- **versionCode**: Número interno (sempre crescente: 1, 2, 3, 4...)
- **versionName**: Versão que o usuário vê ("1.0", "1.1", "2.0", etc.)

---

## Mudar Nome e Ícone do App

### Mudar nome exibido:

**Arquivo:** `android/app/src/main/res/values/strings.xml`

```xml
<resources>
    <string name="app_name">Meu App Incrível</string>
</resources>
```

### Mudar ícone:

1. Crie ícones PNG nos tamanhos:
   - `48x48` → `mipmap-mdpi/ic_launcher.png`
   - `72x72` → `mipmap-hdpi/ic_launcher.png`
   - `96x96` → `mipmap-xhdpi/ic_launcher.png`
   - `144x144` → `mipmap-xxhdpi/ic_launcher.png`
   - `192x192` → `mipmap-xxxhdpi/ic_launcher.png`

2. Substitua em: `android/app/src/main/res/mipmap-*/`

3. Gere o APK novamente

**Ferramenta online para gerar ícones:**
- https://easyappicon.com/
- https://icon.kitchen/

---

## Testar o APK Release Antes de Distribuir

### Instalar via ADB:

```powershell
adb install android\app\build\outputs\apk\release\app-release.apk
```

### Desinstalar versão anterior (se necessário):

```powershell
adb uninstall com.nativeapp
```

---

## Checklist antes de Distribuir

- [ ] App funciona corretamente em modo release
- [ ] Nome do app está correto
- [ ] Ícone está correto
- [ ] VersionCode e versionName atualizados
- [ ] APK assinado com keystore
- [ ] Testado em pelo menos um celular
- [ ] Keystore e senha guardados em local seguro
- [ ] Tamanho do APK é aceitável

---

## Distribuir o APK

### Para Amigos/Testadores:

1. Envie o `app-release.apk` por:
   - WhatsApp
   - Email
   - Google Drive
   - Telegram

2. Instrua a instalar:
   - Baixar o APK
   - Abrir o arquivo
   - Aceitar instalação de fonte desconhecida
   - Instalar

### Para Publicar na Play Store:

1. Crie uma conta de desenvolvedor: https://play.google.com/console
   - Taxa única: US$ 25

2. Crie um novo aplicativo

3. Upload do AAB: `app-release.aab`

4. Preencha:
   - Descrição
   - Screenshots
   - Ícone
   - Política de privacidade

5. Envie para revisão

6. Aguarde aprovação (1-7 dias)

---

## Comandos Resumidos

```powershell
# APK Debug (rápido, para testar)
cd android
.\gradlew assembleDebug
cd ..

# APK Release (otimizado, assinado)
cd android
.\gradlew assembleRelease
cd ..

# AAB para Play Store
cd android
.\gradlew bundleRelease
cd ..

# Instalar APK via ADB
adb install caminho\do\app-release.apk

# Limpar build (se tiver problemas)
cd android
.\gradlew clean
cd ..
```

---

## 🔧 Solução de Problemas

### Erro: "Failed to read key from keystore"

**Causa:** Senha incorreta ou arquivo não encontrado

**Solução:**
- Verifique a senha
- Verifique o caminho do arquivo keystore
- Certifique-se de que o arquivo existe

### Erro: "Duplicate resources"

**Solução:**
```powershell
cd android
.\gradlew clean
.\gradlew assembleRelease
```

### APK muito grande

**Soluções:**
1. Habilite `minifyEnabled` e `shrinkResources`
2. Use `splits` para gerar APKs por arquitetura
3. Remova bibliotecas não utilizadas
4. Otimize imagens

### App crasha em Release mas funciona em Debug

**Causa:** Proguard removeu código necessário

**Solução:** Adicione regras no `android/app/proguard-rules.pro`:

```
-keep class com.facebook.react.** { *; }
-keep class com.seu.pacote.** { *; }
```

---

## 🎉 Parabéns!

Você agora sabe criar um APK completo do seu aplicativo React Native!

**Próximo passo:** Vá para **08-resumo-completo.md** para um guia de referência rápida de todos os comandos!

