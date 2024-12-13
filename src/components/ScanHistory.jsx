import { useState, useEffect } from 'react'

export default function ScanHistory() {

  const [history, setHistory] = useState([])

  

  useEffect(() => {

    const loadHistory = () => {

      const stored = JSON.parse(localStorage.getItem('qrHistory') || '[]')

      setHistory(stored)

    }

    

    loadHistory()

    window.addEventListener('storage', loadHistory)

    return () => window.removeEventListener('storage', loadHistory)

  }, [])

  

  const clearHistory = () => {

    localStorage.setItem('qrHistory', '[]')

    setHistory([])

  }

  

  if (history.length === 0) {

    return (

      <div class="alert alert-info">

        <span>No scan history yet. Try scanning a QR code!</span>

      </div>

    )

  }

  

  return (

    <div>

      <div class="flex justify-between items-center mb-4">

        <span class="text-sm text-gray-600">{history.length} scans</span>

        <button 

          class="btn btn-sm btn-error"

          onClick={clearHistory}

        >

          Clear History

        </button>

      </div>

      

      <div class="space-y-4">

        {history.map((scan, index) => (

          <div key={index} class="card bg-base-200">

            <div class="card-body p-4">

              <p class="text-sm font-mono break-all">{scan.result}</p>

              <p class="text-xs text-gray-500 mt-2">

                {new Date(scan.timestamp).toLocaleString()}

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}
