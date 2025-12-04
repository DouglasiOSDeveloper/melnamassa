import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import arcoBg from './assets/arco.png';
import { LeadForm } from './components/LeadForm';
import { VideoPlayer } from './components/VideoPlayer';

// Configurações
const CONFIG = {
  whatsappGroupUrl: 'https://chat.whatsapp.com/Im5GVOwIUcq5pZuAAZoigB?mode=hqrt1',
  /* googleSheetsEndpoint:
    'https://script.google.com/macros/s/AKfycbzXVW9sUEuvfdbKZJA2roKFFRiRqCAp-78UQbCHUUisTahYf1wDo1QVPAfsm5XqA6BOLw/exec',
  */
  video: {
    type: 'youtube' as 'youtube' | 'drive',
    url: 'https://youtu.be/MN_FAE8aW7Q',
  },
};

/* interface FormData {
  name: string;
  whatsapp: string;
  email: string;
}
*/

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

  // Removido argumento formData pois não existe mais coleta de dados
  const handleSubmit = async () => {
    /* console.log('🚀 Iniciando envio do formulário...');
    console.log('📦 Dados a serem enviados:', formData);
    console.log('🔗 Endpoint:', CONFIG.googleSheetsEndpoint);
    */

    setIsSubmitting(true);

    /* --- INÍCIO DO TRECHO COMENTADO DE ENVIO (FETCH) --- */
    /*
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
      // setIsSubmitting(false); // Mantemos true para o redirecionamento visual
    }
    */
    /* --- FIM DO TRECHO COMENTADO DE ENVIO --- */

    console.log('🔀 Redirecionando para WhatsApp...');
    
    // Pequeno delay apenas para o usuário ver o botão mudar para "ENTRANDO..."
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
        Entre agora mesmo no nosso GRUPO VIP e descubra como transformar o pão de mel em uma renda de{' '}
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
        className="pointer-events-none absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${arcoBg})`,
          // aumenta um pouco a altura pra garantir que cubra topo e rodapé
          backgroundSize: 'auto 120%',
          // joga o arco mais pro meio da tela, como no layout de referência
          backgroundPosition: '60% 0',
        }}
      />

      {/* Container principal */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="mx-auto px-6 lg:px-12 py-12 w-full">
          {isDesktop ? (
            // DESKTOP
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="space-y-8 max-w-xl">
                {Logo}
                {Headline}

                <LeadForm
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </div>

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
            // MOBILE
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