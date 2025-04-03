import React from 'react';
import { Clock, Download, Trash2, ExternalLink, Copy } from 'lucide-react';

interface HistoryItem {
  url: string;
  qrCode: string;
  timestamp: number;
}

function QRHistory() {
  const [history, setHistory] = React.useState<HistoryItem[]>([]);

  React.useEffect(() => {
    const savedHistory = localStorage.getItem('qr-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('qr-history');
    setHistory([]);
  };

  const downloadQR = (qrCode: string) => {
    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.png`;
    link.href = qrCode;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('URL copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  if (history.length === 0) {
    return (
      <div className="glass-card p-6 my-6 text-center">
        <h2 className="text-2xl font-bold mb-4 neon-header">QR Code History</h2>
        <p className="opacity-70">No QR codes in your history yet.</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 my-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold neon-header">QR Code History</h2>
        <button
          onClick={clearHistory}
          className="flex items-center px-4 py-2 text-red-400 hover:text-red-300 transition-colors"
        >
          <Trash2 size={18} className="mr-2" />
          Clear History
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {history.map((item, index) => (
          <div
            key={index}
            className="glass-card p-4 transition-all hover:transform hover:scale-105"
          >
            <div className="qr-container inline-block mb-3 p-4" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <img
                src={item.qrCode}
                alt="QR Code"
                className="w-full h-auto"
              />
            </div>
            <div className="truncate text-sm opacity-80 mb-2" title={item.url}>
              {item.url}
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center text-sm opacity-60">
                <Clock size={14} className="mr-1" />
                {new Date(item.timestamp).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(item.url)}
                  className="text-primary hover:text-accent transition-colors"
                  title="Copy URL"
                >
                  <Copy size={18} />
                </button>
                <button
                  onClick={() => window.open(item.url, '_blank')}
                  className="text-primary hover:text-accent transition-colors"
                  title="Open URL"
                >
                  <ExternalLink size={18} />
                </button>
                <button
                  onClick={() => downloadQR(item.qrCode)}
                  className="text-primary hover:text-accent transition-colors"
                  title="Download QR Code"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QRHistory;