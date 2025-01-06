import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { getColorModeScript, getThemeSchemeScript, UIProvider } from '@yamada-ui/react'
import theme, { config } from './theme/index.ts'

const injectScript = (textContent: string) => {
  const script = document.createElement("script")

  script.textContent = textContent

  document.head.appendChild(script)
}

injectScript(
  getColorModeScript({
    initialColorMode: config.initialColorMode,
  }),
)

injectScript(
  getThemeSchemeScript({
    initialThemeScheme: config.initialThemeScheme,
  }),
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UIProvider config={config} theme={theme}>
      <App />
    </UIProvider>
  </StrictMode>,
)
