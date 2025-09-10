# AI-Powered Resume Analyzer

An intelligent resume analysis tool that provides personalized feedback by comparing your resume against specific job requirements using AI technology.

## 🚀 Features

- **PDF Resume Upload**: Drag & drop interface for easy PDF resume uploads (up to 20MB)
- **Job-Specific Analysis**: Tailored feedback based on company name, job title, and job description
- **AI-Powered Insights**: Advanced AI analysis providing detailed resume improvement suggestions
- **PDF to Image Conversion**: Automatic conversion for enhanced processing capabilities
- **Real-time Status Updates**: Live feedback during the analysis process
- **Secure Storage**: Encrypted storage of resume data and analysis results
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Framework**: Remix (Full-stack React framework)
- **File Processing**: PDF.js for PDF manipulation
- **File Upload**: React Dropzone for drag & drop functionality
- **AI Integration**: Puter AI services
- **Storage**: Puter Cloud Storage (fs) and Key-Value store (kv)
- **Styling**: Tailwind CSS (assumed based on class names)
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js 18+
- npm or yarn package manager
- Modern web browser with JavaScript enabled

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Monametsi-s/ai-powered-resume-analyser.git
   cd ai-powered-resume-analyser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Configure your Puter API credentials and other required variables.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🎯 Usage

### Uploading and Analyzing a Resume

1. **Access the Application**: Open the app in your web browser
2. **Fill Job Details**: 
   - Enter the target company name
   - Specify the job title you're applying for
   - Paste the complete job description
3. **Upload Resume**: Drag and drop your PDF resume or click to select
4. **Analyze**: Click "Analyze Resume" to start the AI analysis
5. **View Results**: Review detailed feedback and improvement suggestions

### Supported File Types

- **PDF files only** (up to 20MB)
- Single page or multi-page documents
- Password-protected PDFs are not supported

## 🏗 Project Structure

```
ai-powered-resume-analyser/
├── app/
│   ├── components/
│   │   └── FileUploader.tsx        # Drag & drop file upload component
│   ├── lib/
│   │   └── pdf2img.ts             # PDF to image conversion utilities
│   ├── routes/
│   │   ├── upload.tsx             # Main upload and analysis route
│   │   └── resume/
│   │       └── [id].tsx           # Resume results display (planned)
│   └── root.tsx                   # App root component
├── public/
│   ├── images/
│   └── icons/
├── package.json
└── README.md
```

## 🔄 Development Status

### ✅ Completed Features
- File upload with validation
- PDF to image conversion
- AI integration setup
- Data storage and retrieval
- Status tracking and user feedback
- Form handling for job details

### 🚧 In Progress
- Resume results display page
- Error handling improvements
- UI/UX enhancements

### 📅 Planned Features
- Multiple resume format support
- Resume comparison tools
- Export functionality for feedback
- User authentication
- Resume history and tracking

## 🐛 Known Issues

- ~~PDF.js version mismatch (resolved)~~
- Remix hydration warnings (non-blocking)
- Results page route not implemented yet

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [PDF.js](https://mozilla.github.io/pdf.js/) for PDF processing capabilities
- [React Dropzone](https://react-dropzone.js.org/) for file upload functionality
- [Puter](https://puter.com/) for cloud storage and AI services
- [Remix](https://remix.run/) for the full-stack React framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Monametsi-s/ai-powered-resume-analyser/issues) page
2. Create a new issue with detailed information
3. Send email to [me](mailto:seelemonametsi@gmail.com)

---

**Built with ❤️ for job seekers worldwide**
