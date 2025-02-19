# SpecForge - PRD Generator

<div align="center">
  <img src="https://iili.io/2yZBUJ4.png">
</div>

SpecForge is a modern web application that helps you generate professional Product Requirement Documents (PRDs) in seconds using AI technology. Built with React, TypeScript, and powered by Google's Gemini AI, it provides a seamless and efficient way to create detailed product specifications.

## 🚀 Features

- **AI-Powered PRD Generation**: Instantly generate comprehensive PRDs from simple product descriptions
- **Real-time Markdown Preview**: View your generated PRD with proper formatting in real-time
- **Export Options**: Download your PRD as a Markdown file or copy to clipboard
- **Modern UI/UX**: Beautiful, responsive interface with dark mode support
- **Accessibility**: Built with accessibility in mind, supporting keyboard navigation and screen readers

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **AI Integration**: Google Generative AI (Gemini)
- **Build Tool**: Vite
- **Additional Libraries**:
  - `react-markdown` for Markdown rendering
  - `lucide-react` for icons
  - `next-themes` for theme management
  - `@heroui/scroll-shadow` for scroll effects
  - `sonner` for toast notifications

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── services/       # API and service integrations
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and configurations
└── styles/         # Global styles and Tailwind configuration
```

## 🚦 Getting Started

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd [project-directory]
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:8080`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔑 Environment Variables

| Variable              | Description              |
| --------------------- | ------------------------ |
| `VITE_GEMINI_API_KEY` | Google Gemini AI API key |

## 🎨 Customization

The project uses Tailwind CSS for styling. You can customize the theme by modifying:

- `tailwind.config.ts` for theme configuration
- `src/index.css` for global styles

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
