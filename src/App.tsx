import { useState, FormEvent } from 'react';
import logo from 'figma:asset/c84c38536fd44464d6ab3d0da144cf9e5f0c09b4.png';
import arcoBg from 'figma:asset/6679f71250d087a15c95482436e797a5907ee737.png';
import { LeadForm } from './components/LeadForm';
import { VideoPlayer } from './components/VideoPlayer';

// Configurações
const CONFIG = {
  // ⚠️ SUBSTITUA PELO LINK REAL DO SEU GRUPO DO WHATSAPP
  whatsappGroupUrl: 'https://chat.whatsapp.com/SEU_LINK_DO_GRUPO',
  
  // ⚠️ IMPORTANTE: Cole aqui a URL do seu Web App do Google Apps Script
  // Formato: https://script.google.com/macros/s/SEU_ID_AQUI/exec
  // A URL deve terminar com /exec
  googleSheetsEndpoint: 'https://script.google.com/macros/s/AKfycbz-zxdGoFWRkQCE9__WtoFUGas5bbgH3J9VFGG6k8p72ZRo00dGK4oL_2M2zSFsH-t3FA/exec',
  
  video: {
    type: 'youtube' as 'youtube' | 'drive', // Altere para 'drive' se necessário
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' // Substitua pelo link real
  }
};

interface FormData {
  name: string;
  whatsapp: string;
  email: string;
}

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    console.log('🚀 Iniciando envio do formulário...');
    console.log('📦 Dados a serem enviados:', formData);
    console.log('🔗 Endpoint:', CONFIG.googleSheetsEndpoint);
    
    setIsSubmitting(true);

    try {
      // Preparar payload
      const payload = {
        name: formData.name,
        whatsapp: formData.whatsapp,
        email: formData.email,
      };

      console.log('📤 Enviando requisição POST...');
      console.log('📋 Payload JSON:', JSON.stringify(payload, null, 2));
      
      // Enviar dados para Google Sheets
      const response = await fetch(CONFIG.googleSheetsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        redirect: 'follow',
      });

      console.log('📥 Resposta recebida. Status:', response.status);
      console.log('📊 Status OK?', response.ok);
      console.log('📍 URL final:', response.url);
      
      // Tentar ler a resposta como texto
      const responseText = await response.text();
      console.log('📄 Resposta do servidor (texto):', responseText);
      
      // Tentar parsear como JSON
      try {
        const responseJson = JSON.parse(responseText);
        console.log('📋 Resposta do servidor (JSON):', responseJson);
      } catch (jsonError) {
        console.log('ℹ️ Resposta não é JSON válido');
      }

      if (response.ok) {
        console.log('✅ Dados enviados com sucesso para a planilha!');
      } else {
        console.warn('⚠️ Resposta não OK, mas continuando...', response.status);
      }

    } catch (error) {
      console.error('❌ Erro ao enviar dados para a planilha:', error);
      console.error('🔍 Detalhes do erro:', {
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        type: error instanceof Error ? error.constructor.name : typeof error,
      });
      console.warn('⚠️ O usuário será redirecionado mesmo com erro no envio');
    } finally {
      // Garantir que o loading seja desativado
      console.log('🔄 Finalizando envio e resetando estado de loading...');
      setIsSubmitting(false);
    }

    // Redirecionar para WhatsApp após 1 segundo
    console.log('🔀 Redirecionando para WhatsApp em 1 segundo...');
    setTimeout(() => {
      console.log('➡️ Redirecionando agora para:', CONFIG.whatsappGroupUrl);
      window.location.href = CONFIG.whatsappGroupUrl;
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Arco de fundo */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1/2 bg-no-repeat bg-contain bg-left-top opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url(${arcoBg})`,
          backgroundSize: 'auto 100%',
        }}
      />

      {/* Container principal */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 py-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Coluna esquerda - Conteúdo e formulário */}
            <div className="space-y-8">
              {/* Logo */}
              <div className="flex justify-start">
                <img 
                  src={logo} 
                  alt="Mel na Massa" 
                  className="h-20 lg:h-24 w-auto"
                />
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h1 
                  className="text-[#a2542c]"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    lineHeight: '1.2',
                    fontWeight: '700',
                  }}
                >
                  Descubra como transformar o pão de mel em uma renda de{' '}
                  <span 
                    className="inline-block relative"
                    style={{
                      fontWeight: '800',
                      textDecoration: 'underline',
                      textDecorationColor: '#fed578',
                      textDecorationThickness: '4px',
                      textUnderlineOffset: '4px',
                    }}
                  >
                    R$1.000 a R$3.000 por mês
                  </span>
                  , começando com o que você tem em casa.
                </h1>
              </div>

              {/* Formulário */}
              <LeadForm 
                onSubmit={handleSubmit} 
                isSubmitting={isSubmitting}
              />
            </div>

            {/* Coluna direita - Vídeo */}
            <div className="lg:pl-8">
              <VideoPlayer 
                type={CONFIG.video.type}
                url={CONFIG.video.url}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}