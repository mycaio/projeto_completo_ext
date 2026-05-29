import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import StatusCard from './components/StatusCard.jsx';
import ActionPanel from './components/ActionPanel.jsx';
import { loadGameState, sendGameCommand } from './services/api.js';

const initialActions = [
  { id: 'startMission', label: 'Iniciar Missão', description: 'Começa a primeira rodada do jogo.' },
  { id: 'sendSOS', label: 'Enviar SOS', description: 'Aciona o pedido de ajuda discreto.' },
  { id: 'checkBattery', label: 'Checar Bateria', description: 'Verifica seu nível de energia/recursos.' },
  { id: 'toggleStealth', label: 'Modo Discreto', description: 'Ativa ou desativa o modo furtivo.' },
];

function App() {
  const [playerName, setPlayerName] = useState('Agente');
  const [missionStatus, setMissionStatus] = useState('Aguardando');
  const [lastAction, setLastAction] = useState('Nenhuma ação realizada ainda.');
  const [energy, setEnergy] = useState(100);
  const [signalStrength, setSignalStrength] = useState(76);
  const [isStealth, setIsStealth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('Carregando o painel de controle...');

  useEffect(() => {
    async function initialize() {
      setIsLoading(true);
      const saved = await loadGameState();
      setPlayerName(saved.playerName);
      setEnergy(saved.energy);
      setSignalStrength(saved.signalStrength);
      setMissionStatus(saved.missionStatus);
      setLastAction(saved.lastAction);
      setIsStealth(saved.isStealth);
      setMessage('Painel pronto. Use os comandos para avançar.');
      setIsLoading(false);
    }

    initialize();
  }, []);

  const statusCards = useMemo(
    () => [
      { label: 'Missão', value: missionStatus },
      { label: 'Energia', value: `${energy}%` },
      { label: 'Sinal', value: `${signalStrength}%` },
      { label: 'Discrição', value: isStealth ? 'Ativo' : 'Desativado' },
    ],
    [missionStatus, energy, signalStrength, isStealth]
  );

  const handleAction = async (actionId) => {
    if (isLoading) return;

    const result = await sendGameCommand(actionId);
    setLastAction(result.message);
    setMessage(result.description);

    switch (actionId) {
      case 'startMission':
        setMissionStatus('Em andamento');
        setEnergy((prev) => Math.max(prev - 12, 0));
        break;
      case 'sendSOS':
        setSignalStrength(100);
        break;
      case 'checkBattery':
        setEnergy((prev) => Math.min(prev + 5, 100));
        break;
      case 'toggleStealth':
        setIsStealth((prev) => !prev);
        break;
      default:
        break;
    }
  };

  return (
    <div className="app-shell">
      <Header
        title="LIGA JÁ - Front-end Interativo"
        subtitle="Exemplo de comunicação com o jogo usando useEffect, useState e props."
      />
      <main className="content">
        <section className="hero-card">
          <h2>Olá, {playerName}</h2>
          <p className="hero-text">
            Use os comandos abaixo para iniciar a experiência. Os primeiros estados já estão prontos e podem ser
            integrados com o back-end mais tarde.
          </p>
        </section>

        <section className="grid status-grid">
          {statusCards.map((item) => (
            <StatusCard key={item.label} label={item.label} value={item.value} />
          ))}
        </section>

        <section className="grid action-grid">
          <ActionPanel actions={initialActions} onAction={handleAction} disabled={isLoading} />
          <div className="log-panel">
            <h3>Última Resposta</h3>
            <p>{lastAction}</p>
            <div className="message-box">{message}</div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
