function StatusCard({ label, value }) {
  return (
    <div className="status-card">
      <h4>{label}</h4>
      <p>{value}</p>
    </div>
  );
}

export default StatusCard;
