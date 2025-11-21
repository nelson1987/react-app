# Passo 6: Desenvolvimento - Criando Seu App

## 🎨 Guia Básico de Desenvolvimento React Native

Este guia ensina os fundamentos para criar seu aplicativo.

---

## 1. Componentes Básicos do React Native

### Text - Exibir texto

```typescript
import {Text} from 'react-native';

<Text>Olá, mundo!</Text>
<Text style={{fontSize: 20, color: 'blue'}}>Texto azul</Text>
```

### View - Container (como uma div)

```typescript
import {View} from 'react-native';

<View style={{padding: 20}}>
  <Text>Dentro do container</Text>
</View>
```

### Button - Botão simples

```typescript
import {Button} from 'react-native';

<Button
  title="Clique aqui"
  onPress={() => console.log('Botão clicado!')}
/>
```

### TouchableOpacity - Botão customizável

```typescript
import {TouchableOpacity, Text} from 'react-native';

<TouchableOpacity
  style={{padding: 10, backgroundColor: 'blue'}}
  onPress={() => console.log('Tocado!')}>
  <Text style={{color: 'white'}}>Botão Customizado</Text>
</TouchableOpacity>
```

### TextInput - Campo de texto

```typescript
import {TextInput} from 'react-native';
import {useState} from 'react';

const [texto, setTexto] = useState('');

<TextInput
  style={{borderWidth: 1, padding: 10}}
  placeholder="Digite algo..."
  value={texto}
  onChangeText={setTexto}
/>
```

### Image - Exibir imagens

```typescript
import {Image} from 'react-native';

// Imagem local
<Image
  source={require('./assets/logo.png')}
  style={{width: 100, height: 100}}
/>

// Imagem da internet
<Image
  source={{uri: 'https://exemplo.com/imagem.jpg'}}
  style={{width: 100, height: 100}}
/>
```

### ScrollView - Área com scroll

```typescript
import {ScrollView, Text} from 'react-native';

<ScrollView>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
  {/* Mais itens... */}
</ScrollView>
```

### FlatList - Lista performática

```typescript
import {FlatList, Text} from 'react-native';

const dados = [
  {id: '1', nome: 'Item 1'},
  {id: '2', nome: 'Item 2'},
  {id: '3', nome: 'Item 3'},
];

<FlatList
  data={dados}
  keyExtractor={item => item.id}
  renderItem={({item}) => <Text>{item.nome}</Text>}
/>
```

---

## 2. Estilização com StyleSheet

### Criar estilos:

```typescript
import {StyleSheet, View, Text} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Olá!</Text>
      <Text style={styles.subtitulo}>Bem-vindo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
  },
});
```

### Propriedades de estilo comuns:

```typescript
// Layout
flex: 1,
flexDirection: 'row',      // 'column', 'row', 'row-reverse', 'column-reverse'
justifyContent: 'center',  // 'flex-start', 'flex-end', 'space-between', 'space-around'
alignItems: 'center',      // 'flex-start', 'flex-end', 'stretch'

// Tamanho
width: 100,
height: 100,
minWidth: 50,
maxWidth: 200,

// Espaçamento
margin: 10,
marginTop: 10,
marginHorizontal: 10,  // left e right
marginVertical: 10,    // top e bottom
padding: 10,
paddingHorizontal: 10,

// Borda
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 10,

// Cor e fundo
backgroundColor: '#fff',
color: '#000',

// Texto
fontSize: 16,
fontWeight: 'bold',      // 'normal', 'bold', '100' - '900'
textAlign: 'center',     // 'left', 'right', 'justify'
```

---

## 3. Estados (useState)

### Gerenciar valores que mudam:

```typescript
import {useState} from 'react';
import {View, Text, Button} from 'react-native';

const App = () => {
  const [contador, setContador] = useState(0);

  return (
    <View>
      <Text>Contador: {contador}</Text>
      <Button
        title="Aumentar"
        onPress={() => setContador(contador + 1)}
      />
      <Button
        title="Diminuir"
        onPress={() => setContador(contador - 1)}
      />
    </View>
  );
};
```

---

## 4. Exemplo Completo: App de Tarefas Simples

Substitua o conteúdo do seu `App.tsx`:

```typescript
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

interface Tarefa {
  id: string;
  texto: string;
}

function App(): JSX.Element {
  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const adicionarTarefa = () => {
    if (tarefa.trim()) {
      const novaTarefa: Tarefa = {
        id: Date.now().toString(),
        texto: tarefa,
      };
      setTarefas([...tarefas, novaTarefa]);
      setTarefa('');
    }
  };

  const removerTarefa = (id: string) => {
    setTarefas(tarefas.filter(t => t.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>📝 Minhas Tarefas</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa..."
          value={tarefa}
          onChangeText={setTarefa}
        />
        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.tarefaItem}>
            <Text style={styles.tarefaTexto}>{item.texto}</Text>
            <TouchableOpacity
              onPress={() => removerTarefa(item.id)}
              style={styles.botaoRemover}>
              <Text style={styles.botaoRemoverTexto}>×</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>Nenhuma tarefa ainda</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  botaoAdicionar: {
    backgroundColor: '#007AFF',
    width: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  tarefaItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tarefaTexto: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  botaoRemover: {
    backgroundColor: '#FF3B30',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoRemoverTexto: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listaVazia: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 50,
  },
});

export default App;
```

### Teste o app:

1. Salve o arquivo
2. Fast Refresh atualiza automaticamente
3. Digite uma tarefa e clique no botão "+"
4. Tarefas aparecem na lista
5. Clique no "×" para remover

---

## 5. Adicionar Ícones

### Instalar biblioteca de ícones:

```powershell
npm install react-native-vector-icons
```

### Configurar (Android):

**Arquivo:** `android/app/build.gradle`

Adicione no final do arquivo:

```gradle
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

### Recompilar:

```powershell
npm run android
```

### Usar ícones:

```typescript
import Icon from 'react-native-vector-icons/Ionicons';

<Icon name="home" size={30} color="#000" />
<Icon name="add-circle" size={30} color="blue" />
<Icon name="trash" size={25} color="red" />
```

### Encontrar ícones disponíveis:

Acesse: https://oblador.github.io/react-native-vector-icons/

---

## 6. Navegação Entre Telas

### Instalar React Navigation:

```powershell
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
```

### Configurar:

**Arquivo:** `android/app/src/main/java/com/nativeapp/MainActivity.java`

Adicione no topo (depois dos imports):

```java
import android.os.Bundle;

@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(null);
}
```

### Exemplo com duas telas:

```typescript
import React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Tela Inicial
function TelaInicial({navigation}: any) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Tela Inicial</Text>
      <Button
        title="Ir para Detalhes"
        onPress={() => navigation.navigate('Detalhes')}
      />
    </View>
  );
}

// Tela de Detalhes
function TelaDetalhes({navigation}: any) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Tela de Detalhes</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

// App Principal
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicial" component={TelaInicial} />
        <Stack.Screen name="Detalhes" component={TelaDetalhes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```

---

## 7. Fazer Requisições HTTP (API)

### Usando fetch:

```typescript
import {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

function App() {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(json => {
        setDados(json);
        setCarregando(false);
      })
      .catch(error => {
        console.error(error);
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <Text>{dados?.title}</Text>
      <Text>{dados?.body}</Text>
    </View>
  );
}
```

---

## 8. Armazenar Dados Localmente

### Usando AsyncStorage:

```powershell
npm install @react-native-async-storage/async-storage
```

### Salvar e ler dados:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Salvar
const salvarDados = async () => {
  try {
    await AsyncStorage.setItem('nome', 'João');
    console.log('Salvo!');
  } catch (error) {
    console.error(error);
  }
};

// Ler
const lerDados = async () => {
  try {
    const valor = await AsyncStorage.getItem('nome');
    if (valor !== null) {
      console.log('Valor:', valor);
    }
  } catch (error) {
    console.error(error);
  }
};

// Remover
const removerDados = async () => {
  try {
    await AsyncStorage.removeItem('nome');
  } catch (error) {
    console.error(error);
  }
};
```

---

## 9. Dicas de Performance

### Use FlatList ao invés de ScrollView para listas longas

❌ **Ruim:**
```typescript
<ScrollView>
  {items.map(item => <ItemComponent key={item.id} />)}
</ScrollView>
```

✅ **Bom:**
```typescript
<FlatList
  data={items}
  keyExtractor={item => item.id}
  renderItem={({item}) => <ItemComponent item={item} />}
/>
```

### Use React.memo para evitar re-renders desnecessários

```typescript
const ItemComponent = React.memo(({item}) => {
  return <Text>{item.nome}</Text>;
});
```

### Use useCallback para funções

```typescript
const handlePress = useCallback(() => {
  console.log('Pressionado');
}, []);
```

---

## 10. Recursos Úteis

### Documentação oficial:
- React Native: https://reactnative.dev/docs/getting-started
- React Navigation: https://reactnavigation.org/

### Bibliotecas populares:
- **Ícones:** react-native-vector-icons
- **Navegação:** @react-navigation/native
- **Formulários:** react-hook-form
- **HTTP:** axios
- **Estado global:** zustand, redux
- **UI Components:** react-native-paper, native-base

---

## ✅ Checklist de Desenvolvimento

- [ ] Entendi os componentes básicos (View, Text, Button)
- [ ] Sei estilizar com StyleSheet
- [ ] Sei usar useState para estados
- [ ] Criei um exemplo funcional
- [ ] Consigo adicionar bibliotecas com npm
- [ ] Sei fazer navegação entre telas
- [ ] Sei fazer requisições HTTP
- [ ] Sei armazenar dados localmente

---

## 📚 Próximo Passo

Vá para **07-build-apk.md** para aprender a gerar o APK final e instalar no celular sem cabo USB!

