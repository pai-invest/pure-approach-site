export default function Maintenance() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#032213',
      color: '#F5D36B',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '0.1em' }}>
        PURE APPROACH INVESTMENTS
      </h1>
      <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#10B981' }}>
        Infrastructure Upgrade in Progress
      </p>
      <div style={{ marginTop: '30px', maxWidth: '400px', fontSize: '0.9rem', color: '#F5D36B80' }}>
        <p>
          The Vault and Public Utilities suite are currently undergoing institutional-grade security and logic hardening. 
          Access will be restored upon completion.
        </p>
      </div>
    </div>
  );
}
