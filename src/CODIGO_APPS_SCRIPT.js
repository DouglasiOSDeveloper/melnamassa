/**
 * ═══════════════════════════════════════════════════════════════════
 * GOOGLE APPS SCRIPT - MEL NA MASSA
 * ═══════════════════════════════════════════════════════════════════
 * 
 * INSTRUÇÕES:
 * 1. Abra sua planilha: https://docs.google.com/spreadsheets/d/1g4CuZIKQ7jixpUlO_d0qHnNSwSWGKMJvjece3b9O1gQ/edit
 * 2. Vá em: Extensões > Apps Script
 * 3. Cole TODO este código no editor
 * 4. Salve o projeto (Ctrl+S)
 * 5. Clique em: Implantar > Nova implantação
 * 6. Selecione tipo: Aplicativo da Web
 * 7. Configure:
 *    - Executar como: Eu
 *    - Quem tem acesso: Qualquer pessoa
 * 8. Clique em "Implantar" e autorize as permissões
 * 9. COPIE A URL gerada (formato: https://script.google.com/macros/s/.../exec)
 * 10. Cole essa URL no App.tsx na propriedade CONFIG.googleSheetsEndpoint
 * 
 * ═══════════════════════════════════════════════════════════════════
 */

function doPost(e) {
  try {
    // ID da planilha "Mel na Massa"
    // IMPORTANTE: Este é o ID correto da sua planilha
    var spreadsheetId = '1g4CuZIKQ7jixpUlO_d0qHnNSwSWGKMJvjece3b9O1gQ';
    var sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Parsear os dados JSON recebidos do formulário
    var data = JSON.parse(e.postData.contents);
    
    // Extrair os campos do formulário
    var name = data.name || '';
    var whatsapp = data.whatsapp || '';
    var email = data.email || '';
    
    // Criar timestamp atual (data e hora do envio)
    var timestamp = new Date();
    
    // ADICIONAR NOVA LINHA (appendRow NUNCA sobrescreve dados existentes)
    // Estrutura: [Data/Hora, Nome, WhatsApp, E-mail]
    sheet.appendRow([timestamp, name, whatsapp, email]);
    
    // Log para debug (visível em "Ver > Execuções")
    Logger.log('Lead salvo: ' + name + ' | ' + whatsapp + ' | ' + email);
    
    // Retornar resposta de sucesso
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Dados salvos com sucesso',
        'timestamp': timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log de erro
    Logger.log('ERRO: ' + error.toString());
    
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
 * ═══════════════════════════════════════════════════════════════════
 * FUNÇÃO DE TESTE (OPCIONAL)
 * ═══════════════════════════════════════════════════════════════════
 * 
 * Para testar se está funcionando:
 * 1. Selecione "testarEnvio" no dropdown de funções
 * 2. Clique em "Executar" (▶️)
 * 3. Verifique se uma nova linha foi adicionada na planilha
 * 4. Veja o log: Ver > Execuções
 */
function testarEnvio() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        name: 'João Teste da Silva',
        whatsapp: '11999998888',
        email: 'joao.teste@example.com'
      })
    }
  };
  
  var resultado = doPost(testData);
  Logger.log('Resultado do teste:');
  Logger.log(resultado.getContent());
}

/**
 * ═══════════════════════════════════════════════════════════════════
 * FUNÇÃO PARA CONFIGURAR CABEÇALHOS (OPCIONAL)
 * ═══════════════════════════════════════════════════════════════════
 * 
 * Execute esta função UMA VEZ para adicionar cabeçalhos na primeira linha
 */
function configurarCabecalhos() {
  var spreadsheetId = '1g4CuZIKQ7jixpUlO_d0qHnNSwSWGKMJvjece3b9O1gQ';
  var sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
  
  // Verificar se a primeira linha está vazia
  if (sheet.getRange(1, 1).getValue() === '') {
    // Adicionar cabeçalhos
    sheet.getRange(1, 1, 1, 4).setValues([
      ['Data/Hora', 'Nome', 'WhatsApp', 'E-mail']
    ]);
    
    // Formatar cabeçalhos (negrito e fundo)
    sheet.getRange(1, 1, 1, 4)
      .setFontWeight('bold')
      .setBackground('#fed578')
      .setFontColor('#a2542c');
    
    Logger.log('Cabeçalhos configurados com sucesso!');
  } else {
    Logger.log('Cabeçalhos já existem ou planilha não está vazia');
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════
 * NOTAS IMPORTANTES
 * ═══════════════════════════════════════════════════════════════════
 * 
 * ✅ appendRow() sempre adiciona no FINAL da planilha
 * ✅ NUNCA sobrescreve dados existentes
 * ✅ Cada envio do formulário = 1 nova linha
 * ✅ 1000 formulários preenchidos = 1000 linhas na planilha
 * 
 * 📊 Estrutura dos dados:
 * - Coluna A: Data e hora (timestamp automático)
 * - Coluna B: Nome do usuário
 * - Coluna C: Número do WhatsApp
 * - Coluna D: Endereço de e-mail
 * 
 * 🔒 Segurança:
 * - Este script aceita requisições de qualquer origem
 * - NÃO use para dados sensíveis ou PII
 * - O Figma Make não é indicado para dados confidenciais
 * 
 * 🐛 Debug:
 * - Veja os logs em: Ver > Execuções no Apps Script
 * - Use a função testarEnvio() para testar localmente
 * - Verifique o console do navegador na landing page
 * 
 * ═══════════════════════════════════════════════════════════════════
 */
