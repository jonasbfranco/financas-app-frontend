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

### Próximos passos

- Paginação em transações e categorias
- Em transações inserir filtro de mês corrente das transações e sempre filtrar pelo mes correte now()
- Filtro por mes das transações
- Acertar a cor das box do dashboard - as boxes que nao sao de valores positivos e negativos
- Acertar a tabela das transações na exibição mobile
