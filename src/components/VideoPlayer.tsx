import { Play } from 'lucide-react';

interface VideoPlayerProps {
  type: 'youtube' | 'drive';
  url: string;
}

export function VideoPlayer({ type, url }: VideoPlayerProps) {
  const getEmbedUrl = (): string => {
    if (type === 'youtube') {
      // Extrair ID do vídeo do YouTube
      let videoId = '';
      
      // Tentar vários formatos de URL do YouTube
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
        /youtube\.com\/embed\/([^&\s]+)/,
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          videoId = match[1];
          break;
        }
      }

      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    } else {
      // Google Drive
      // Extrair ID do arquivo do Drive
      const match = url.match(/\/d\/([^\/]+)/);
      const fileId = match ? match[1] : '';
      
      return `https://drive.google.com/file/d/${fileId}/preview?autoplay=1`;
    }
  };

  const embedUrl = getEmbedUrl();

  return (
    <>
      {/* Estilos customizados para aumentar altura do vídeo no desktop */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .video-aspect-container {
            padding-top: 56.25%; /* 16:9 padrão para mobile */
          }
          
          @media (min-width: 1024px) {
            .video-aspect-container {
              padding-top: 73%; /* ~30% maior que 56.25% para desktop */
            }
          }
        `
      }} />
      
      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#2b0b00]">
        {/* Container com proporção ajustável */}
        <div className="video-aspect-container relative w-full">
          {/* Overlay com ícone de play */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <Play className="w-10 h-10 text-[#2b0b00] fill-[#2b0b00] ml-1" />
            </div>
          </div>

          {/* Iframe do vídeo */}
          <iframe
            id="hero-video"
            src={embedUrl}
            className="absolute top-0 left-0 w-full h-full z-20"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Vídeo Mel na Massa"
          />
        </div>
      </div>
    </>
  );
}
