import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, Download } from 'lucide-react';

interface QRCodePageProps {
  onBack: () => void;
}

export function QRCodePage({ onBack }: QRCodePageProps) {
  // The URL to encode in QR code
  const qrCodeUrl = 'https://carrot-blues-09363611.figma.site';

  // Function to download QR code as image
  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = 'co-cook-qrcode.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-[#EF67A7] hover:opacity-70 transition-opacity"
        style={{ fontFamily: 'Mundial Narrow Variable, sans-serif' }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm uppercase tracking-wider">Back to Home</span>
      </button>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-8 py-20">
        <div className="max-w-2xl w-full text-center space-y-12">
          {/* Title */}
          <div className="space-y-4">
            <h1 
              className="text-6xl md:text-7xl text-[#EF67A7]"
              style={{ fontFamily: 'Swiss Grit, sans-serif' }}
            >
              CO-COOK RECIPE
            </h1>
            <p 
              className="text-lg text-gray-600 uppercase tracking-wide"
              style={{ fontFamily: 'Mundial Narrow Variable, sans-serif' }}
            >
              Scan to access the interactive cooking experience
            </p>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center gap-6">
            <div className="bg-white p-8 rounded-lg shadow-lg border-4 border-[#EF67A7]">
              <QRCodeSVG
                id="qr-code-svg"
                value={qrCodeUrl}
                size={300}
                level="H"
                includeMargin={true}
                fgColor="#EF67A7"
                bgColor="#FFFFFF"
              />
            </div>
            
            {/* Download Button */}
            <button
              onClick={downloadQRCode}
              className="flex items-center gap-2 px-8 py-4 bg-[#EF67A7] text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ fontFamily: 'Mundial Narrow Variable, sans-serif' }}
            >
              <Download className="w-5 h-5" />
              <span className="uppercase tracking-wider text-sm font-medium">Download QR Code</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}