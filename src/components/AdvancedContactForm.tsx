import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Clock, Upload, X, CheckCircle, AlertCircle, Mail, Phone, User, FileText, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  files: File[];
  scheduleMeeting: boolean;
  preferredDate: string;
  preferredTime: string;
  newsletter: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

const AdvancedContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    files: [],
    scheduleMeeting: false,
    preferredDate: '',
    preferredTime: '',
    newsletter: false
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState<{[key: string]: boolean}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validação em tempo real
  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Nome é obrigatório';
        if (value.length < 2) return 'Nome deve ter pelo menos 2 caracteres';
        if (value.length > 50) return 'Nome deve ter no máximo 50 caracteres';
        return '';

      case 'email':
        if (!value.trim()) return 'Email é obrigatório';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Email inválido';
        return '';

      case 'phone':
        if (value && value.trim()) {
          const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
          const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
          if (!phoneRegex.test(cleanPhone)) return 'Telefone inválido';
        }
        return '';

      case 'company':
        if (value && value.length > 100) return 'Nome da empresa deve ter no máximo 100 caracteres';
        return '';

      case 'message':
        if (!value.trim()) return 'Mensagem é obrigatória';
        if (value.length < 10) return 'Mensagem deve ter pelo menos 10 caracteres';
        if (value.length > 1000) return 'Mensagem deve ter no máximo 1000 caracteres';
        return '';

      case 'preferredDate':
        if (formData.scheduleMeeting && !value) return 'Data preferida é obrigatória para agendamento';
        if (value) {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) return 'Data deve ser futura';
        }
        return '';

      case 'preferredTime':
        if (formData.scheduleMeeting && !value) return 'Horário preferido é obrigatório para agendamento';
        return '';

      default:
        return '';
    }
  };

  // Validação em tempo real com debounce
  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Marcar campo como validando
    setIsValidating(prev => ({ ...prev, [name]: true }));
    
    // Debounce para validação
    setTimeout(() => {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
      setIsValidating(prev => ({ ...prev, [name]: false }));
    }, 300);
  };

  // Upload de arquivos
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        toast.error(`Arquivo ${file.name} é muito grande (máximo 10MB)`);
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        toast.error(`Tipo de arquivo ${file.name} não é suportado`);
        return false;
      }
      return true;
    });

    if (validFiles.length + formData.files.length > 5) {
      toast.error('Máximo de 5 arquivos permitidos');
      return;
    }

    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  // Validação completa do formulário
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envio (substituir por API real)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      
      // Reset do formulário
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: '',
        files: [],
        scheduleMeeting: false,
        preferredDate: '',
        preferredTime: '',
        newsletter: false
      });
      setErrors({});
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldStatus = (fieldName: string) => {
    if (isValidating[fieldName]) return 'validating';
    if (errors[fieldName]) return 'error';
    if (formData[fieldName as keyof FormData]) return 'success';
    return 'default';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'validating':
        return <div className="animate-spin h-4 w-4 border-2 border-data-blue border-t-transparent rounded-full" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-data-green" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="basquiat-card">
        <CardHeader>
          <CardTitle className="text-data-blue headline flex items-center gap-2">
            <Mail className="h-6 w-6" />
            Formulário de Contato Avançado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Pessoais */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Nome Completo *
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                    className={`pr-10 ${getFieldStatus('name') === 'error' ? 'border-destructive' : ''}`}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {getStatusIcon(getFieldStatus('name'))}
                  </div>
                </div>
                {errors.name && (
                  <Alert variant="destructive" className="py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.name}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email *
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    placeholder="seu@email.com"
                    className={`pr-10 ${getFieldStatus('email') === 'error' ? 'border-destructive' : ''}`}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {getStatusIcon(getFieldStatus('email'))}
                  </div>
                </div>
                {errors.email && (
                  <Alert variant="destructive" className="py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.email}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Telefone
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                    className={`pr-10 ${getFieldStatus('phone') === 'error' ? 'border-destructive' : ''}`}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {getStatusIcon(getFieldStatus('phone'))}
                  </div>
                </div>
                {errors.phone && (
                  <Alert variant="destructive" className="py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.phone}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Empresa
                </Label>
                <div className="relative">
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleFieldChange('company', e.target.value)}
                    placeholder="Nome da sua empresa"
                    className={`pr-10 ${getFieldStatus('company') === 'error' ? 'border-destructive' : ''}`}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {getStatusIcon(getFieldStatus('company'))}
                  </div>
                </div>
                {errors.company && (
                  <Alert variant="destructive" className="py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.company}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            {/* Detalhes do Projeto */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="projectType">Tipo de Projeto</Label>
                <Select value={formData.projectType} onValueChange={(value) => handleFieldChange('projectType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bi">Business Intelligence</SelectItem>
                    <SelectItem value="ml">Machine Learning</SelectItem>
                    <SelectItem value="analytics">Data Analytics</SelectItem>
                    <SelectItem value="engineering">Data Engineering</SelectItem>
                    <SelectItem value="consulting">Consultoria</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Orçamento Estimado</Label>
                <Select value={formData.budget} onValueChange={(value) => handleFieldChange('budget', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o orçamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Até R$ 10.000</SelectItem>
                    <SelectItem value="medium">R$ 10.000 - R$ 50.000</SelectItem>
                    <SelectItem value="large">R$ 50.000 - R$ 200.000</SelectItem>
                    <SelectItem value="enterprise">Acima de R$ 200.000</SelectItem>
                    <SelectItem value="discuss">A discutir</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Prazo Desejado</Label>
                <Select value={formData.timeline} onValueChange={(value) => handleFieldChange('timeline', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o prazo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgente (1-2 semanas)</SelectItem>
                    <SelectItem value="fast">Rápido (1-2 meses)</SelectItem>
                    <SelectItem value="normal">Normal (3-6 meses)</SelectItem>
                    <SelectItem value="flexible">Flexível (6+ meses)</SelectItem>
                    <SelectItem value="discuss">A discutir</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Mensagem */}
            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Descrição do Projeto *
              </Label>
              <div className="relative">
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  placeholder="Descreva seu projeto, objetivos, requisitos e qualquer informação relevante..."
                  rows={6}
                  className={`pr-10 ${getFieldStatus('message') === 'error' ? 'border-destructive' : ''}`}
                />
                <div className="absolute right-3 top-3">
                  {getStatusIcon(getFieldStatus('message'))}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {formData.message.length}/1000 caracteres
              </div>
              {errors.message && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.message}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Upload de Arquivos */}
            <div className="space-y-4">
              <Label className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Anexos (opcional)
              </Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-data-blue/50 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="mb-2"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Selecionar Arquivos
                </Button>
                <p className="text-sm text-muted-foreground">
                  PDF, DOC, TXT, JPG, PNG (máx. 5 arquivos, 10MB cada)
                </p>
              </div>

              {/* Lista de arquivos */}
              {formData.files.length > 0 && (
                <div className="space-y-2">
                  <Label>Arquivos selecionados:</Label>
                  <div className="space-y-2">
                    {formData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-data-blue" />
                          <span className="text-sm">{file.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </Badge>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Agendamento de Reunião */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="scheduleMeeting"
                  checked={formData.scheduleMeeting}
                  onCheckedChange={(checked) => handleFieldChange('scheduleMeeting', checked)}
                />
                <Label htmlFor="scheduleMeeting" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Gostaria de agendar uma reunião?
                </Label>
              </div>

              {formData.scheduleMeeting && (
                <div className="grid md:grid-cols-2 gap-6 p-4 bg-muted/30 rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Data Preferida *
                    </Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleFieldChange('preferredDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.preferredDate && (
                      <Alert variant="destructive" className="py-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.preferredDate}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredTime" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Horário Preferido *
                    </Label>
                    <Select value={formData.preferredTime} onValueChange={(value) => handleFieldChange('preferredTime', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o horário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Manhã (9h - 12h)</SelectItem>
                        <SelectItem value="afternoon">Tarde (14h - 17h)</SelectItem>
                        <SelectItem value="evening">Noite (18h - 20h)</SelectItem>
                        <SelectItem value="flexible">Flexível</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.preferredTime && (
                      <Alert variant="destructive" className="py-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.preferredTime}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Newsletter */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="newsletter"
                checked={formData.newsletter}
                onCheckedChange={(checked) => handleFieldChange('newsletter', checked)}
              />
              <Label htmlFor="newsletter">
                Quero receber novidades sobre Data Science e Analytics
              </Label>
            </div>

            {/* Botão de Envio */}
            <Button
              type="submit"
              disabled={isSubmitting || Object.keys(errors).length > 0}
              className="w-full bg-data-blue text-white hover:bg-data-cyan disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Enviando...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar Mensagem
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedContactForm; 