# 📋 Exemplo de Configuração - CONFIG

## Como deve ficar o objeto CONFIG em `/App.tsx`

### ❌ ANTES (valores padrão que você precisa substituir)

```typescript
const CONFIG = {
  whatsappGroupUrl: 'https://chat.whatsapp.com/SEU_LINK_DO_GRUPO',
  googleSheetsEndpoint: 'https://script.google.com/macros/s/SEU_ID_DO_WEBAPP/exec',
  video: {
    type: 'youtube' as 'youtube' | 'drive',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
};
```

---

## ✅ DEPOIS (com seus valores reais)

### Exemplo 1: Vídeo do YouTube

```typescript
const CONFIG = {
  // Link do seu grupo do WhatsApp (obtido ao criar o convite do grupo)
  whatsappGroupUrl: 'https://chat.whatsapp.com/JK8mNpOqRs3L4MnOpQrStU',
  
  // URL do Web App do Google Apps Script (obtida após publicar o script)
  googleSheetsEndpoint: 'https://script.google.com/macros/s/AKfycbxH5J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X1Y2Z3/exec',
  
  video: {
    type: 'youtube' as 'youtube' | 'drive',
    url: 'https://www.youtube.com/watch?v=AbC1234DefG'
  }
};
```

### Exemplo 2: Vídeo do Google Drive

```typescript
const CONFIG = {
  whatsappGroupUrl: 'https://chat.whatsapp.com/JK8mNpOqRs3L4MnOpQrStU',
  googleSheetsEndpoint: 'https://script.google.com/macros/s/AKfycbxH5J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X1Y2Z3/exec',
  
  video: {
    type: 'drive' as 'youtube' | 'drive',
    url: 'https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ123456/view?usp=sharing'
  }
};
```

### Exemplo 3: Link curto do YouTube (youtu.be)

```typescript
const CONFIG = {
  whatsappGroupUrl: 'https://chat.whatsapp.com/JK8mNpOqRs3L4MnOpQrStU',
  googleSheetsEndpoint: 'https://script.google.com/macros/s/AKfycbxH5J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X1Y2Z3/exec',
  
  video: {
    type: 'youtube' as 'youtube' | 'drive',
    url: 'https://youtu.be/AbC1234DefG'  // Formato curto também funciona
  }
};
```

---

## 🔍 Como obter cada valor

### 1️⃣ whatsappGroupUrl

**Passos**:
1. Abra o WhatsApp (app ou web)
2. Acesse o grupo que deseja usar
3. Toque no nome do grupo no topo
4. Role até "Convidar por link"
5. Copie o link de convite
6. Cole em `whatsappGroupUrl`

**Formato**: `https://chat.whatsapp.com/XXXXXXXXXXXXXXXXXXX`

---

### 2️⃣ googleSheetsEndpoint

**Passos**:
1. Configure o Google Apps Script (veja `/CONFIGURACAO_GOOGLE_SHEETS.md`)
2. Após publicar como Web App, copie a URL gerada
3. A URL termina com `/exec`
4. Cole em `googleSheetsEndpoint`

**Formato**: `https://script.google.com/macros/s/XXXXXXXXX.../exec`

**Onde encontrar**:
- Logo após clicar em "Implantar" no Apps Script
- Ou em: Implantar > Gerenciar implantações > URL do aplicativo da Web

---

### 3️⃣ video.url (YouTube)

**Passos**:
1. Acesse o vídeo no YouTube
2. Copie a URL da barra de endereços
3. Cole em `video.url`
4. Certifique-se de que `video.type` está como `'youtube'`

**Formatos aceitos**:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

---

### 4️⃣ video.url (Google Drive)

**Passos**:
1. Faça upload do vídeo no Google Drive
2. Clique com botão direito > Obter link
3. Configure permissão: "Qualquer pessoa com o link"
4. Copie o link
5. Cole em `video.url`
6. Certifique-se de que `video.type` está como `'drive'`

**Formato aceito**: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`

**⚠️ IMPORTANTE**: O vídeo deve ter permissão pública ("Qualquer pessoa com o link pode visualizar")

---

## ✅ Validação da Configuração

### Checklist - whatsappGroupUrl
- [ ] ✅ Começa com `https://chat.whatsapp.com/`
- [ ] ✅ Você consegue abrir o link em uma aba anônima e entrar no grupo
- [ ] ✅ Não tem espaços ou caracteres especiais quebrados

### Checklist - googleSheetsEndpoint
- [ ] ✅ Começa com `https://script.google.com/macros/s/`
- [ ] ✅ Termina com `/exec`
- [ ] ✅ Foi gerado após publicar o Web App no Apps Script
- [ ] ✅ As permissões foram autorizadas

### Checklist - video (YouTube)
- [ ] ✅ `video.type` está como `'youtube'`
- [ ] ✅ URL contém `youtube.com` ou `youtu.be`
- [ ] ✅ Vídeo é público ou não listado (não privado)
- [ ] ✅ Você consegue assistir o vídeo abrindo a URL

### Checklist - video (Google Drive)
- [ ] ✅ `video.type` está como `'drive'`
- [ ] ✅ URL contém `drive.google.com/file/d/`
- [ ] ✅ Permissão está configurada como "Qualquer pessoa com o link"
- [ ] ✅ Você consegue visualizar o vídeo em uma aba anônima

---

## 🧪 Teste Rápido

Após configurar, teste cada item:

### 1. Testar endpoint do Google Sheets
```bash
# Substitua pela sua URL real
curl -X POST 'https://script.google.com/macros/s/SEU_ID/exec' \
  -H 'Content-Type: application/json' \
  -d '{"name":"Teste","whatsapp":"11999999999","email":"teste@example.com"}'
```

Verifique se uma nova linha apareceu na planilha.

### 2. Testar link do WhatsApp
- Abra o link em uma aba anônima
- Confirme que abre o grupo correto

### 3. Testar vídeo
- Acesse a landing page
- Confirme que o vídeo carrega e reproduz

---

## 🚨 Erros Comuns

### ❌ "Failed to fetch" ao enviar formulário
**Causa**: URL do `googleSheetsEndpoint` incorreta ou Web App não publicado
**Solução**: Verifique a URL e republique o Web App se necessário

### ❌ Vídeo não aparece (tela preta)
**Causa**: URL incorreta ou permissões erradas (Drive)
**Solução**: 
- YouTube: Verifique se o vídeo não é privado
- Drive: Configure permissão como "Qualquer pessoa com o link"

### ❌ Redirecionamento para WhatsApp não funciona
**Causa**: Link do grupo inválido ou expirado
**Solução**: Gere um novo link de convite do grupo

### ❌ Dados não aparecem na planilha
**Causa**: ID da planilha incorreto no Apps Script ou permissões
**Solução**: Verifique o ID no código do Apps Script (linha 12)

---

## 📝 Notas Finais

1. **Aspas simples**: Use sempre aspas simples (`'`) para strings no TypeScript
2. **Barras**: Não adicione `/` no final das URLs
3. **Espaços**: Não deixe espaços dentro das URLs
4. **Teste**: Sempre teste após cada alteração

---

## ✨ Exemplo Real Completo

```typescript
// Arquivo: /App.tsx
// Linhas 8-17

const CONFIG = {
  // Link do grupo "Mel na Massa - Turma 2025"
  whatsappGroupUrl: 'https://chat.whatsapp.com/JK8mNpOqRs3L4MnOpQrStU',
  
  // Web App publicado em 20/11/2025 às 15:30
  googleSheetsEndpoint: 'https://script.google.com/macros/s/AKfycbxH5J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X1Y2Z3/exec',
  
  // Vídeo de apresentação do curso (3min 45s)
  video: {
    type: 'youtube' as 'youtube' | 'drive',
    url: 'https://www.youtube.com/watch?v=AbC1234DefG'
  }
};
```

---

**Configuração completa? Agora é só testar e começar a capturar leads! 🚀**
