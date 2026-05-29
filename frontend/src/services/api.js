export async function loadGameState() {
  // Exemplo de carga inicial. Substituir por chamada real ao back-end depois.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        playerName: 'Operadora',
        energy: 100,
        signalStrength: 76,
        missionStatus: 'Aguardando',
        lastAction: 'Sistema pronto para iniciar.',
        isStealth: false,
      });
    }, 500);
  });
}

export async function sendGameCommand(commandId) {
  // Simula envio de comando. Trocar por fetch/axios no back-end.
  return new Promise((resolve) => {
    setTimeout(() => {
      const responses = {
        startMission: {
          message: 'Missão iniciada com sucesso.',
          description: 'A primeira etapa foi carregada. Fique atento às condições de energia e sinal.',
        },
        sendSOS: {
          message: 'Pedido de ajuda enviado.',
          description: 'O SOS foi transmitido ao centro de monitoramento. Aguarde confirmação.',
        },
        checkBattery: {
          message: 'Bateria verificada.',
          description: 'Nível de energia atualizado. Continue realizando ações com prudência.',
        },
        toggleStealth: {
          message: 'Modo discreto alternado.',
          description: 'A visibilidade do dispositivo foi ajustada para uso furtivo.',
        },
      };

      resolve(responses[commandId] || {
        message: 'Comando não reconhecido.',
        description: 'O comando ainda não está implementado no front-end.',
      });
    }, 300);
  });
}
