import { useState, useEffect } from 'react';
import logo from './assets/c84c38536fd44464d6ab3d0da144cf9e5f0c09b4.png';
import arcoBg from './assets/6679f71250d087a15c95482436e797a5907ee737.png';
import { LeadForm } from './components/LeadForm';
import { VideoPlayer } from './components/VideoPlayer';

// Configurações
const CONFIG = {
  whatsappGroupUrl: 'https://chat.whatsapp.com/Im5GVOwIUcq5pZuAAZoigB?mode=hqrt1',
  googleSheetsEndpoint:
    'https://script.google.com/macros/s/AKfycbzXVW9sUEuvfdbKZJA2roKFFRiRqCAp-78UQbCHUUisTahYf1wDo1QVPAfsm5XqA6BOLw/exec',
  video: {
    type: 'drive' as 'youtube' | 'drive',
    url: 'https://drive.google.com/file/d/1qHCWla-J9JLJRopKyBeViDsPRmVU_9FX/view?usp=drivesdk',
  },
};

interface FormData {
  name: string;
  whatsapp: string;
  email: string;
}

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // controla se é desktop ou mobile
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 1024;
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (formData: FormData) => {
    console.log('🚀 Iniciando envio do formulário...');
    console.log('📦 Dados a serem enviados:', formData);
    console.log('🔗 Endpoint:', CONFIG.googleSheetsEndpoint);

    setIsSubmitting(true);

    try {
      const body = new URLSearchParams({
        name: formData.name,
        whatsapp: formData.whatsapp,
        email: formData.email,
      });

      console.log('📤 Enviando requisição POST (form-urlencoded, no-cors)...');

      await fetch(CONFIG.googleSheetsEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        body,
      });

      console.log('✅ Requisição enviada (Apps Script recebe).');
    } catch (error) {
      console.error('❌ Erro ao enviar dados para a planilha:', error);
      console.warn('⚠️ O usuário será redirecionado mesmo com erro no envio');
    } finally {
      console.log('🔄 Finalizando envio e resetando estado de loading...');
      setIsSubmitting(false);
    }

    console.log('🔀 Redirecionando para WhatsApp em 1 segundo...');
    setTimeout(() => {
      console.log('➡️ Redirecionando agora para:', CONFIG.whatsappGroupUrl);
      window.location.href = CONFIG.whatsappGroupUrl;
    }, 1000);
  };

  // blocos reaproveitáveis
  const Logo = (
    <div className="flex justify-start">
      <img src={logo} alt="Mel na Massa" className="h-20 lg:h-24 w-auto" />
    </div>
  );

  const Headline = (
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
          R$1.000 a R$3.000 por mês, começando com
        </span>{' '}
        o que você tem em casa.
      </h1>
    </div>
  );

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Arco de fundo */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2/3 bg-no-repeat bg-contain bg-left-top opacity-90 pointer-events-none"
        style={{
          backgroundImage: `url(${arcoBg})`,
          backgroundSize: 'auto 110%',
        }}
      />

      {/* Container principal */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="mx-auto px-6 lg:px-12 py-12 w-full">
          {isDesktop ? (
            // DESKTOP: 2 colunas -> esquerda (logo, título, form) | direita (vídeo grande encostado à direita)
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Coluna esquerda mais estreita, como no layout de referência */}
              <div className="space-y-8 max-w-xl">
                {Logo}
                {Headline}

                <LeadForm
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </div>

              {/* Coluna direita com vídeo maior e alinhado à direita */}
              <div className="flex justify-end lg:pl-8">
                <div className="w-full max-w-xl lg:max-w-2xl">
                  <VideoPlayer
                    type={CONFIG.video.type}
                    url={CONFIG.video.url}
                  />
                </div>
              </div>
            </div>
          ) : (
            // MOBILE: 1 coluna -> logo, título, vídeo, formulário
            <div className="space-y-8">
              {Logo}
              {Headline}

              <VideoPlayer
                type={CONFIG.video.type}
                url={CONFIG.video.url}
              />

              <LeadForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
