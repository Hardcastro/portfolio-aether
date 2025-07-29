# 🚀 Guia de Deploy - Portfolio AEther

Este guia mostra como fazer o deploy do Portfolio AEther em diferentes plataformas.

## 📋 Pré-requisitos

- Conta no GitHub
- Node.js 18+ instalado
- Projeto funcionando localmente

## 🌐 Opções de Deploy

### 1. Vercel (Recomendado)

#### Passo a Passo:
1. **Acesse** [vercel.com](https://vercel.com)
2. **Faça login** com sua conta GitHub
3. **Clique** em "New Project"
4. **Importe** o repositório `portfolio-aether`
5. **Configure**:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Clique** em "Deploy"

#### Configuração Automática:
O arquivo `vercel.json` já está configurado para deploy automático.

### 2. Netlify

#### Passo a Passo:
1. **Acesse** [netlify.com](https://netlify.com)
2. **Faça login** com GitHub
3. **Clique** em "New site from Git"
4. **Selecione** o repositório
5. **Configure**:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **Clique** em "Deploy site"

#### Configuração Automática:
O arquivo `netlify.toml` já está configurado.

### 3. GitHub Pages

#### Passo a Passo:
1. **Vá** para Settings do repositório
2. **Clique** em "Pages"
3. **Source**: Deploy from a branch
4. **Branch**: main
5. **Folder**: `/docs` ou `/dist`
6. **Salve** as configurações

### 4. Firebase Hosting

#### Passo a Passo:
1. **Instale** Firebase CLI: `npm install -g firebase-tools`
2. **Faça login**: `firebase login`
3. **Inicialize**: `firebase init hosting`
4. **Configure**:
   - Public directory: `dist`
   - Single-page app: Yes
5. **Deploy**: `firebase deploy`

## 🔧 Configurações de Domínio

### Domínio Personalizado
1. **Compre** um domínio (ex: aetherdata.com)
2. **Configure** DNS conforme instruções da plataforma
3. **Adicione** o domínio nas configurações do projeto

### Subdomínio Gratuito
- **Vercel**: `portfolio-aether.vercel.app`
- **Netlify**: `portfolio-aether.netlify.app`
- **GitHub Pages**: `username.github.io/portfolio-aether`

## 📊 Monitoramento

### Vercel Analytics
- **Ative** Vercel Analytics no dashboard
- **Monitore** performance e erros

### Google Analytics
- **Adicione** o código de tracking no `index.html`
- **Configure** eventos personalizados

## 🔒 Segurança

### Headers de Segurança
Os arquivos de configuração já incluem:
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff

### HTTPS
Todas as plataformas oferecem HTTPS gratuito.

## 📈 Performance

### Otimizações Incluídas:
- ✅ Lazy loading de imagens
- ✅ Preload de recursos críticos
- ✅ Minificação automática
- ✅ Gzip compression
- ✅ CDN global

### Core Web Vitals:
- ✅ LCP otimizado
- ✅ FID reduzido
- ✅ CLS minimizado

## 🐛 Troubleshooting

### Build Fails
```bash
# Limpe cache
npm run clean
rm -rf node_modules
npm install

# Teste build local
npm run build
```

### Deploy Fails
1. **Verifique** logs de build
2. **Teste** localmente primeiro
3. **Confirme** versão do Node.js
4. **Verifique** dependências

### Domínio Não Funciona
1. **Aguarde** propagação DNS (24-48h)
2. **Verifique** configurações DNS
3. **Teste** com `nslookup`

## 📞 Suporte

- **Email**: contato@aetherdata.com
- **GitHub Issues**: [Criar issue](https://github.com/seu-usuario/portfolio-aether/issues)
- **Documentação**: [Vercel Docs](https://vercel.com/docs)

---

**Deploy realizado com sucesso! 🎉** 