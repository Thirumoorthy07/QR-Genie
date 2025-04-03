import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { Camera, XCircle, ExternalLink, Copy, ArrowUpRight } from 'lucide-react';

function QRScanner() {
  const webcamRef = useRef<Webcam>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(image, 0, 0);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          
          if (code) {
            setScannedResult(code.data);
            setIsScanning(false);
          }
        }
      };
    }
  }, []);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      interval = setInterval(capture, 500);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isScanning, capture]);

  const handleStartScan = () => {
    setError('');
    setScannedResult('');
    setIsScanning(true);
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scannedResult)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const openLink = () => {
    if (scannedResult.startsWith('http')) {
      window.open(scannedResult, '_blank');
    } else {
      window.open(`https://${scannedResult}`, '_blank');
    }
  };

  return (
    <div className="glass-card p-6 my-6">
      <h2 className="text-2xl font-bold mb-6 neon-header text-center">Scan QR Code</h2>
      
      <div className="flex justify-center mb-6">
        {!isScanning && !scannedResult ? (
          <button
            onClick={handleStartScan}
            className="neon-button flex items-center"
          >
            <Camera size={18} className="mr-2" />
            Start Scanner
          </button>
        ) : (
          !scannedResult && (
            <button
              onClick={handleStopScan}
              className="neon-button flex items-center"
              style={{ background: '#ff4757' }}
            >
              <XCircle size={18} className="mr-2" />
              Stop Scanning
            </button>
          )
        )}
      </div>

      {isScanning && (
        <div className="scanner-container mx-auto" style={{ maxWidth: '400px' }}>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-lg w-full"
            videoConstraints={{
              facingMode: 'environment',
            }}
            onUserMediaError={(err) => {
              setError('Failed to access camera. Please ensure you have granted camera permissions.');
              setIsScanning(false);
            }}
          />
          <div className="scan-line"></div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-3/4 h-3/4 border-2 border-accent rounded-lg"></div>
          </div>
          <p className="text-center mt-3 text-sm opacity-70">Position QR code within the frame</p>
        </div>
      )}

      {error && (
        <div className="text-red-400 text-center mt-4 glass-card p-4">
          {error}
        </div>
      )}

      {scannedResult && (
        <div className="result-container fade-in mt-6">
          <h3 className="text-xl font-semibold mb-3">Scanned Result:</h3>
          <div className="glass-card p-4 break-all">
            <p>{scannedResult}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <button
              onClick={copyToClipboard}
              className="neon-button flex items-center"
            >
              <Copy size={18} className="mr-2" />
              Copy
            </button>
            {scannedResult.includes('.') && (
              <button
                onClick={openLink}
                className="neon-button flex items-center"
              >
                <ArrowUpRight size={18} className="mr-2" />
                Open Link
              </button>
            )}
            <button
              onClick={handleStartScan}
              className="neon-button flex items-center"
            >
              <Camera size={18} className="mr-2" />
              Scan Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QRScanner;