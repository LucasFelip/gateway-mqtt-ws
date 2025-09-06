# Gateway MQTT para WebSocket do LSDI

Este projeto é um gateway "somente leitura" que permite conectar suas aplicações web aos dados em tempo real do broker MQTT do LSDI, de forma fácil e segura.

## O que ele faz?

- **Conecta-se** ao broker público do LSDI (`lsdi.ufma.br:1883`).
- **Cria uma ponte (bridge)** que espelha todos os tópicos MQTT para um broker local.
- **Expõe os dados** através de uma interface **WebSocket** na sua máquina (`ws://localhost:8083`).
- **Bloqueia publicações**: Sua aplicação pode ler os dados, mas não pode enviar nada de volta para o LSDI, garantindo a integridade dos dados na origem.

## Pré-requisitos

Você só precisa ter o **Docker** e o **Docker Compose** instalados na sua máquina.

## Como Rodar (Em 2 Passos!)

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/LucasFelip/gateway-mqtt-ws.git
    ```

2.  **Inicie o gateway:**

    Navegue até a pasta do projeto e execute o comando:

    ```bash
    cd gateway-mqtt-ws
    docker compose up -d
    ```

**Pronto!** O gateway já está rodando na sua máquina.

## Como Usar

Agora que o gateway está ativo, você pode consumir os dados de duas formas:

### 1. Visualizando Todos os Dados

O projeto já vem com uma página de visualização simples para você ver tudo o que está passando pelo broker do LSDI em tempo real.

- **Abra o arquivo `web-page-test/index.html` diretamente no seu navegador.**

Você verá uma tabela com os dados chegando, incluindo horário, tópico e o conteúdo da mensagem (payload).

### 2. Consumindo na Sua Aplicação

Para usar os dados no seu próprio projeto (seja em React, Vue, Angular ou JavaScript puro), basta se conectar ao endpoint WebSocket local e se inscrever no tópico desejado.

Use uma biblioteca MQTT para WebSocket, como a [MQTT.js](https://github.com/mqttjs/MQTT.js).

**Exemplo de código em JavaScript:**

```javascript
// Importe a biblioteca
import mqtt from 'mqtt'; // ou use <script src="..."></script>

// Conecte-se ao gateway local
const client = mqtt.connect('ws://localhost:8083');

client.on('connect', () => {
  console.log('Conectado ao gateway com sucesso!');

  // Agora, inscreva-se no tópico específico que sua aplicação precisa
  // Exemplo: ouvir dados de um sensor de temperatura específico
  const meuTopico = 'hdt/lab/1/temperatura';

  client.subscribe(meuTopico, (err) => {
    if (!err) {
      console.log(`Inscrito no tópico: ${meuTopico}`);
    }
  });
});

// Ouça as mensagens que chegam no tópico que você assinou
client.on('message', (topic, payload) => {
  console.log(`Mensagem recebida no tópico ${topic}: ${payload.toString()}`);

  // Aqui você faz o que precisar com os dados!
  // Por exemplo, atualizar um gráfico, mostrar um alerta, etc.
  const dados = JSON.parse(payload.toString());
  // ... sua lógica ...
});
```

## Parando o Gateway

Quando não precisar mais do gateway, volte ao terminal na pasta do projeto e execute:

```bash
docker compose down
```

Isso irá parar e remover o contêiner do gateway.

