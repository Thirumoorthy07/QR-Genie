import React, { useState } from 'react';
import QRCode from 'qrcode';
import { AlertCircle, Download, FileText, Music, Loader } from 'lucide-react';
import FileUploader from '../components/FileUploader';

interface HomeProps {
  isDarkMode: boolean;
}

function Home({ isDarkMode }: HomeProps) {
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadType, setUploadType] = useState<'url' | 'file' | 'audio'>('url');

  const generateQRCode = async (inputUrl: string = url) => {
    try {
      if (!inputUrl) {
        setError('Please enter a URL');
        setQrCode('');
        return;
      }

      // Basic URL validation
      try {
        new URL(inputUrl);
      } catch {
        setError('Please enter a valid URL');
        setQrCode('');
        return;
      }

      setLoading(true);
      
      // Add a small delay to show the loading animation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const qr = await QRCode.toDataURL(inputUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: isDarkMode ? '#FFFFFF' : '#000000', // Use white in dark mode, black in light mode
          light: '#0000',
        },
      });
      setQrCode(qr);
      setError('');
      setLoading(false);

      // Save to history
      const historyItem = {
        url: inputUrl,
        qrCode: qr,
        timestamp: Date.now(),
      };
      const savedHistory = localStorage.getItem('qr-history');
      const history = savedHistory ? JSON.parse(savedHistory) : [];
      localStorage.setItem('qr-history', JSON.stringify([historyItem, ...history].slice(0, 10)));
    } catch (err) {
      setError('Failed to generate QR code');
      setQrCode('');
      setLoading(false);
    }
  };

  const downloadQR = (format: 'png' | 'svg') => {
    if (!qrCode) return;

    const link = document.createElement('a');
    link.download = `qr-code.${format}`;
    link.href = qrCode;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (fileUrl: string) => {
    setUrl(fileUrl);
    generateQRCode(fileUrl);
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <div className="text-center mb-6 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 neon-header">Generate Your QR Instantly!</h1>
        <p className="text-lg sm:text-xl opacity-90">
          Create a QR code for any link with just one click
        </p>
      </div>

      <div className="glass-card p-6 mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setUploadType('url')}
            className={`flex-1 py-2 px-4 rounded-lg ${
              uploadType === 'url'
                ? 'neon-button'
                : 'bg-opacity-20 bg-white dark:bg-opacity-10'
            }`}
            style={{ minWidth: '120px' }}
          >
            URL
          </button>
          <button
            onClick={() => setUploadType('file')}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center ${
              uploadType === 'file'
                ? 'neon-button'
                : 'bg-opacity-20 bg-white dark:bg-opacity-10'
            }`}
            style={{ minWidth: '120px' }}
          >
            <FileText size={18} className="mr-2" />
            File
          </button>
          <button
            onClick={() => setUploadType('audio')}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center ${
              uploadType === 'audio'
                ? 'neon-button'
                : 'bg-opacity-20 bg-white dark:bg-opacity-10'
            }`}
            style={{ minWidth: '120px' }}
          >
            <Music size={18} className="mr-2" />
            Audio
          </button>
        </div>

        {uploadType === 'url' && (
          <div className="mb-6">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your URL here..."
              className="neon-input w-full"
            />
          </div>
        )}

        {uploadType === 'file' && (
          <FileUploader
            onUploadComplete={handleFileUpload}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
            maxSize={10 * 1024 * 1024}
          />
        )}

        {uploadType === 'audio' && (
          <FileUploader
            onUploadComplete={handleFileUpload}
            accept=".mp3,.wav"
            maxSize={5 * 1024 * 1024}
          />
        )}

        {error && (
          <div className="mb-4 flex items-center text-red-400">
            <AlertCircle size={20} className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        {uploadType === 'url' && (
          <div className="flex justify-center mb-6">
            <button
              onClick={() => generateQRCode()}
              className="neon-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader size={20} className="mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate QR Code'
              )}
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="loading-qr inline-block">
              <Loader size={48} />
            </div>
            <p className="mt-4 text-lg opacity-80">Creating your QR code...</p>
          </div>
        )}

        {qrCode && !loading && (
          <div className="text-center fade-in">
            <div className="qr-container inline-block mb-4 sm:mb-6 p-4 sm:p-8">
              <img src={qrCode} alt="QR Code" className="max-w-full h-auto mx-auto" style={{ maxHeight: '300px' }} />
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <button
                onClick={() => downloadQR('png')}
                className="neon-button flex items-center"
              >
                <Download size={18} className="mr-2" />
                <span className="sm:inline">Download PNG</span>
              </button>
              <button
                onClick={() => downloadQR('svg')}
                className="neon-button flex items-center"
              >
                <Download size={18} className="mr-2" />
                <span className="sm:inline">Download SVG</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="glass-card p-4 sm:p-8 mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center neon-header">Why Use This QR Code Generator?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Key Features</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li className="flex items-center">
                <span className="mr-2 text-accent">✓</span>
                Instant QR Code Creation
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-accent">✓</span>
                High-Quality Downloads (PNG/SVG)
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-accent">✓</span>
                QR Code Scanner
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-accent">✓</span>
                File & Audio Support
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-accent">✓</span>
                History Tracking
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-accent">✓</span>
                No Ads, No Distractions
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Technical Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2 text-accent">✓</span>
                Responsive UI Design
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-accent">✓</span>
                Theme Persistence
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-accent">✓</span>
                Real-time QR Scanning
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-accent">✓</span>
                Local Storage Support
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-accent">✓</span>
                Fast Performance
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-accent">✓</span>
                Secure Implementation
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;