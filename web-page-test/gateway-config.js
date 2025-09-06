// Configuração do gateway-broker
window.GATEWAY_CONFIG = {
    // Para seu Mosquitto gateway local (dev):
    url: 'ws://localhost:8083/',   // URL do broker MQTT (WebSocket)
    topicFilter: '#',              // tópico(s) a assinar (ex.: 'sensor/#', 'hdt/events', etc.)
    clientIdPrefix: 'webtest_',    // prefixo pro clientId
    username: null,                // defina se habilitar auth no gateway
    password: null,                // defina se habilitar auth no gateway
    keepalive: 60,
    reconnectPeriod: 2000,         // ms
    protocolVersion: 4             // MQTT 3.1.1
};
