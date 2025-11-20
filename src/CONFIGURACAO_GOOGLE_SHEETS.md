# Configuração do Google Sheets - Mel na Massa

## 📋 Código do Google Apps Script

Cole este código no editor de Apps Script da sua planilha:

```javascript
/**
 * Google Apps Script para receber dados do formulário "Mel na Massa"
 * e adicionar como nova linha na planilha do Google Sheets
 */

function doPost(e) {
  try {
    // Abrir a planilha pelo ID
    // IMPORTANTE: Substitua pelo ID da sua planilha
    var spreadsheetId = '1g4CuZIKQ7jixpUlO_d0qHnNSwSWGKMJvjece3b9O1gQ';
    var sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Parsear os dados recebidos do POST
    var data = JSON.parse(e.postData.contents);
    
    // Extrair os campos
    var name = data.name || '';
    var whatsapp = data.whatsapp || '';
    var email = data.email || '';
    
    // Criar timestamp (data e hora atual)
    var timestamp = new Date();
    
    // Adicionar nova linha com: [timestamp, nome, whatsapp, email]
    // Isso ADICIONA uma nova linha sem sobrescrever dados existentes
    sheet.appendRow([timestamp, name, whatsapp, email]);
    
    // Retornar resposta de sucesso
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Dados salvos com sucesso'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Retornar resposta de erro
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Função de teste (opcional)
 * Para testar localmente no editor de Apps Script
 */
function testarEnvio() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        name: 'João Silva',
        whatsapp: '11999998888',
        email: 'joao@example.com'
      })
    }
  };
  
  var resultado = doPost(testData);
  Logger.log(resultado.getContent());
}
```

---

## 🚀 Passo a passo para configurar

### 1. Acessar o Editor de Apps Script

1. Abra sua planilha: https://docs.google.com/spreadsheets/d/1g4CuZIKQ7jixpUlO_d0qHnNSwSWGKMJvjece3b9O1gQ/edit
2. No menu superior, clique em **Extensões** > **Apps Script**
3. Isso abrirá o editor de código do Apps Script

### 2. Colar o código

1. Apague qualquer código existente no editor
2. Cole o código fornecido acima
3. Clique em **Salvar** (ícone de disquete) ou `Ctrl+S`
4. Dê um nome ao projeto (exemplo: "API Mel na Massa")

### 3. Publicar como Web App

1. No editor do Apps Script, clique em **Implantar** > **Nova implantação**
2. Clique no ícone de **engrenagem** ⚙️ ao lado de "Selecionar tipo"
3. Escolha **Aplicativo da Web**
4. Configure:
   - **Descrição**: "API para formulário Mel na Massa" (ou o que preferir)
   - **Executar como**: Eu (seu e-mail)
   - **Quem tem acesso**: Qualquer pessoa
5. Clique em **Implantar**
6. **IMPORTANTE**: Autorize o acesso quando solicitado
   - Clique em "Revisar permissões"
   - Selecione sua conta Google
   - Clique em "Avançado" (se aparecer aviso)
   - Clique em "Ir para [nome do projeto] (não seguro)"
   - Clique em "Permitir"

### 4. Copiar a URL do Web App

1. Após a implantação, você verá uma **URL de aplicativo da Web**
2. Ela terá este formato: `https://script.google.com/macros/s/XXXXXXXXXXXXX/exec`
3. **Copie esta URL completa**

### 5. Configurar no App.tsx

1. Abra o arquivo `/App.tsx`
2. Localize o objeto `CONFIG`:
   ```typescript
   const CONFIG = {
     whatsappGroupUrl: 'https://chat.whatsapp.com/SEU_LINK_DO_GRUPO',
     googleSheetsEndpoint: 'https://script.google.com/macros/s/SEU_ID_DO_WEBAPP/exec',
     // ...
   };
   ```
3. Substitua `googleSheetsEndpoint` pela URL que você copiou:
   ```typescript
   googleSheetsEndpoint: 'https://script.google.com/macros/s/XXXXXXXXXXXXX/exec',
   ```
4. Substitua também o `whatsappGroupUrl` pelo link real do seu grupo do WhatsApp

---

## 📊 Estrutura da Planilha

A planilha receberá os dados nas seguintes colunas:

| Coluna A | Coluna B | Coluna C | Coluna D |
|----------|----------|----------|----------|
| Data/Hora | Nome | WhatsApp | E-mail |
| 20/11/2025 10:30 | João Silva | 11999998888 | joao@example.com |
| 20/11/2025 11:45 | Maria Santos | 21988887777 | maria@example.com |

**Importante**: 
- Cada submissão do formulário cria uma **NOVA linha**
- Os dados **NUNCA** são sobrescritos
- A função `appendRow()` sempre adiciona no final da planilha

---

## 🧪 Como testar

### Teste 1: Função de teste interna
1. No editor do Apps Script, selecione a função `testarEnvio` no dropdown
2. Clique em **Executar**
3. Verifique se uma nova linha foi adicionada na planilha

### Teste 2: Usando curl (linha de comando)
```bash
curl -X POST \
  'https://script.google.com/macros/s/SEU_ID/exec' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Teste via Curl",
    "whatsapp": "11999999999",
    "email": "teste@example.com"
  }'
```

### Teste 3: Pelo formulário da landing page
1. Acesse sua landing page
2. Preencha todos os campos
3. Clique em "QUERO GARANTIR MINHA VAGA"
4. Verifique se:
   - Uma nova linha foi adicionada na planilha
   - Você foi redirecionado para o grupo do WhatsApp

---

## 🔍 Solução de problemas

### "Erro ao enviar dados para a planilha"
- Verifique se a URL do endpoint está correta
- Certifique-se de que o Web App foi publicado com acesso "Qualquer pessoa"
- Verifique as permissões no Apps Script

### "Dados não aparecem na planilha"
- Verifique se o ID da planilha no código está correto
- Teste usando a função `testarEnvio()` no Apps Script
- Veja os logs: **Ver** > **Execuções** no Apps Script

### "Permissões negadas"
- Você precisa autorizar o script quando for implantá-lo
- Vá em **Implantar** > **Gerenciar implantações** para revisar permissões

---

## 🔐 Segurança

⚠️ **ATENÇÃO**: O endpoint configurado como "Qualquer pessoa" pode receber dados de qualquer origem.

**Recomendações**:
- Não use este método para dados sensíveis ou PII (Personally Identifiable Information)
- Para produção com mais segurança, considere adicionar validação de origem ou token no Apps Script
- O Figma Make não é indicado para coleta de dados sensíveis

---

## 📝 Exemplo de resposta do servidor

**Sucesso**:
```json
{
  "status": "success",
  "message": "Dados salvos com sucesso"
}
```

**Erro**:
```json
{
  "status": "error",
  "message": "Descrição do erro"
}
```
