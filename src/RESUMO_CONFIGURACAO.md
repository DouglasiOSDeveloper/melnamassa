# ⚡ Resumo da Configuração - Mel na Massa

## 🎯 O que foi atualizado

### ✅ Arquivos Atualizados
1. **App.tsx** - Configuração do endpoint e tratamento de envio
2. **VideoPlayer.tsx** - Vídeo ~30% maior no desktop
3. **LeadForm.tsx** - Sem alterações (já estava correto)
4. **globals.css** - Fonte Poppins importada

### ✅ Arquivos de Documentação Criados
1. **CODIGO_APPS_SCRIPT.js** - Código completo para colar no Apps Script
2. **CONFIGURACAO_GOOGLE_SHEETS.md** - Guia detalhado passo a passo
3. **README.md** - Documentação completa do projeto

---

## 🚀 CONFIGURAÇÃO RÁPIDA (3 PASSOS)

### PASSO 1: Configurar Google Apps Script

1. **Abra sua planilha**: https://docs.google.com/spreadsheets/d/1g4CuZIKQ7jixpUlO_d0qHnNSwSWGKMJvjece3b9O1gQ/edit

2. **Acesse o editor**: Extensões > Apps Script

3. **Cole o código**: Copie TUDO do arquivo `/CODIGO_APPS_SCRIPT.js` e cole no editor

4. **Salve**: Ctrl+S ou clique no ícone de disquete

5. **Implante como Web App**:
   - Clique em: **Implantar > Nova implantação**
   - Clique no ícone de engrenagem ⚙️
   - Escolha: **Aplicativo da Web**
   - Configure:
     - **Executar como**: Eu (seu e-mail)
     - **Quem tem acesso**: Qualquer pessoa
   - Clique em **Implantar**
   - **Autorize as permissões** quando solicitado

6. **COPIE A URL** gerada (ex: `https://script.google.com/macros/s/AKfycbxXXXXX.../exec`)

### PASSO 2: Configurar App.tsx

Abra `/App.tsx` e localize as linhas 8-17:

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

**Substitua**:
- ✏️ `whatsappGroupUrl` → Link real do seu grupo do WhatsApp
- ✏️ `googleSheetsEndpoint` → URL copiada no Passo 1
- ✏️ `video.url` → URL do seu vídeo (YouTube ou Google Drive)
- ✏️ `video.type` → 'youtube' ou 'drive' (conforme o vídeo)

### PASSO 3: Testar

1. ✅ Acesse a landing page
2. ✅ Preencha todos os 3 campos
3. ✅ Clique em "QUERO GARANTIR MINHA VAGA"
4. ✅ Verifique se foi criada uma nova linha na planilha
5. ✅ Confirme se você foi redirecionado para o WhatsApp

---

## 📊 Como os dados são salvos

### Estrutura na Planilha

Cada formulário preenchido cria **UMA NOVA LINHA** com:

```
┌──────────────────┬─────────────┬─────────────┬──────────────────────┐
│ Coluna A         │ Coluna B    │ Coluna C    │ Coluna D             │
├──────────────────┼─────────────┼─────────────┼──────────────────────┤
│ Data/Hora        │ Nome        │ WhatsApp    │ E-mail               │
├──────────────────┼─────────────┼─────────────┼──────────────────────┤
│ 20/11/25 10:30   │ João Silva  │ 11999998888 │ joao@example.com     │
│ 20/11/25 11:45   │ Maria       │ 21988887777 │ maria@example.com    │
│ 20/11/25 14:20   │ Pedro       │ 11977776666 │ pedro@example.com    │
└──────────────────┴─────────────┴─────────────┴──────────────────────┘
```

### ✅ Garantias
- ✅ Cada envio = 1 nova linha (usando `appendRow()`)
- ✅ NUNCA sobrescreve dados anteriores
- ✅ 1000 formulários = 1000 linhas organizadas
- ✅ Timestamp automático com data e hora

---

## 🎨 Alterações Visuais

### Vídeo maior no Desktop
- **Mobile**: Proporção 16:9 normal (56.25%)
- **Desktop**: ~30% maior em altura (73%)
- **Responsivo**: Ajuste automático conforme tamanho da tela

---

## 🔍 Verificação de Funcionamento

### ✅ Front-end funcionando corretamente se:
- [ ] Botão fica desabilitado quando campos estão vazios
- [ ] Botão fica habilitado quando todos os campos são válidos
- [ ] Aparecem mensagens de erro nos campos inválidos
- [ ] Ao enviar, aparece "ENVIANDO..." no botão
- [ ] Após envio, redireciona para o WhatsApp

### ✅ Backend funcionando corretamente se:
- [ ] Ao enviar o formulário, uma nova linha é criada na planilha
- [ ] A linha contém: data/hora + nome + whatsapp + email
- [ ] Cada novo envio cria uma NOVA linha (não sobrescreve)
- [ ] O console do navegador mostra: "Dados enviados com sucesso"

---

## 🐛 Solução Rápida de Problemas

### ❌ Erro: "Dados não aparecem na planilha"

**Verificar**:
1. ✅ URL do endpoint está correta em `CONFIG.googleSheetsEndpoint`?
2. ✅ Web App foi publicado com acesso "Qualquer pessoa"?
3. ✅ ID da planilha está correto no código do Apps Script?

**Testar**:
- No Apps Script, execute a função `testarEnvio()`
- Veja os logs em: **Ver > Execuções**

### ❌ Erro: "Permissões negadas"

**Solução**:
1. Vá em: **Implantar > Gerenciar implantações**
2. Clique no ícone de lápis ✏️
3. Revise as permissões
4. Certifique-se de ter autorizado o script

### ❌ Erro: "Vídeo não carrega"

**Verificar**:
1. ✅ `video.type` está correto? ('youtube' ou 'drive')
2. ✅ URL do vídeo é válida?
3. ✅ Vídeo do Drive tem permissão "Qualquer pessoa com o link"?

---

## 📝 Código do Google Apps Script

**Localização**: `/CODIGO_APPS_SCRIPT.js`

**Função principal**: `doPost(e)`
- Recebe dados do formulário via POST
- Extrai: name, whatsapp, email
- Cria timestamp automático
- **Adiciona nova linha** usando `appendRow()`
- Nunca sobrescreve dados existentes

**Função de teste**: `testarEnvio()`
- Use para testar o script localmente
- Adiciona uma linha de teste na planilha

**Função opcional**: `configurarCabecalhos()`
- Adiciona cabeçalhos formatados na primeira linha
- Execute UMA VEZ se quiser cabeçalhos bonitos

---

## 📞 Checklist Final

Antes de publicar, confirme:

- [ ] ✅ Apps Script implantado como Web App
- [ ] ✅ Permissões autorizadas no Google
- [ ] ✅ URL do endpoint copiada e colada em `CONFIG.googleSheetsEndpoint`
- [ ] ✅ Link do WhatsApp configurado em `CONFIG.whatsappGroupUrl`
- [ ] ✅ URL do vídeo configurada em `CONFIG.video.url`
- [ ] ✅ Tipo do vídeo correto em `CONFIG.video.type`
- [ ] ✅ Teste realizado: formulário → planilha → WhatsApp
- [ ] ✅ Verificado: cada envio cria nova linha na planilha

---

## 🎯 Fluxo Completo do Usuário

```
1. Usuário acessa a landing page
        ↓
2. Preenche: Nome + WhatsApp + E-mail
        ↓
3. Campos são validados em tempo real
        ↓
4. Botão é habilitado quando tudo está válido
        ↓
5. Usuário clica "QUERO GARANTIR MINHA VAGA"
        ↓
6. Dados são enviados para Google Sheets (POST)
        ↓
7. Nova linha é criada: [timestamp, nome, whatsapp, email]
        ↓
8. Usuário é redirecionado para grupo do WhatsApp
        ↓
9. ✅ Lead capturado com sucesso!
```

---

## 🔐 Nota de Segurança

⚠️ **IMPORTANTE**:
- Este endpoint aceita requisições de qualquer origem
- NÃO colete dados sensíveis (CPF, senha, cartão de crédito, etc.)
- Use apenas para informações básicas de contato
- O Figma Make não é adequado para dados confidenciais ou PII

---

## 📚 Documentação Completa

- **Configuração detalhada**: `/CONFIGURACAO_GOOGLE_SHEETS.md`
- **Código do script**: `/CODIGO_APPS_SCRIPT.js`
- **Documentação geral**: `/README.md`

---

**Tudo configurado? Boa sorte com suas vendas de pão de mel! 🍯**
