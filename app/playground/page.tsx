export default function Playground() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '40px', 
      background: '#032213', 
      color: '#F5D36B', 
      fontFamily: 'system-ui' 
    }}>
      <h1 style={{ fontSize: '2rem', borderBottom: '1px solid #10B981', paddingBottom: '10px' }}>
        DEVELOPMENT PLAYGROUND
      </h1>
      <p style={{ color: '#10B981', marginBottom: '30px' }}>Authorized Access Only</p>
      
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '15px' }}>
            <a href="/playground/tax-tool" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem' }}>
              → Tax Strategist Pro
            </a>
          </li>
          <li>
            <a href="/playground/global-swing" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem' }}>
              → Global Swing Matrix
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
