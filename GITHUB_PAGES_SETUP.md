# Configuração GitHub Pages - Portfolio AEther

## 🚀 Configuração Automática (Recomendado)

O projeto já está configurado com GitHub Actions para deploy automático. Apenas siga estes passos:

### 1. Configurar GitHub Pages

1. Vá para **Settings** > **Pages** no seu repositório
2. Em **Source**, selecione **Deploy from a branch**
3. Em **Branch**, selecione **gh-pages** e **/(root)**
4. Clique **Save**

### 2. Ativar GitHub Actions

1. Vá para **Actions** no seu repositório
2. O workflow será executado automaticamente no próximo push para `main`
3. Aguarde a conclusão do deploy

## 🔧 Configuração Manual

Se preferir fazer o deploy manualmente:

```bash
# Instalar dependências
npm install

# Fazer build para produção
npm run build:gh-pages

# Fazer commit e push
git add .
git commit -m "Deploy para GitHub Pages"
git push origin main
```

## 📁 Arquivos Importantes

- `vite.config.ts` - Configurado com `base: '/portfolio-aether/'`
- `public/404.html` - Página de fallback para React Router
- `public/.nojekyll` - Desabilita processamento Jekyll
- `.github/workflows/deploy.yml` - Workflow de deploy automático

## 🔍 Solução de Problemas

### Página em Branco
- Verifique se o `base` no `vite.config.ts` está correto
- Confirme se o arquivo `404.html` existe
- Aguarde alguns minutos após o deploy

### Rotas não Funcionam
- O arquivo `404.html` deve estar na pasta `public`
- Verifique se o script de redirecionamento está no `index.html`

### Build Falha
- Verifique se todas as dependências estão instaladas
- Confirme se o Node.js versão 18+ está sendo usado

## 🌐 URL do Site

Após o deploy, seu site estará disponível em:
`https://hardcastro.github.io/portfolio-aether/`

## 📞 Suporte

Se ainda houver problemas, verifique:
1. Logs do GitHub Actions
2. Console do navegador para erros JavaScript
3. Network tab para recursos não carregados 