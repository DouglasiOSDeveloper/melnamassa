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

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateWhatsApp = (whatsapp: string): boolean => {
    // Remove caracteres não numéricos
    const numbers = whatsapp.replace(/\D/g, '');
    // Aceita de 10 a 11 dígitos (DDD + número)
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

    // Limpar erro quando o usuário começar a digitar
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
    
    // Marcar todos os campos como touched
    setTouched({
      name: true,
      whatsapp: true,
      email: true,
    });

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form id="lead-form" onSubmit={handleSubmit} className="space-y-6">
      {/* Texto auxiliar */}
      <p 
        className="text-[#a2542c] opacity-70 italic"
        style={{
          fontSize: '0.95rem',
        }}
      >
        Preencha as informações abaixo:
      </p>

      {/* Campo Nome */}
      <div className="space-y-2">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={() => handleBlur('name')}
          placeholder="Como podemos te chamar?"
          className={`w-full px-4 py-3 rounded-lg border-2 bg-white transition-colors
            ${touched.name && errors.name 
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

      {/* Campo WhatsApp */}
      <div className="space-y-2">
        <input
          type="tel"
          id="whatsapp"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          onBlur={() => handleBlur('whatsapp')}
          placeholder="Seu número do WhatsApp:"
          className={`w-full px-4 py-3 rounded-lg border-2 bg-white transition-colors
            ${touched.whatsapp && errors.whatsapp 
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

      {/* Campo E-mail */}
      <div className="space-y-2">
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => handleBlur('email')}
          placeholder="Seu melhor e-mail:"
          className={`w-full px-4 py-3 rounded-lg border-2 bg-white transition-colors
            ${touched.email && errors.email 
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

      {/* Botão de envio */}
      <button
        type="submit"
        id="submit-btn"
        disabled={!isFormValid() || isSubmitting}
        className={`w-full py-4 px-8 rounded-full border-2 border-[#a2542c] 
          bg-[#fed578] text-[#a2542c] uppercase tracking-wide
          transition-all duration-200
          ${isFormValid() && !isSubmitting
            ? 'hover:bg-[#fec555] hover:shadow-lg hover:scale-[1.02] cursor-pointer' 
            : 'opacity-50 cursor-not-allowed'
          }`}
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '700',
          fontSize: '1rem',
          letterSpacing: '0.05em',
        }}
      >
        {isSubmitting ? 'ENVIANDO...' : 'QUERO GARANTIR MINHA VAGA'}
      </button>
    </form>
  );
}
