import globals from 'globals'
import pluginJs from '@eslint/js'
import prettier from 'eslint-config-prettier'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node, // Define o ambiente Node.js para evitar erros de variáveis não definidas
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: { globals: globals.browser }, // Especifique para arquivos de frontend se houver
  },
  pluginJs.configs.recommended,
  prettier, // Integra Prettier com ESLint para evitar conflitos de regras
]
