# Online Code Editor

A modern, VS Code-inspired online code editor built with Next.js and Monaco Editor. This web-based code editor provides a familiar development environment with real-time code execution capabilities.

## Live Demo

Try it out: [Online Code Editor](https://online-code-editor-mqm6g3hyj-aj0070s-projects.vercel.app/)

## Features

- VS Code-like interface with dark theme
- Support for multiple programming languages (JavaScript, TypeScript, Python)
- Real-time code execution
- Optimized performance with minimal lag
- Integrated output panel
- Modern glassmorphism design elements
- Responsive layout

## Tech Stack

- Next.js 14
- TypeScript
- Monaco Editor
- Tailwind CSS
- React Icons

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd online-code-editor
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
online-code-editor/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── execute/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       └── CodeEditor.tsx
├── public/
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

## Configuration

The project includes several configuration files:

- `next.config.mjs`: Configuration for Next.js and Monaco Editor
- `tsconfig.json`: TypeScript configuration
- `tailwind.config.js`: Tailwind CSS customization
- `postcss.config.js`: PostCSS plugins configuration

## Deployment

This project can be deployed to various platforms:

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository to Vercel
3. Follow the deployment steps in Vercel dashboard
4. Your app will be automatically deployed

### Other Platforms
The project can also be deployed to other platforms that support Next.js applications:
- Netlify
- AWS Amplify
- Digital Ocean App Platform

## Performance Optimizations

The editor includes several performance optimizations:
- Disabled heavy Monaco Editor features (minimap, folding)
- Optimized CSS with hardware acceleration
- Memoized React components
- Dynamic imports for better code splitting
- Reduced layout shifts and reflows

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 