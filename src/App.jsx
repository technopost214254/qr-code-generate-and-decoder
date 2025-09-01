import { useState, useRef } from 'react';
import './App.css';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import QrcodeDecoder from 'qrcode-decoder';

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef(null);
  const [uploadedResult, setUploadedResult] = useState('');
  const [uploadError, setUploadError] = useState('');

  return (
    <>
      <div className="qr-container">

        <h1>QR Code Generator</h1>

        <input
          type="text"
          placeholder="Enter your name or details"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowQR(false);
          }}
          style={{ padding: '8px', fontSize: '16px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <button onClick={() => {
            if (input.trim()) {
              setShowQR(true);
            }
          }} 
          style={{ marginLeft: '10px', padding: '8px 16px', fontSize: '16px', background: '#df5555ff', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Generate QR
        </button>

        {showQR && (
          <div style={{ marginTop: '30px' }}>
            <div ref={qrRef} style={{ display: 'inline-block', background: '#fff', padding: '16px', borderRadius: '8px' }}>
              <QRCode value={input || ' '} size={200} />
            </div>

            <p style={{ marginTop: '10px', fontSize: '18px' }}>Info: {input}</p>
            
            <button
              style={{ marginTop: '10px', padding: '8px 16px', fontSize: '16px' }}
              onClick={async () => {
                if (qrRef.current) {
                  const canvas = await html2canvas(qrRef.current);
                  const link = document.createElement('a');
                  link.href = canvas.toDataURL('image/png');
                  link.download = 'qr-code.png';
                  link.click();
                }
              }}
            >
              Download QR
            </button>
          </div>
        )}
      </div>

      {/* QR Code Upload and Decode Feature */}
      <div style={{ marginTop: '50px', padding: '24px' }}>
        <h2>
          Upload QR Code Image and Decode
        </h2>

        <input
          type="file"
          accept="image/*"
          style={{ marginBottom: '16px', padding: '8px', fontSize: '16px' }}
          onChange={async (e) => {
            setUploadedResult('');
            setUploadError('');
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = async (ev) => {
              const img = new window.Image();
              img.src = ev.target.result;
              img.onload = async () => {
                try {
                  const qr = new QrcodeDecoder();
                  const result = await qr.decodeFromImage(img);
                  setUploadedResult(result.data || 'No QR code found');
                } catch (err) {
                  setUploadError('Could not decode QR code.');
                }
              };
              img.onerror = () => setUploadError('Invalid image file.');
            };
            reader.readAsDataURL(file);
          }}
        />

        {uploadedResult && (
          <div style={{ marginTop: '16px' }}>
            <strong>
              Decoded Text:
            </strong>

            <br />

            <div style={{ marginTop: '8px', fontSize: '18px', color: '#f3eaeaff', wordBreak: 'break-all' }}>
              {uploadedResult}
            </div>
          </div>
        )}

        {uploadError && (
          <div style={{ marginTop: '16px', color: 'red' }}>
            {uploadError}
          </div>
        )}
      </div>
    </>
  )
}

export default App
