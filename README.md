# AI Resume Analyzer

## Overview
AI Resume Analyzer is a web application that leverages AI to analyze resumes, provide feedback, and suggest improvements. It includes a robust backend for file uploads and AI analysis, and a modern frontend built with React and TypeScript.

## Features
- Upload resumes in PDF or DOCX format.
- Analyze resumes using AI to provide:
  - Overall score.
  - Key strengths.
  - Areas for improvement.
  - Suggested bullet point rewrites.
  - ATS (Applicant Tracking System) analysis.
- Export feedback as a PDF.
- Responsive and user-friendly interface.

## Technologies Used
- **Frontend**:
  - Vite
  - React
  - TypeScript
  - Tailwind CSS
  - shadcn-ui
- **Backend**:
  - Node.js
  - Express
  - Puppeteer (for PDF generation)
  - Google Generative AI (Gemini API)

## Installation

### Prerequisites
- Node.js & npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

### Steps
```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd AI-Resume-Analyzer

# Step 3: Install dependencies
npm install

# Step 4: Create a .env file and add your API keys
# Example:
# GEMINI_API_KEY=your_gemini_api_key

# Step 5: Start the development server
npm run dev
```

## Environment Setup

### Creating a `.env` File
To configure the application, you need to create a `.env` file in the root directory of the project. This file will store your API keys and other sensitive information.

#### Steps:
1. Create a new file named `.env` in the root directory.
2. Add the following variables to the file:
   ```env
   GOOGLE_GEMINI_API_KEY=<YOUR_API_KEY>
   ```

### Obtaining a Google Gemini API Key
To use the AI analysis feature, you need a Google Gemini API key. Follow these steps to obtain one:
1. Visit the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Enable the "Generative AI" API for your project.
4. Navigate to **APIs & Services > Credentials**.
5. Click **Create Credentials** and select **API Key**.
6. Copy the generated API key and paste it into your `.env` file.

## Deployment
### Frontend Deployment
To deploy the frontend:
1. Open [Lovable](https://lovable.dev/projects/095e0220-a087-4e87-85d8-5f2251d18899).
2. Click on **Share -> Publish**.

### Backend Deployment
To deploy the backend:
1. Use a platform like Heroku, Render, or AWS.
2. Ensure the backend is accessible to the frontend by updating the API URL in the frontend configuration.

## Connecting a Custom Domain
You can connect a custom domain to the frontend by:
1. Navigating to **Project > Settings > Domains** in Lovable.
2. Clicking **Connect Domain**.

For more details, refer to [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide).

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Make your changes and commit them (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For questions or support, please contact [Tahir](mailto:tahir@example.com).
