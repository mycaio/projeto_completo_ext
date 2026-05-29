function Header({ title, subtitle }) {
  return (
    <header className="header-bar">
      <div>
        <p className="eyebrow">Protótipo React</p>
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </div>
    </header>
  );
}

export default Header;
