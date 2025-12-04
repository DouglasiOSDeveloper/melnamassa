import { useState, FormEvent, ChangeEvent } from 'react';

interface LeadFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}

interface FormData {
  name: string;
  whatsapp: string;
  email: string;
}

interface FormErrors {
  name?: string;
  whatsapp?: string;
  email?: string;
}

export function LeadForm({ onSubmit, isSubmitting }: LeadFormProps) {
  // Estado mantido para não quebrar a tipagem, mas iniciará vazio
  const [formData, setFormData] = useState<FormData>({
    name: '',
    whatsapp: '',
    email: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({
    name: false,
    whatsapp: false,
    email: false,
  });

  // Funções de validação mantidas caso precise descomentar no futuro
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateWhatsApp = (whatsapp: string): boolean => {
    const numbers = whatsapp.replace(/\D/g, '');
    return numbers.length >= 10 && numbers.length <= 11;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Por favor, preencha seu nome';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'Por favor, preencha seu WhatsApp';
    } else if (!validateWhatsApp(formData.whatsapp)) {
      newErrors.whatsapp = 'WhatsApp inválido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, preencha seu e-mail';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = (): boolean => {
    return (
      formData.name.trim() !== '' &&
      formData.whatsapp.trim() !== '' &&
      validateWhatsApp(formData.whatsapp) &&
      formData.email.trim() !== '' &&
      validateEmail(formData.email)
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({
      name: true,
      whatsapp: true,
      email: true,
    });

    // Removida a validação para permitir o envio direto
    // if (validateForm()) {
      onSubmit(formData);
    // }
  };

  return (
    <form id="lead-form" onSubmit={handleSubmit} className="space-y-6">
      
      {/* --- INÍCIO DA ÁREA COMENTADA DO QUESTIONÁRIO --- */}
      {/* <p
        className="text-[#a2542c] opacity-70 italic"
        style={{
          fontSize: '0.95rem',
        }}
      >
        Preencha as informações abaixo:
      </p>

      <div className="space-y-2">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={() => handleBlur('name')}
          placeholder="Como podemos te chamar?"
          className={`w-full px-4 py-3 rounded-md border-2 bg-white transition-colors
            ${
              touched.name && errors.name
                ? 'border-red-500 focus:border-red-500'
                : 'border-[#a2542c] focus:border-[#a2542c]'
            }
            focus:outline-none focus:ring-2 focus:ring-[#a2542c]/20
            placeholder:text-[#a2542c]/40`}
          style={{
            fontFamily: 'Poppins, sans-serif',
          }}
        />
        {touched.name && errors.name && (
          <p className="text-red-500 text-sm">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <input
          type="tel"
          id="whatsapp"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          onBlur={() => handleBlur('whatsapp')}
          placeholder="Seu número do WhatsApp:"
          className={`w-full px-4 py-3 rounded-md border-2 bg-white transition-colors
            ${
              touched.whatsapp && errors.whatsapp
                ? 'border-red-500 focus:border-red-500'
                : 'border-[#a2542c] focus:border-[#a2542c]'
            }
            focus:outline-none focus:ring-2 focus:ring-[#a2542c]/20
            placeholder:text-[#a2542c]/40`}
          style={{
            fontFamily: 'Poppins, sans-serif',
          }}
        />
        {touched.whatsapp && errors.whatsapp && (
          <p className="text-red-500 text-sm">{errors.whatsapp}</p>
        )}
      </div>

      <div className="space-y-2">
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => handleBlur('email')}
          placeholder="Seu melhor e-mail:"
          className={`w-full px-4 py-3 rounded-md border-2 bg-white transition-colors
            ${
              touched.email && errors.email
                ? 'border-red-500 focus:border-red-500'
                : 'border-[#a2542c] focus:border-[#a2542c]'
            }
            focus:outline-none focus:ring-2 focus:ring-[#a2542c]/20
            placeholder:text-[#a2542c]/40`}
          style={{
            fontFamily: 'Poppins, sans-serif',
          }}
        />
        {touched.email && errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div> 
      */}
      {/* --- FIM DA ÁREA COMENTADA DO QUESTIONÁRIO --- */}

      {/* Botão de envio */}
      <div className="flex justify-start">
        <button
          type="submit"
          id="submit-btn"
          // Botão desabilitado apenas se estiver enviando, mas não depende mais da validação
          disabled={isSubmitting} 
          // Classes ajustadas para sempre mostrar o estilo "amarelo" (hover/ativo)
          className={`w-full py-4 px-8 rounded-full
            bg-[#fed578] text-[#000000] uppercase tracking-wide
            transition-all duration-200
            hover:bg-[#fec555] hover:shadow-lg hover:scale-[1.02] cursor-pointer
            ${isSubmitting ? 'opacity-70 cursor-wait' : ''}
          `}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '700',
            fontSize: '1rem',
            letterSpacing: '0.05em',
            // stroke interno mais grosso
            boxShadow: 'inset 0 0 0 6px #a2542c',
          }}
        >
          {isSubmitting ? 'ENTRANDO...' : 'ENTRAR NO GRUPO AGORA'}
        </button>
      </div>
    </form>
  );
}
