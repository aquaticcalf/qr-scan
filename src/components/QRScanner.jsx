
import { useState, useEffect } from 'react';

import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QRScanner() {

  const [scanResult, setScanResult] = useState(null);

  

  useEffect(() => {

    const scanner = new Html5QrcodeScanner('reader', {

      qrbox: {

        width: 250,

        height: 250,

      },

      fps: 5,

    });

    

    const success = (result) => {

      scanner.clear();

      setScanResult(result);

      

      // Save to local storage

      const history = JSON.parse(localStorage.getItem('qrHistory') || '[]');

      const newScan = {

        result,

        timestamp: new Date().toISOString(),

      };

      localStorage.setItem('qrHistory', JSON.stringify([newScan, ...history]));

      

      // Show toast notification

      const toast = document.createElement('div');

      toast.className = 'toast toast-top toast-center';

      toast.innerHTML = `

        <div class="alert alert-success">

          <span>QR Code scanned successfully!</span>

        </div>

      `;

      document.body.appendChild(toast);

      setTimeout(() => toast.remove(), 3000);

    };

    

    const error = (err) => {

      console.warn(err);

    };

    

    scanner.render(success, error);

    

    return () => {

      scanner.clear();

    };

  }, []);

  

  return (

    <div>

      <div id="reader"></div>

      {scanResult && (

        <div class="mt-4">

          <div class="alert alert-info">

            <span>Last scanned result:</span>

            <pre class="text-sm mt-2 bg-base-200 p-2 rounded">{scanResult}</pre>

          </div>

          <button 

            class="btn btn-primary mt-4"

            onClick={() => setScanResult(null)}

          >

            Scan Again

          </button>

        </div>

      )}

    </div>

  );

}