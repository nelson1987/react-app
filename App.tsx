/*
React Native (Android) - App bancário (conversão do projeto React web)
Arquivo: App.js (single-file demo) - modularize em produção

Funcionalidades incluídas:
- Telas: Login, Home, Transferência, Extrato, Cartões, Pagamento, Pix
- Serviços: apiService (modo demo + fetch para API real), authService (AsyncStorage), formatters, masks
- UI: componentes simples em React Native (Button, Card, Input)
- Tempo real: cliente WebSocket (socket.io-client) para atualizações em tempo real (ex.: novo extrato)
- Push Notifications: integração com Firebase Cloud Messaging (@react-native-firebase/messaging)

OBS: Este arquivo é um ponto de partida. Em um projeto real você deve separar arquivos, tratar erros, adicionar estilos e testes.

Instalação (projeto React Native CLI - Android):
1) npx react-native init BancoRN
2) cd BancoRN
3) yarn add @react-native-async-storage/async-storage socket.io-client @react-navigation/native @react-navigation/native-stack react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-firebase/app @react-native-firebase/messaging
4) npx pod-install (se iOS também) - aqui foco Android

Configurar Firebase (Android):
- Criar projeto no Firebase Console
- Adicionar app Android (package name)
- Baixar google-services.json e colocar em android/app/
- Seguir docs para react-native-firebase: adicionar plugin no android/build.gradle e android/app/build.gradle
- Permissões: no AndroidManifest.xml adicionar RECEIVE_BOOT_COMPLETED se necessário

Push notifications (como funciona):
- App registra token FCM com messaging().getToken()
- Servidor (sua API) deve armazenar token e enviar mensagens via FCM quando houver evento (ex.: nova transação)
- Mensagens podem ser notificações (display) ou dados (data messages) para manipulação no app

Real-time (WebSocket):
- Código inclui cliente socket.io que conecta em CONFIG.API_WS (p.ex. ws://seu-servidor)
- Em modo demo websocket não é necessário, mas o cliente tenta conectar se existir URL

Próximos passos:
- Separar arquivos por pasta (screens/, services/, components/)
- Configurar envio no servidor usando FCM
- Ajustar permissões Android e ícone da notificação (drawable)

Abaixo criei o conteúdo do App.js com comentários explicativos. Abra o painel de código para copiar/editar.
*/

import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import messaging from '@react-native-firebase/messaging';

// ---------------- CONFIG ----------------
const CONFIG = {
  DEMO_MODE: true,
  API_BASE_URL: 'https://sua-api-banco.com/api',
  API_WS: 'https://sua-api-banco.com', // ws server for socket.io
  DEMO_CREDENTIALS: { cpf: '123.456.789-00', senha: 'demo123' }
};

// ---------------- MOCK DATA (only demo) ----------------
const mockData = { /* Copiar apenas o necessário do original para demo */
  usuario: { nome: 'João Silva', cpf: '123.456.789-00', email: 'joao.silva@email.com' },
  saldo: { disponivel: 5847.32, bloqueado: 150.00, agencia: '1234', conta: '56789-0', faturaCartao: 1234.56, vencimentoFatura: '15/12/2024' },
  extrato: [
    { id: 1, tipo: 'recebimento', descricao: 'Transferência recebida', valor: 500.00, data: '2024-11-22T10:30:00', origem: 'Maria Santos' },
    { id: 2, tipo: 'transferencia', descricao: 'Transferência enviada', valor: 200.00, data: '2024-11-21T14:20:00', destino: 'Pedro Costa' },
    { id: 3, tipo: 'pagamento', descricao: 'Pagamento de conta', valor: 150.00, data: '2024-11-20T09:15:00', beneficiario: 'Companhia de Energia' }
  ],
  cartoes: [ { id:1, tipo:'Crédito Internacional', numero:'5412751234567890', titular:'JOAO SILVA', validade:'12/28', limite:5000, limiteDisponivel:3500 } ]
};

// ---------------- FORMATTERS & MASKS ----------------
const formatters = {
  currency: (value) => {
    try { return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); } catch { return 'R$ 0,00'; }
  },
  date: (d) => { try { return new Date(d).toLocaleDateString('pt-BR'); } catch { return d; } }
};

const masks = {
  onlyNumbers: (v) => v ? v.replace(/\D/g, '') : ''
};

// ---------------- Auth Service (AsyncStorage) ----------------
const authService = {
  async login(token, usuario) {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
  },
  async logout() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('usuario');
  },
  async isAuthenticated() {
    const t = await AsyncStorage.getItem('token');
    return !!t;
  },
  async getUsuario() {
    const u = await AsyncStorage.getItem('usuario');
    return u ? JSON.parse(u) : null;
  }
};

// ---------------- Api Service (adapted) ----------------
class ApiService {
  constructor() { this.demoMode = CONFIG.DEMO_MODE; this.baseURL = CONFIG.API_BASE_URL; }
  async simulateDelay(ms=800) { if (this.demoMode) await new Promise(r=>setTimeout(r, ms)); }
  async login(cpf, senha) {
    const cpfLimpo = masks.onlyNumbers(cpf);
    if (this.demoMode) {
      await this.simulateDelay();
      const demoCpf = masks.onlyNumbers(CONFIG.DEMO_CREDENTIALS.cpf);
      if (cpfLimpo === demoCpf && senha === CONFIG.DEMO_CREDENTIALS.senha) {
        return { token: 'demo-token-'+Date.now(), usuario: mockData.usuario };
      }
      throw new Error('Credenciais inválidas');
    }
    // real API
    const res = await fetch(`${this.baseURL}/auth/login`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ cpf: cpfLimpo, senha }) });
    if (!res.ok) throw new Error('Falha na autenticação');
    return res.json();
  }
  async getSaldo() { if (this.demoMode) { await this.simulateDelay(); return mockData.saldo; } const r = await fetch(`${this.baseURL}/conta/saldo`, { headers: { Authorization: `Bearer ${await AsyncStorage.getItem('token')}` }}); if(!r.ok) throw new Error('Erro'); return r.json(); }
  async getExtrato(periodo=30) { if (this.demoMode) { await this.simulateDelay(); return mockData.extrato; } const r = await fetch(`${this.baseURL}/conta/extrato?dias=${periodo}`, { headers: { Authorization: `Bearer ${await AsyncStorage.getItem('token')}` }}); if(!r.ok) throw new Error('Erro'); return r.json(); }
  async transferir(dados){ if (this.demoMode) { await this.simulateDelay(1200); return { success:true, protocolo:'DEMO-'+Math.random().toString(36).substr(2,9).toUpperCase(), data:new Date().toISOString(), ...dados }; } const r = await fetch(`${this.baseURL}/transferencias`, { method:'POST', headers:{ Authorization: `Bearer ${await AsyncStorage.getItem('token')}`, 'Content-Type':'application/json' }, body: JSON.stringify(dados)}); if(!r.ok) throw new Error('Erro'); return r.json(); }
}
const apiService = new ApiService();

// ---------------- Real-time: socket manager ----------------
const useSocket = (onEvent) => {
  const socketRef = useRef(null);
  useEffect(() => {
    if (!CONFIG.API_WS) return;
    const socket = io(CONFIG.API_WS, { transports: ['websocket'], reconnectionAttempts: 5 });
    socketRef.current = socket;
    socket.on('connect', () => console.log('socket connected', socket.id));
    socket.on('evento-extrato', (payload) => onEvent && onEvent(payload));
    socket.on('disconnect', () => console.log('socket disconnected'));
    return () => { socket.disconnect(); };
  }, []);
  return socketRef;
};

// ---------------- Push: Firebase Cloud Messaging helpers ----------------
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  return enabled;
}

async function registerForFCM() {
  try {
    const hasPermission = await requestUserPermission();
    if (!hasPermission) return null;
    const fcmToken = await messaging().getToken();
    console.log('FCM token:', fcmToken);
    // TODO: enviar token para sua API para associar ao usuário
    return fcmToken;
  } catch (err) {
    console.warn('FCM registration error', err);
    return null;
  }
}

// Handle background messages - this handler must be outside React lifecycle in separate file as per docs
// In android, add in index.js: import './firebase-messaging-handler';
// messaging().setBackgroundMessageHandler(async remoteMessage => { console.log('BG msg', remoteMessage); });

// ---------------- UI primitives (very small) ----------------
const Btn = ({ onPress, title, disabled }) => (
  <TouchableOpacity onPress={onPress} disabled={disabled} style={{ backgroundColor: disabled? '#ccc':'#b91c1c', padding:12, borderRadius:8, alignItems:'center', marginVertical:6 }}>
    <Text style={{ color:'#fff', fontWeight:'600' }}>{title}</Text>
  </TouchableOpacity>
);

const Card = ({ children }) => (
  <View style={{ backgroundColor:'#fff', borderRadius:8, padding:12, marginVertical:8, elevation:2 }}>{children}</View>
);

const Input = ({ label, value, onChangeText, keyboardType='default', secureTextEntry=false }) => (
  <View style={{ marginBottom:8 }}>
    {label && <Text style={{ marginBottom:4 }}>{label}</Text>}
    <TextInput value={value} onChangeText={onChangeText} keyboardType={keyboardType} secureTextEntry={secureTextEntry} style={{ borderWidth:1, borderColor:'#ddd', padding:10, borderRadius:6 }} />
  </View>
);

// ---------------- Screens ----------------

const LoginScreen = ({ onLogin }) => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const only = masks.onlyNumbers(cpf);
    if (only.length !== 11 && only.length !== 14) { Alert.alert('Erro','CPF/CNPJ inválido'); return; }
    setLoading(true);
    try {
      const data = await apiService.login(cpf, senha);
      await authService.login(data.token, data.usuario);
      onLogin();
    } catch (err) { Alert.alert('Erro','CPF/CNPJ ou senha inválidos'); }
    finally { setLoading(false); }
  };

  return (
    <SafeAreaView style={{ flex:1, padding:16, justifyContent:'center' }}>
      <Card>
        <Text style={{ fontSize:22, fontWeight:'700', marginBottom:6 }}>Banco Digital</Text>
        {CONFIG.DEMO_MODE && <Text style={{ color:'#b45309', marginBottom:8 }}>Modo demo: {CONFIG.DEMO_CREDENTIALS.cpf} / {CONFIG.DEMO_CREDENTIALS.senha}</Text>}
        <Input label="CPF ou CNPJ" value={cpf} onChangeText={(t)=>setCpf(t)} keyboardType='numeric' />
        <Input label="Senha" value={senha} onChangeText={(t)=>setSenha(t)} secureTextEntry />
        <Btn title={loading? 'Entrando...':'Entrar'} onPress={handleLogin} disabled={loading} />
      </Card>
    </SafeAreaView>
  );
};

const HomeScreen = ({ onNavigate, onLogout }) => {
  const [saldo, setSaldo] = useState(null);
  const [extrato, setExtrato] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSaldo, setShowSaldo] = useState(true);

  useEffect(() => { loadData(); }, []);
  const loadData = async () => {
    setLoading(true);
    try { const s = await apiService.getSaldo(); const e = await apiService.getExtrato(7); setSaldo(s); setExtrato(e.slice(0,3)); }
    catch(e){ console.warn(e); }
    finally{ setLoading(false); }
  };

  return (
    <SafeAreaView style={{ flex:1 }}>
      <ScrollView contentContainerStyle={{ padding:16 }}>
        <View style={{ backgroundColor:'#b91c1c', padding:16, borderRadius:8, marginBottom:12 }}>
          <Text style={{ color:'#fff', fontSize:18 }}>Olá,</Text>
          <Text style={{ color:'#fff', fontSize:22, fontWeight:'700' }}>{/* usuario */}</Text>
          <TouchableOpacity onPress={onLogout} style={{ position:'absolute', right:12, top:12 }}><Text style={{ color:'#fff' }}>Sair</Text></TouchableOpacity>
        </View>

        <Card>
          <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
            <View>
              <Text style={{ color:'#6b7280' }}>Saldo disponível</Text>
              {loading ? <ActivityIndicator /> : <Text style={{ fontSize:24, fontWeight:'700' }}>{ showSaldo? formatters.currency(saldo?.disponivel || 0) : '••••••' }</Text> }
            </View>
            <TouchableOpacity onPress={()=>setShowSaldo(!showSaldo)} style={{ padding:8 }}><Text>{showSaldo? 'Ocultar':'Mostrar'}</Text></TouchableOpacity>
          </View>
        </Card>

        <Card>
          <Text style={{ fontWeight:'700', marginBottom:8 }}>Últimas transações</Text>
          {loading ? <ActivityIndicator /> : (
            extrato.map(i => (
              <View key={i.id} style={{ flexDirection:'row', justifyContent:'space-between', paddingVertical:8, borderBottomWidth:1, borderBottomColor:'#eee' }}>
                <View>
                  <Text style={{ fontWeight:'600' }}>{i.descricao}</Text>
                  <Text style={{ color:'#6b7280' }}>{formatters.date(i.data)}</Text>
                </View>
                <Text style={{ fontWeight:'700' }}>{(i.tipo==='recebimento'?'+ ':'- ')+formatters.currency(i.valor)}</Text>
              </View>
            ))
          )}
        </Card>

        <Btn title="Transferir" onPress={() => onNavigate('transferencia')} />
        <Btn title="Extrato" onPress={() => onNavigate('extrato')} />
        <Btn title="Cartões" onPress={() => onNavigate('cartoes')} />
      </ScrollView>
    </SafeAreaView>
  );
};

const TransferenciaScreen = ({ onBack }) => {
  const [dados, setDados] = useState({ tipo:'ted', banco:'', agencia:'', conta:'', cpfCnpj:'', nome:'', valor:'' });
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(null);

  const handleTransferir = async () => {
    setLoading(true);
    try{
      const res = await apiService.transferir(dados);
      setSucesso(res);
    }catch(e){ Alert.alert('Erro','Erro ao transferir'); }
    finally{ setLoading(false); }
  };

  if (sucesso) return (
    <SafeAreaView style={{ flex:1, padding:16 }}>
      <Card>
        <Text style={{ fontSize:20, fontWeight:'700' }}>Transferência realizada!</Text>
        <Text>Protocolo: {sucesso.protocolo}</Text>
        <Btn title="Voltar" onPress={onBack} />
      </Card>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={{ flex:1, padding:16 }}>
      <Card>
        <Text style={{ fontSize:18, fontWeight:'700' }}>Dados do destinatário</Text>
        <Input label="Banco" value={dados.banco} onChangeText={(t)=>setDados({...dados,banco:t})} />
        <Input label="Agência" value={dados.agencia} onChangeText={(t)=>setDados({...dados,agencia:t})} />
        <Input label="Conta" value={dados.conta} onChangeText={(t)=>setDados({...dados,conta:t})} />
        <Input label="CPF/CNPJ" value={dados.cpfCnpj} onChangeText={(t)=>setDados({...dados,cpfCnpj:t})} />
        <Input label="Nome" value={dados.nome} onChangeText={(t)=>setDados({...dados,nome:t})} />
        <Input label="Valor" value={dados.valor} onChangeText={(t)=>setDados({...dados,valor:t})} keyboardType='numeric' />
        <Btn title={loading? 'Processando...':'Transferir'} onPress={handleTransferir} disabled={loading} />
        <Btn title="Voltar" onPress={onBack} />
      </Card>
    </SafeAreaView>
  );
};

const ExtratoScreen = ({ onBack }) => {
  const [extrato, setExtrato] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ load(); }, []);
  const load = async () => { setLoading(true); try{ const data = await apiService.getExtrato(30); setExtrato(data); }catch(e){ console.warn(e);} finally { setLoading(false);} };

  return (
    <SafeAreaView style={{ flex:1, padding:16 }}>
      <Card>
        <Text style={{ fontSize:20, fontWeight:'700' }}>Extrato</Text>
        {loading? <ActivityIndicator/> : (
          <FlatList data={extrato} keyExtractor={(i)=>String(i.id)} renderItem={({item})=> (
            <View style={{ paddingVertical:8, borderBottomWidth:1, borderBottomColor:'#eee' }}>
              <Text style={{ fontWeight:'700' }}>{item.descricao}</Text>
              <Text style={{ color:'#6b7280' }}>{formatters.date(item.data)}</Text>
              <Text style={{ fontWeight:'700' }}>{formatters.currency(item.valor)}</Text>
            </View>
          )} />
        )}
        <Btn title="Voltar" onPress={onBack} />
      </Card>
    </SafeAreaView>
  );
};

const CartoesScreen = ({ onBack }) => {
  const [cartoes, setCartoes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ setCartoes(mockData.cartoes); setLoading(false); }, []);
  return (
    <SafeAreaView style={{ flex:1, padding:16 }}>
      <Card>
        <Text style={{ fontSize:20, fontWeight:'700' }}>Meus Cartões</Text>
        {loading? <ActivityIndicator/> : cartoes.map(c=> (
          <View key={c.id} style={{ paddingVertical:12 }}>
            <Text style={{ fontWeight:'700' }}>{c.tipo}</Text>
            <Text>{'**** **** **** ' + String(c.numero).slice(-4)}</Text>
          </View>
        ))}
        <Btn title="Voltar" onPress={onBack} />
      </Card>
    </SafeAreaView>
  );
};

// ---------------- App (Router simples) ----------------
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [route, setRoute] = useState('home');

  useEffect(()=>{ (async()=>{ const auth = await authService.isAuthenticated(); setIsAuthenticated(auth); })();
  // Register FCM
  (async ()=>{ const t = await registerForFCM(); if(t) console.log('token registered'); })();
  // foreground message handler
  const unsubscribeMessage = messaging().onMessage(async remoteMessage => {
    Alert.alert(remoteMessage.notification?.title || 'Notificação', remoteMessage.notification?.body || JSON.stringify(remoteMessage.data));
  });

  return () => { unsubscribeMessage(); };
  }, []);

  const handleLogin = () => { setIsAuthenticated(true); setRoute('home'); };
  const handleLogout = async () => { await authService.logout(); setIsAuthenticated(false); setRoute('home'); };

  if (!isAuthenticated) return <LoginScreen onLogin={handleLogin} />;

  const routes = {
    home: <HomeScreen onNavigate={(r)=>setRoute(r)} onLogout={handleLogout} />,
    transferencia: <TransferenciaScreen onBack={()=>setRoute('home')} />,
    extrato: <ExtratoScreen onBack={()=>setRoute('home')} />,
    cartoes: <CartoesScreen onBack={()=>setRoute('home')} />
  };

  return routes[route] || routes.home;
}
