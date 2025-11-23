#!/bin/bash
# Script para conectar dispositivo Android via WiFi no WSL2

echo "========================================"
echo "Conectar Android via WiFi (ADB)"
echo "========================================"

export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Verificar se ADB está disponível
if [ ! -f "$ANDROID_HOME/platform-tools/adb" ]; then
    echo "❌ ERRO: ADB não encontrado!"
    echo "Reinstale o Android SDK"
    exit 1
fi

# Função para primeira conexão (requer USB)
first_connect() {
    echo ""
    echo "========================================="
    echo "PRIMEIRA CONEXÃO (requer cabo USB)"
    echo "========================================="
    echo ""
    echo "✅ Certifique-se que:"
    echo "   1. Celular está conectado via USB"
    echo "   2. USB Debugging está ativado"
    echo "   3. Você autorizou o computador no celular"
    echo "   4. Celular e PC estão na mesma rede WiFi"
    echo ""
    read -p "Tudo configurado? (s/N): " confirm
    
    if [ "$confirm" != "s" ] && [ "$confirm" != "S" ]; then
        echo "Abortado"
        exit 0
    fi
    
    echo ""
    echo "📱 Dispositivos USB conectados:"
    $ANDROID_HOME/platform-tools/adb devices
    
    echo ""
    echo "🔧 Reiniciando ADB em modo TCP (porta 5555)..."
    $ANDROID_HOME/platform-tools/adb tcpip 5555
    
    sleep 2
    
    echo ""
    echo "📍 Obtenha o IP do seu celular:"
    echo "   Configurações → Sobre o telefone → Status → Endereço IP"
    echo "   Ou: Configurações → Wi-Fi → (toque na rede conectada)"
    echo ""
    read -p "Digite o IP do celular (ex: 192.168.1.100): " device_ip
    
    if [ -z "$device_ip" ]; then
        echo "❌ IP inválido!"
        exit 1
    fi
    
    echo ""
    echo "🔌 DESCONECTE o cabo USB do celular agora!"
    read -p "Pressione ENTER após desconectar..."
    
    echo ""
    echo "📡 Conectando ao dispositivo via WiFi..."
    $ANDROID_HOME/platform-tools/adb connect "${device_ip}:5555"
    
    sleep 2
    
    echo ""
    echo "✅ Dispositivos conectados:"
    $ANDROID_HOME/platform-tools/adb devices -l
    
    # Salvar IP para reconexão
    echo "$device_ip" > ~/.android-device-ip
    
    echo ""
    echo "========================================="
    echo "✅ Configuração WiFi concluída!"
    echo "========================================="
    echo ""
    echo "💡 Para reconectar no futuro, execute:"
    echo "   ./connect-android.sh"
}

# Função para reconectar
reconnect() {
    echo ""
    echo "🔄 Reconectando dispositivo..."
    
    # Tentar ler IP salvo
    if [ -f ~/.android-device-ip ]; then
        device_ip=$(cat ~/.android-device-ip)
        echo "📍 Usando IP salvo: $device_ip"
    else
        read -p "Digite o IP do dispositivo: " device_ip
    fi
    
    if [ -z "$device_ip" ]; then
        echo "❌ IP inválido!"
        exit 1
    fi
    
    echo "📡 Conectando..."
    $ANDROID_HOME/platform-tools/adb connect "${device_ip}:5555"
    
    sleep 1
    
    echo ""
    echo "✅ Dispositivos conectados:"
    $ANDROID_HOME/platform-tools/adb devices -l
}

# Verificar se já existe conexão
connected_devices=$($ANDROID_HOME/platform-tools/adb devices | grep -v "List" | grep -v "^$" | wc -l)

if [ "$connected_devices" -gt 0 ]; then
    echo ""
    echo "📱 Dispositivos já conectados:"
    $ANDROID_HOME/platform-tools/adb devices -l
    echo ""
    read -p "Deseja reconectar? (s/N): " choice
    if [ "$choice" = "s" ] || [ "$choice" = "S" ]; then
        reconnect
    fi
else
    if [ -f ~/.android-device-ip ]; then
        reconnect
    else
        first_connect
    fi
fi

echo ""
echo "🎯 Agora você pode executar:"
echo "   npm run android"

