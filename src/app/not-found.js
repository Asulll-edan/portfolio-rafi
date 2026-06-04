export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#001D3D',
      color: '#F0F4F8',
      fontFamily: 'sans-serif',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <h1 style={{ color: '#FFC300', fontSize: '80px', margin: 0 }}>404</h1>
      <p style={{ color: 'rgba(240,244,248,0.6)' }}>Halaman tidak ditemukan</p>
      <a href="/" style={{ color: '#219EBC' }}>← Kembali ke Home</a>
    </div>
  );
}