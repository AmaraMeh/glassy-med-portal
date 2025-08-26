import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { FacultyProvider } from '@/lib/faculty-context'
import './index.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

createRoot(document.getElementById("root")!).render(
  <FacultyProvider>
    <App />
  </FacultyProvider>
);
