import { FormEvent /*, useState, ChangeEvent*/ } from 'react';

interface LeadFormProps {
  onSubmit: () => void; // Alterado para não receber dados
  isSubmitting: boolean;
}

/* interface FormData {
  name: string;
  whatsapp: string;
  email: string;
}

interface FormErrors {
  name?: string;
  whatsapp?: string;
  email?: string;
}
*/

export function LeadForm({ onSubmit, isSubmitting }: LeadFormProps) {
  /* --- ESTADOS E VALIDAÇÕES COMENTADOS --- */
  /*
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
    const numbers = whatsapp.replace(/\D/g, '');
    return numbers.length >= 10 && numbers.length <= 11;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Por favor, preencha seu nome';
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
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };
  */

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /*
    setTouched({
      name: true,
      whatsapp: true,
      email: true,
    });
    */

    // Chama direto, sem validação e sem dados
    onSubmit();
  };

  return (
    <form id="lead-form" onSubmit={handleSubmit} className="space-y-6">
      
      {/* --- INÍCIO DA ÁREA COMENTADA DO QUESTIONÁRIO --- */}
      {/* <p className="text-[#a2542c] opacity-70 italic" style={{ fontSize: '0.95rem' }}>
        Preencha as informações abaixo:
      </p>

      <div className="space-y-2">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={() => handleBlur('name')}
          placeholder="Como podemos te chamar?"
          className="..."
        />
      </div>
      ... (outros inputs) ...
      */}
      {/* --- FIM DA ÁREA COMENTADA DO QUESTIONÁRIO --- */}

      {/* Botão de envio */}
      <div className="flex justify-start">
        <button
          type="submit"
          id="submit-btn"
          disabled={isSubmitting} 
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
            boxShadow: 'inset 0 0 0 6px #a2542c',
          }}
        >
          {isSubmitting ? 'ENTRANDO...' : 'ENTRAR NO GRUPO AGORA'}
        </button>
      </div>
    </form>
  );
}