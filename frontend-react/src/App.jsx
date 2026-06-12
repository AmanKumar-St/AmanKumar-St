import React, { useState, useEffect } from 'react';

function App() {
  const [nodeStatus, setNodeStatus] = useState({ loading: true, data: null, error: null });
  const [pythonStatus, setPythonStatus] = useState({ loading: true, data: null, error: null });

  const fetchNodeHealth = async () => {
    setNodeStatus(prev => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetch('/api/node/health');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setNodeStatus({ loading: false, data, error: null });
    } catch (e) {
      setNodeStatus({ loading: false, data: null, error: e.message });
    }
  };

  const fetchPythonHealth = async () => {
    setPythonStatus(prev => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetch('/api/python/health');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setPythonStatus({ loading: false, data, error: null });
    } catch (e) {
      setPythonStatus({ loading: false, data: null, error: e.message });
    }
  };

  useEffect(() => {
    fetchNodeHealth();
    fetchPythonHealth();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoText}>AK</span>
        </div>
        <h1 style={styles.title}>Portfolio Dashboard <span style={styles.tag}>React Service</span></h1>
        <p style={styles.subtitle}>Containerized Multi-Stack Developer Environment</p>
      </header>

      <main style={styles.main}>
        <div style={styles.grid}>
          {/* Node.js Card */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.serviceIndicator(nodeStatus.data ? 'active' : nodeStatus.error ? 'error' : 'loading')}></div>
              <h2 style={styles.cardTitle}>Node.js Service</h2>
            </div>
            <p style={styles.cardDesc}>Express API Server (Port 5000)</p>
            
            <div style={styles.statusBox}>
              {nodeStatus.loading && <p style={styles.infoText}>Connecting to service...</p>}
              {nodeStatus.error && (
                <div style={styles.errorContainer}>
                  <p style={styles.errorText}>Connection Failed</p>
                  <code style={styles.code}>{nodeStatus.error}</code>
                </div>
              )}
              {nodeStatus.data && (
                <div>
                  <p style={styles.successText}>✓ Connected successfully</p>
                  <p style={styles.statLine}><strong>Status:</strong> {nodeStatus.data.status}</p>
                  <p style={styles.statLine}><strong>Version:</strong> {nodeStatus.data.version}</p>
                  <p style={styles.statLine}><strong>DB Status:</strong> {nodeStatus.data.database ? 'CONNECTED' : 'FAILED'}</p>
                  <p style={styles.statLine}><strong>Uptime:</strong> {Math.round(nodeStatus.data.uptime)}s</p>
                </div>
              )}
            </div>
            
            <button style={styles.btn} onClick={fetchNodeHealth}>Reload Node Connection</button>
          </div>

          {/* Python Card */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.serviceIndicator(pythonStatus.data ? 'active' : pythonStatus.error ? 'error' : 'loading')}></div>
              <h2 style={styles.cardTitle}>Python Service</h2>
            </div>
            <p style={styles.cardDesc}>FastAPI Web Server (Port 8000)</p>
            
            <div style={styles.statusBox}>
              {pythonStatus.loading && <p style={styles.infoText}>Connecting to service...</p>}
              {pythonStatus.error && (
                <div style={styles.errorContainer}>
                  <p style={styles.errorText}>Connection Failed</p>
                  <code style={styles.code}>{pythonStatus.error}</code>
                </div>
              )}
              {pythonStatus.data && (
                <div>
                  <p style={styles.successText}>✓ Connected successfully</p>
                  <p style={styles.statLine}><strong>Status:</strong> {pythonStatus.data.status}</p>
                  <p style={styles.statLine}><strong>Engine:</strong> FastAPI</p>
                  <p style={styles.statLine}><strong>DB Connection:</strong> {pythonStatus.data.database ? 'CONNECTED' : 'FAILED'}</p>
                  <p style={styles.statLine}><strong>Postgres Version:</strong> {pythonStatus.data.db_version || 'N/A'}</p>
                </div>
              )}
            </div>
            
            <button style={styles.btn} onClick={fetchPythonHealth}>Reload Python Connection</button>
          </div>
        </div>

        {/* Info / Quick Links */}
        <section style={styles.infoSection}>
          <h3 style={styles.infoTitle}>Architecture Topology</h3>
          <p style={styles.infoDesc}>
            All incoming requests flow through the <strong>Nginx Gateway Proxy</strong> at port <code>8080</code>. 
            Static files are routed to the <strong>HTML landing page</strong> or <strong>React SPA</strong>, 
            while backend calls starting with <code>/api/node/</code> or <code>/api/python/</code> are dynamically reverse proxied to their respective container runtimes.
          </p>
          <div style={styles.pillContainer}>
            <span style={styles.pill}>Nginx Gateway (Proxy)</span>
            <span style={styles.pill}>Vite HMR Enabled</span>
            <span style={styles.pill}>PostgreSQL 16</span>
            <span style={styles.pill}>Docker Network Isolation</span>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at center, #0F172A 0%, #070B14 100%)',
    color: '#E2E8F0',
    padding: '40px 20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  logo: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: '2px solid #D4AF37',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 20px auto',
    background: 'rgba(212, 175, 55, 0.1)',
    boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)',
  },
  logoText: {
    fontFamily: 'serif',
    fontWeight: 'bold',
    fontSize: '1.4rem',
    color: '#F3E5AB',
  },
  title: {
    fontSize: '2.4rem',
    margin: '0 0 10px 0',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  tag: {
    fontSize: '0.8rem',
    padding: '4px 10px',
    background: '#1E293B',
    border: '1px solid #475569',
    borderRadius: '12px',
    verticalAlign: 'middle',
    marginLeft: '10px',
    color: '#94A3B8',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: '1.1rem',
    margin: 0,
  },
  main: {
    maxWidth: '960px',
    width: '100%',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
    marginBottom: '40px',
  },
  card: {
    background: 'rgba(24, 37, 63, 0.3)',
    border: '1px solid rgba(212, 175, 55, 0.15)',
    borderRadius: '16px',
    padding: '30px',
    backdropFilter: 'blur(12px)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  serviceIndicator: (status) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: status === 'active' ? '#10B981' : status === 'error' ? '#EF4444' : '#F59E0B',
    boxShadow: status === 'active' ? '0 0 10px #10B981' : status === 'error' ? '0 0 10px #EF4444' : '0 0 10px #F59E0B',
  }),
  cardTitle: {
    fontSize: '1.4rem',
    margin: 0,
    color: '#FFFFFF',
  },
  cardDesc: {
    color: '#64748B',
    fontSize: '0.9rem',
    margin: '0 0 20px 0',
  },
  statusBox: {
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    padding: '20px',
    flexGrow: 1,
    marginBottom: '24px',
    minHeight: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  infoText: {
    color: '#94A3B8',
    textAlign: 'center',
    margin: 0,
  },
  errorContainer: {
    textAlign: 'center',
  },
  errorText: {
    color: '#EF4444',
    fontWeight: '600',
    margin: '0 0 8px 0',
  },
  code: {
    fontFamily: 'monospace',
    background: '#020617',
    padding: '4px 8px',
    borderRadius: '4px',
    color: '#FDA4AF',
    fontSize: '0.85rem',
    wordBreak: 'break-all',
  },
  successText: {
    color: '#10B981',
    fontWeight: '600',
    margin: '0 0 12px 0',
  },
  statLine: {
    margin: '4px 0',
    fontSize: '0.9rem',
    color: '#CBD5E1',
  },
  btn: {
    background: 'linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%)',
    border: 'none',
    color: '#070B14',
    padding: '12px 20px',
    borderRadius: '6px',
    fontWeight: '700',
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  infoSection: {
    background: 'rgba(15, 23, 42, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '30px',
    marginTop: '20px',
  },
  infoTitle: {
    fontSize: '1.2rem',
    color: '#FFFFFF',
    margin: '0 0 12px 0',
  },
  infoDesc: {
    color: '#94A3B8',
    lineHeight: '1.6',
    fontSize: '0.95rem',
    margin: '0 0 20px 0',
  },
  pillContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  pill: {
    fontSize: '0.8rem',
    background: 'rgba(212, 175, 55, 0.1)',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    color: '#F3E5AB',
    padding: '6px 12px',
    borderRadius: '20px',
  }
};

export default App;
