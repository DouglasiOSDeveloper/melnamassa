# 🍯 Landing Page Mel na Massa

Landing page de captura de leads para o projeto "Mel na Massa" - ensinando pessoas a ganhar renda vendendo pão de mel.

## 🎯 Funcionalidades

- ✅ Formulário de captura com 3 campos (Nome, WhatsApp, E-mail)
- ✅ Validação em tempo real dos campos
- ✅ Integração automática com Google Sheets
- ✅ Redirecionamento automático para grupo do WhatsApp
- ✅ Player de vídeo (YouTube ou Google Drive)
- ✅ Design responsivo (desktop e mobile)
- ✅ Cores e tipografia fiéis à identidade visual

## 📁 Estrutura do Projeto

```
/
├── App.tsx                          # Página principal
├── components/
│   ├── LeadForm.tsx                 # Componente do formulário
│   └── VideoPlayer.tsx              # Componente do player de vídeo
├── styles/
│   └── globals.css                  # Estilos globais e fonte Poppins
├── CONFIGURACAO_GOOGLE_SHEETS.md   # Guia completo de configuração
└── CODIGO_APPS_SCRIPT.js           # Código para colar no Apps Script
```

## 🚀 Configuração Rápida

### 1. Configurar Google Sheets

1. Abra o arquivo `/CODIGO_APPS_SCRIPT.js`
2. Copie TODO o código
3. Acesse sua planilha e vá em: **Extensões > Apps Script**
4. Cole o código e salve
5. Implante como Web App (**Implantar > Nova implantação**)
6. Copie a URL gerada (formato: `https://script.google.com/macros/s/.../exec`)

📖 **Instruções detalhadas**: Veja o arquivo `/CONFIGURACAO_GOOGLE_SHEETS.md`

### 2. Configurar a Landing Page

Abra o arquivo `/App.tsx` e localize o objeto `CONFIG`:

```typescript
const CONFIG = {
  // Link do seu grupo do WhatsApp
  whatsappGroupUrl: 'https://chat.whatsapp.com/SEU_LINK_DO_GRUPO',
  
  // URL do Web App gerada no passo 1
  googleSheetsEndpoint: 'https://script.google.com/macros/s/XXXXX/exec',
  
  // Configuração do vídeo
  video: {
    type: 'youtube', // ou 'drive'
    url: 'https://www.youtube.com/watch?v=SEU_VIDEO_ID'
  }
};
```

**Substitua**:
- `whatsappGroupUrl`: Link do seu grupo do WhatsApp
- `googleSheetsEndpoint`: URL do Web App do Apps Script
- `video.url`: URL do seu vídeo (YouTube ou Google Drive)
- `video.type`: 'youtube' ou 'drive'

### 3. Testar

1. Preencha o formulário na landing page
2. Clique em "QUERO GARANTIR MINHA VAGA"
3. Verifique se:
   - Uma nova linha foi adicionada na planilha
   - Você foi redirecionado para o grupo do WhatsApp

## 📊 Estrutura dos Dados na Planilha

Cada envio do formulário cria uma nova linha com:

| Coluna A | Coluna B | Coluna C | Coluna D |
|----------|----------|----------|----------|
| **Data/Hora** | **Nome** | **WhatsApp** | **E-mail** |
| 20/11/2025 10:30 | João Silva | 11999998888 | joao@example.com |
| 20/11/2025 11:45 | Maria Santos | 21988887777 | maria@example.com |

✅ **Importante**: Os dados NUNCA são sobrescritos. Cada formulário preenchido = 1 nova linha.

## 🎨 Identidade Visual

- **Cores principais**:
  - Marrom: `#a2542c`
  - Amarelo: `#fed578`
  - Marrom escuro (vídeo): `#2b0b00`
  
- **Tipografia**: Poppins (importada do Google Fonts)

## 📱 Responsividade

- **Desktop**: Layout em 2 colunas (conteúdo + vídeo)
- **Mobile**: Layout empilhado (conteúdo acima, vídeo abaixo)
- **Vídeo**: ~30% maior em altura no desktop

## 🔧 Componentes

### LeadForm.tsx
Formulário de captura com:
- Validação em tempo real
- Estados de erro visuais
- Botão desabilitado até todos os campos serem válidos
- Suporte a envio via Enter

### VideoPlayer.tsx
Player flexível que suporta:
- Vídeos do YouTube
- Vídeos do Google Drive
- Autoplay (respeitando limitações do navegador)
- Ícone de play decorativo
- Proporção ajustável (maior no desktop)

## 🔍 Solução de Problemas

### Dados não aparecem na planilha
- Verifique se o endpoint está correto no `CONFIG.googleSheetsEndpoint`
- Certifique-se de que o Web App foi publicado com acesso "Qualquer pessoa"
- Teste a função `testarEnvio()` no Apps Script

### Vídeo não carrega
- Verifique se o `video.type` está correto ('youtube' ou 'drive')
- Certifique-se de que a URL do vídeo é válida
- Vídeos do Drive devem ter permissão de "Qualquer pessoa com o link"

### Validação do formulário não funciona
- Abra o console do navegador (F12) e veja se há erros
- Verifique se todos os campos estão preenchidos corretamente
- E-mail deve conter @ e domínio válido
- WhatsApp deve ter 10-11 dígitos

## 📝 Validações do Formulário

- **Nome**: Campo obrigatório, não pode estar vazio
- **WhatsApp**: 10-11 dígitos (aceita formatação)
- **E-mail**: Formato válido (nome@dominio.com)

## 🔐 Segurança

⚠️ **IMPORTANTE**: 
- O endpoint do Google Sheets está configurado para aceitar requisições de qualquer origem
- NÃO use este método para coletar dados sensíveis ou PII
- O Figma Make não é indicado para aplicações que lidam com informações confidenciais

## 📞 Suporte

Para dúvidas sobre a configuração:
1. Consulte o arquivo `/CONFIGURACAO_GOOGLE_SHEETS.md`
2. Revise o código do Apps Script em `/CODIGO_APPS_SCRIPT.js`
3. Verifique os logs no Apps Script: **Ver > Execuções**

---

**Desenvolvido para o projeto Mel na Massa** 🍯
