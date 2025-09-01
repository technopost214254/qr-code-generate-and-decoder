
# QR Code Generator & Decoder (React + Vite)

This project is a web application built with React and Vite that allows users to generate QR codes from text input and decode QR codes from uploaded images.

## Features

- **QR Code Generation:** Enter any text and generate a QR code instantly.
- **Download QR Code:** Download the generated QR code as a PNG image.
- **QR Code Decoding:** Upload a QR code image to decode and display its contents.

## Technologies Used

- [React](https://react.dev/) for UI
- [Vite](https://vitejs.dev/) for fast development and build
- [react-qr-code](https://github.com/rosskhanas/react-qr-code) for QR code generation
- [qrcode-decoder](https://github.com/edi9999/jsqrcode) for decoding QR codes
- [html2canvas](https://github.com/niklasvh/html2canvas) for downloading QR code as image

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Generate QR Code:** Enter text and click "Generate QR" to see the QR code. Click "Download QR" to save it.
2. **Decode QR Code:** Upload a QR code image to see its decoded text.

## Project Structure

- `src/App.jsx`: Main app logic for QR code generation and decoding
- `src/App.css`: Styles
- `public/`: Static assets
- `index.html`: Entry point

## License

MIT
