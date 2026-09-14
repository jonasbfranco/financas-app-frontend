### Instalar vite
```
 npm create vite@latest .
```

### Instalar axios, lucide-react e react-router
```
npm i axios lucide-react react-router
```

### Instalar Tailwindcss
```
npm install tailwindcss @tailwindcss/vite
```

### Acertar arquivo vite.config.js
```
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),],
})

```

###