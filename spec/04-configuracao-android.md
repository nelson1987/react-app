# Passo 4: Configuração Específica para Android

## 🎯 Objetivo

Configurar o projeto React Native para funcionar perfeitamente no seu dispositivo Android físico.

---

## 1. Verificar Conexão com o Dispositivo

Antes de continuar, certifique-se de que seu celular está conectado:

```powershell
adb devices
```

✅ **Deve mostrar:**
```
List of devices attached
ABC123456789    device
```

Se não aparecer, volte para `00-instalacao-ferramentas.md` e refaça a seção 6.

---

## 2. Configurar Gradle Properties

O Gradle é o sistema de build do Android. Vamos otimizá-lo para seu PC com poucos recursos.

### Arquivo: `android/gradle.properties`

**Localização:** `NativeApp/android/gradle.properties`

**Abra o arquivo e adicione/verifique estas linhas:**

```properties
# Limites de memória do Gradle (ajuste conforme seu PC)
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m

# Habilitar cache do Gradle
org.gradle.caching=true

# Executar em paralelo (mais rápido)
org.gradle.parallel=true

# Configurar daemon
org.gradle.daemon=true

# Habilitar AndroidX
android.useAndroidX=true

# Habilitar Jetifier (converte bibliotecas antigas)
android.enableJetifier=true

# Desabilitar warning de API obsoleta
android.suppressUnsupportedOptionWarnings=true
```

### Explicação dos parâmetros:

- **-Xmx2048m**: Limita memória RAM do Gradle a 2GB
  - Se seu PC tem menos de 4GB RAM, use: `-Xmx1536m` (1.5GB)
  - Se seu PC tem 8GB+ RAM, use: `-Xmx3072m` (3GB)
  
- **org.gradle.parallel=true**: Compila tarefas em paralelo (mais rápido)

- **org.gradle.caching=true**: Reutiliza builds anteriores (muito mais rápido)

---

## 3. Configurar Versão do Android

### Arquivo: `android/build.gradle`

**Localização:** `NativeApp/android/build.gradle`

**Verifique se tem estas versões:**

```gradle
buildscript {
    ext {
        buildToolsVersion = "34.0.0"
        minSdkVersion = 21        // Android 5.0
        compileSdkVersion = 34    // Android 14
        targetSdkVersion = 34     // Android 14
        ndkVersion = "25.1.8937393"
    }
    
    repositories {
        google()
        mavenCentral()
    }
    
    dependencies {
        classpath("com.android.tools.build:gradle:8.1.1")
    }
}
```

### Explicação:

- **minSdkVersion = 21**: Funciona em Android 5.0+ (99% dos dispositivos)
- **targetSdkVersion = 34**: Otimizado para Android 14
- **compileSdkVersion = 34**: Usa APIs do Android 14

---

## 4. Configurar Build do App

### Arquivo: `android/app/build.gradle`

**Localização:** `NativeApp/android/app/build.gradle`

**Seção android { defaultConfig }:**

```gradle
android {
    namespace "com.nativeapp"
    compileSdkVersion rootProject.ext.compileSdkVersion
    
    defaultConfig {
        applicationId "com.nativeapp"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
    }
    
    buildTypes {
        debug {
            // Build de desenvolvimento
            minifyEnabled false
            debuggable true
        }
        release {
            // Build de produção
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Campos importantes:

- **applicationId**: ID único do app (formato: com.empresa.nomedoapp)
- **versionCode**: Número da versão (incrementa a cada atualização)
- **versionName**: Versão exibida ao usuário (ex: "1.0", "2.5")

### Para mudar o ID do app:

```gradle
applicationId "com.seuNome.meuApp"
```

⚠️ **Cuidado:** Se mudar o applicationId, o Android vai considerar como um app diferente!

---

## 5. Permissões do Android

### Arquivo: `android/app/src/main/AndroidManifest.xml`

**Localização:** `NativeApp/android/app/src/main/AndroidManifest.xml`

**Estrutura básica:**

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Permissões necessárias -->
    <uses-permission android:name="android.permission.INTERNET" />
    
    <application
        android:name=".MainApplication"
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:allowBackup="false"
        android:theme="@style/AppTheme">
        
        <!-- Atividade principal -->
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|screenSize|smallestScreenSize|uiMode"
            android:launchMode="singleTask"
            android:windowSoftInputMode="adjustResize"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

### Permissões comuns:

```xml
<!-- Internet (já vem por padrão) -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- Câmera -->
<uses-permission android:name="android.permission.CAMERA" />

<!-- Localização (aproximada) -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

<!-- Localização (precisa) -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

<!-- Ler arquivos externos -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

<!-- Escrever arquivos externos -->
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

<!-- Vibrar -->
<uses-permission android:name="android.permission.VIBRATE" />

<!-- Notificações (Android 13+) -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

---

## 6. Configurar Nome do App

### Método 1: Via app.json

**Arquivo:** `NativeApp/app.json`

```json
{
  "name": "NativeApp",
  "displayName": "Meu Super App"
}
```

### Método 2: Via strings.xml (Android)

**Arquivo:** `android/app/src/main/res/values/strings.xml`

```xml
<resources>
    <string name="app_name">Meu Super App</string>
</resources>
```

---

## 7. Habilitar Fast Refresh (Recarga Rápida)

**O Fast Refresh** permite ver mudanças no código instantaneamente, sem recompilar.

### Já vem habilitado por padrão!

Para verificar, durante o desenvolvimento:

1. Rode `npm run android`
2. O app abre no celular
3. Mude algo no `App.tsx`
4. Salve o arquivo
5. O app atualiza automaticamente! ⚡

### Atalhos no dispositivo:

- **Shake (agitar o celular)**: Abre o menu de desenvolvimento
- **Ctrl + M** (no terminal): Abre o menu de desenvolvimento
- **R duas vezes**: Recarregar manualmente

---

## 8. Configurar Modo de Desenvolvimento

### Habilitar modo DEV no celular:

Quando o app estiver rodando:

1. **Agite o celular** ou pressione **Ctrl + M** no terminal
2. Menu de desenvolvimento abre
3. Opções úteis:
   - **Enable Hot Reloading** - Recarga automática ✅
   - **Enable Fast Refresh** - Recarga rápida ✅
   - **Toggle Inspector** - Inspetor de elementos
   - **Show Perf Monitor** - Monitor de performance
   - **Debug** - Abrir debugger

---

## 9. Otimizações para PC com Poucos Recursos

### Se o build estiver muito lento:

#### Opção 1: Desabilitar lint durante o build

**Arquivo:** `android/app/build.gradle`

Adicione dentro de `android {}`:

```gradle
android {
    lintOptions {
        checkReleaseBuilds false
        abortOnError false
    }
}
```

#### Opção 2: Usar menos workers do Gradle

**Arquivo:** `android/gradle.properties`

```properties
org.gradle.workers.max=2
```

#### Opção 3: Desabilitar algumas verificações

**Arquivo:** `android/app/build.gradle`

```gradle
android {
    packagingOptions {
        pickFirst 'lib/x86/libc++_shared.so'
        pickFirst 'lib/x86_64/libc++_shared.so'
        pickFirst 'lib/armeabi-v7a/libc++_shared.so'
        pickFirst 'lib/arm64-v8a/libc++_shared.so'
    }
}
```

---

## 10. Verificar Configurações

### Comando para verificar ambiente:

```powershell
npx react-native doctor
```

Este comando verifica:
- ✅ Node.js
- ✅ JDK
- ✅ Android SDK
- ✅ Variáveis de ambiente
- ⚠️ Problemas encontrados

---

## 11. Limpar Build (Se algo não funcionar)

Se encontrar erros de build:

```powershell
# Limpar cache do Metro
npx react-native start --reset-cache

# Limpar build do Android
cd android
.\gradlew clean
cd ..

# Limpar node_modules (último recurso)
Remove-Item -Recurse -Force node_modules
npm install
```

---

## ✅ Checklist de Configuração

- [ ] Dispositivo conectado e reconhecido pelo ADB
- [ ] `gradle.properties` otimizado para seu PC
- [ ] Versões do Android configuradas
- [ ] ApplicationId definido
- [ ] Permissões adicionadas ao AndroidManifest.xml
- [ ] Nome do app configurado
- [ ] Fast Refresh funcionando
- [ ] `npx react-native doctor` sem erros críticos

---

## 🎯 Resumo dos Arquivos Editados

| Arquivo | O que configurar |
|---------|------------------|
| `gradle.properties` | Memória e otimizações |
| `android/build.gradle` | Versões do Android |
| `android/app/build.gradle` | ID e versão do app |
| `AndroidManifest.xml` | Permissões |
| `app.json` ou `strings.xml` | Nome do app |

---

## 📚 Próximo Passo

Agora está tudo configurado! Vá para **05-executando-app.md** para finalmente executar seu app no celular! 🚀

