function ActionPanel({ actions, onAction, disabled }) {
  return (
    <div className="action-panel">
      <h3>Comandos</h3>
      <div className="actions-list">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            className="action-button"
            onClick={() => onAction(action.id)}
            disabled={disabled}
          >
            <span>{action.label}</span>
            <small>{action.description}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ActionPanel;
