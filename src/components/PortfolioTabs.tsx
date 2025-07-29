import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code, Database, BarChart, Brain, FileText } from 'lucide-react';
import MouseTrail from './MouseTrail';
import EnhancedParticles from './EnhancedParticles';
import LoadingScreen from './LoadingScreen';
import TransitionOverlay from './TransitionOverlay';
import TransitionParticles from './TransitionParticles';
import ProjectFilters, { Project } from './ProjectFilters';
import AdvancedContactForm from './AdvancedContactForm';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePageTransition } from '@/hooks/usePageTransition';

type TabType = 'home' | 'sobre' | 'projetos' | 'habilidades' | 'contato';

const PortfolioTabs = () => {
  const projects: Project[] = [
    {
      id: "1",
      title: "Análise de Meios de Pagamento no Brasil",
      description: "Análise abrangente dos meios de pagamento no Brasil de 2015 a 2024, incluindo Pix, TED, Cheque, Boleto e DOC.",
      summary: "Este projeto analisa a evolução dos meios de pagamento no Brasil, destacando o impacto revolucionário do Pix e as mudanças no comportamento de pagamento dos brasileiros. Utiliza dados oficiais do Banco Central para criar insights valiosos sobre o futuro do sistema financeiro brasileiro.",
      technologies: ["Python", "Pandas", "Requests", "CSV", "API Banco Central"],
      type: "Analytics",
      status: "Concluído",
      githubLink: "https://github.com/Hardcastro/analise-tipos-transicao-brasil2015-2024",
      mediumLink: "https://medium.com/@decastrobarreto/a-revolução-dos-meios-de-pagamento-no-brasil-uma-análise-de-2019-a-2024-5a5aaa46181a",
      year: 2024
    },
    {
      id: "2",
      title: "Dashboard Analytics Vendas",
      description: "Sistema completo de BI para análise de vendas com visualizações interativas e insights automatizados.",
      summary: "Dashboard interativo que transforma dados de vendas em insights acionáveis. Inclui análises de tendências, segmentação de clientes e previsões de vendas para tomada de decisão estratégica.",
      technologies: ["Python", "Power BI", "SQL", "Azure"],
      type: "BI",
      status: "Concluído",
      githubLink: "https://github.com/exemplo/dashboard-vendas",
      mediumLink: "https://medium.com/@exemplo/analise-vendas-dashboard",
      year: 2024
    },
    {
      id: "3",
      title: "Modelo Preditivo E-commerce",
      description: "Machine Learning para previsão de churn e segmentação de clientes em plataforma e-commerce.",
      summary: "Sistema de machine learning que prevê a probabilidade de churn de clientes e realiza segmentação automática. Utiliza algoritmos avançados para identificar padrões comportamentais e otimizar estratégias de retenção.",
      technologies: ["Python", "Scikit-learn", "Pandas", "Jupyter"],
      type: "ML",
      status: "Em desenvolvimento",
      githubLink: "https://github.com/exemplo/modelo-churn",
      mediumLink: "https://medium.com/@exemplo/modelo-preditivo-ecommerce",
      year: 2024
    },
    {
      id: "4",
      title: "ETL Pipeline Financeiro",
      description: "Pipeline automatizado para extração, transformação e carga de dados financeiros em tempo real.",
      summary: "Pipeline robusto que automatiza a coleta e processamento de dados financeiros de múltiplas fontes. Garante qualidade, consistência e disponibilidade dos dados para análises críticas de negócio.",
      technologies: ["Python", "Apache Airflow", "PostgreSQL", "Docker"],
      type: "Engineering",
      status: "Concluído",
      githubLink: "https://github.com/exemplo/etl-financeiro",
      mediumLink: "https://medium.com/@exemplo/pipeline-dados-financeiros",
      year: 2023
    },
    {
      id: "5",
      title: "Análise de Sentimento Redes Sociais",
      description: "Sistema de análise de sentimento em tempo real para monitoramento de marca nas redes sociais.",
      summary: "Solução de análise de sentimento que monitora menções de marca em redes sociais em tempo real. Utiliza NLP avançado para classificar sentimentos e gerar alertas automáticos para gestão de reputação.",
      technologies: ["Python", "NLTK", "TensorFlow", "AWS"],
      type: "Analytics",
      status: "Concluído",
      githubLink: "https://github.com/exemplo/analise-sentimento",
      mediumLink: "https://medium.com/@exemplo/monitoramento-redes-sociais",
      year: 2023
    },
    {
      id: "6",
      title: "Relatórios Automatizados BI",
      description: "Automação de relatórios semanais e mensais com Power BI e Python para múltiplos clientes.",
      summary: "Sistema automatizado que gera relatórios personalizados para múltiplos clientes. Elimina trabalho manual repetitivo e garante consistência na entrega de insights estratégicos.",
      technologies: ["Power BI", "Python", "SQL Server", "Power Automate"],
      type: "BI",
      status: "Concluído",
      githubLink: "https://github.com/exemplo/relatorios-automatizados",
      mediumLink: "https://medium.com/@exemplo/automacao-relatorios-bi",
      year: 2023
    }
  ];

  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showTransitionParticles, setShowTransitionParticles] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  const { transitionTo } = usePageTransition();

  useEffect(() => {
    // Trigger initial animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  const handleTabChange = (newTab: TabType) => {
    if (activeTab === newTab || isTransitioning) return;

    setIsTransitioning(true);
    setShowTransitionParticles(true);

    // Trigger transition particles
    setTimeout(() => {
      setActiveTab(newTab);
      setIsTransitioning(false);
      setShowTransitionParticles(false);
    }, 800);
  };

  const handleFilterChange = useCallback((filteredProjects: Project[]) => {
    setFilteredProjects(filteredProjects);
  }, []);

  const skills = {
    "Ferramentas de BI & Análise": ["Power BI", "SQL", "Excel Avançado", "Google Sheets", "Access"],
    "Linguagens & Programação": ["Python", "SQL", "ETL", "Automação"],
    "Análise de Dados": ["Dashboards", "KPIs", "Relatórios Executivos", "Análise Operacional"],
    "Gestão & Estratégia": ["Compras", "Logística", "Comercial B2B", "Indicadores de Performance"],
    "Certificações": ["Google Data Analytics", "SQL Coursera", "Power BI", "Yellow Belt FM2S"],
    "Idiomas": ["Inglês Fluente", "Espanhol", "Alemão"]
  };

  const navigation = [
    { id: 'home', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'contato', label: 'Contato' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="min-h-screen flex items-center justify-center relative">
            <div className="text-center max-w-4xl mx-auto px-6">
              <div className={`mb-8 transition-all duration-1000 ${isLoaded ? 'fade-in-up' : 'opacity-0'}`}>
                <h1 className="text-6xl md:text-8xl font-bold mb-6 headline-large">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    AEther
                  </span>
                  <br />
                  <span className="text-foreground">Inteligência de Negócios</span>
                </h1>
                <p className={`text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-500 body-text-large ${isLoaded ? 'fade-in-up' : 'opacity-0'}`}>
                  Analista de Inteligência de Negócios especializado em <span className="text-data-blue font-semibold">Business Intelligence</span>, 
                  <span className="text-data-cyan font-semibold"> Geoanálise</span> e 
                  <span className="text-data-purple font-semibold"> Comunicação Estratégica</span> com dados. 
                  Transformando complexidade em clareza através de insights acionáveis.
                </p>
              </div>
              
              <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-700 ${isLoaded ? 'fade-in-up' : 'opacity-0'}`}>
                <Button size="lg" className="bg-data-blue text-white hover:bg-data-cyan hover-lift hover-glow focus-ring text-lg px-8 py-4 btn-hover-effect magnetic-btn ripple btn-crown-cursor">
                  <Mail className="mr-2 h-5 w-5" />
                  Vamos conversar
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-data-blue/50 hover:border-data-blue hover-lift hover-glow focus-ring btn-hover-effect magnetic-btn ripple btn-crown-cursor">
                  <BarChart className="mr-2 h-5 w-5" />
                  Ver Portfolio
                </Button>
              </div>

              <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto transition-all duration-1000 delay-1000 ${isLoaded ? 'fade-in-up' : 'opacity-0'}`}>
                <div className="text-center hover-lift">
                  <div className="text-3xl font-bold text-data-blue">6+</div>
                  <div className="text-sm text-muted-foreground">Projetos</div>
                </div>
                <div className="text-center hover-lift">
                  <div className="text-3xl font-bold text-data-cyan">8+</div>
                  <div className="text-sm text-muted-foreground">Anos exp.</div>
                </div>
                <div className="text-center hover-lift">
                  <div className="text-3xl font-bold text-data-purple">4</div>
                  <div className="text-sm text-muted-foreground">Certificações</div>
                </div>
                <div className="text-center hover-lift">
                  <div className="text-3xl font-bold text-data-green">3</div>
                  <div className="text-sm text-muted-foreground">Idiomas</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sobre':
        return (
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-center headline">
                <span className="bg-gradient-primary bg-clip-text text-transparent">Sobre Mim</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6 body-text">
                    Sou AEther, analista de dados apaixonado por transformar dados complexos em insights 
                    acionáveis que impulsionam o crescimento dos negócios. Com experiência multidisciplinar em 
                    logística, compras, comercial B2B e análise de dados, especializo-me em Business Intelligence, 
                    geoanálise e comunicação estratégica com dados.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed body-text">
                    Minha abordagem combina rigor técnico com visão de negócio, sempre buscando maneiras 
                    inovadoras de visualizar e interpretar dados para contar histórias que façam a diferença.
                    Atualmente cursando Administração na UNISUAM, com formação em GeoEstatística da UFPel.
                  </p>
                </div>
                
                <Card className="basquiat-card">
                  <CardHeader>
                    <CardTitle className="text-data-blue basquiat-text">Experiência</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Estagiário em Logística</h4>
                      <p className="text-sm text-muted-foreground">Fotográfica S.A. • 2025 - Atual</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Monitoramento de estoque, automação de pedidos e relatórios operacionais
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Representante Comercial PJ</h4>
                      <p className="text-sm text-muted-foreground">Setor de Planos de Saúde (B2B) • 2024 - 2025</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Análise de performance comercial e estratégias de prospecção
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Analista de Compras</h4>
                      <p className="text-sm text-muted-foreground">Bravos Gestão Integrada • 2021 - 2023</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Processos de compras, análise de dados de suprimentos e indicadores logísticos
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="basquiat-card text-center hover-lift hover-glow">
                  <CardContent className="pt-6">
                    <Database className="h-12 w-12 basquiat-icon mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Data Engineering</h3>
                    <p className="text-sm text-muted-foreground">
                      Construção de pipelines robustos e escaláveis
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="basquiat-card text-center hover-lift hover-glow">
                  <CardContent className="pt-6">
                    <Brain className="h-12 w-12 basquiat-icon mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Machine Learning</h3>
                    <p className="text-sm text-muted-foreground">
                      Modelos preditivos e algoritmos avançados
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="basquiat-card text-center hover-lift hover-glow">
                  <CardContent className="pt-6">
                    <BarChart className="h-12 w-12 basquiat-icon mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Business Intelligence</h3>
                    <p className="text-sm text-muted-foreground">
                      Dashboards e relatórios estratégicos
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case 'projetos':
        return (
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center headline">
                <span className="bg-gradient-primary bg-clip-text text-transparent">Projetos</span>
              </h2>
              
              {/* Sistema de Filtros Avançados */}
              <ProjectFilters 
                projects={projects} 
                onFilterChange={handleFilterChange}
              />
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <Card key={project.id} className="basquiat-card hover:border-data-blue/50 transition-all duration-300 group hover-lift hover-glow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-3">
                        <CardTitle className="group-hover:text-data-blue transition-colors text-lg">
                          {project.title}
                        </CardTitle>
                        <Badge variant={project.status === "Concluído" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm mb-3">
                        {project.description}
                      </CardDescription>
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.summary}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="border-data-blue/50 text-data-blue text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {project.githubLink && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 group-hover:border-data-blue group-hover:text-data-blue"
                            onClick={() => window.open(project.githubLink, '_blank')}
                          >
                            <Github className="mr-2 h-4 w-4" />
                            Código
                          </Button>
                        )}
                        {project.mediumLink && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 group-hover:border-data-cyan group-hover:text-data-cyan"
                            onClick={() => window.open(project.mediumLink, '_blank')}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Relatório
                      </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'habilidades':
        return (
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center headline">
                <span className="bg-gradient-primary bg-clip-text text-transparent">Habilidades</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(skills).map(([category, skillList], index) => (
                  <Card key={index} className="basquiat-card">
                    <CardHeader>
                      <CardTitle className="text-data-blue">{category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill, skillIndex) => (
                          <Badge 
                            key={skillIndex} 
                            variant="secondary" 
                            className="bg-data-blue/10 text-data-blue border-data-blue/30"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-8 text-center text-data-blue headline">Áreas de Especialização</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="basquiat-card text-center hover-lift hover-glow">
                    <CardContent className="pt-6">
                      <Code className="h-16 w-16 text-data-blue mx-auto mb-4" />
                      <h4 className="font-semibold mb-3 text-lg">Data Science</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Análise estatística, modelagem preditiva e descoberta de padrões em dados complexos
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="basquiat-card text-center hover-lift hover-glow">
                    <CardContent className="pt-6">
                      <Database className="h-16 w-16 text-data-cyan mx-auto mb-4" />
                      <h4 className="font-semibold mb-3 text-lg">ETL & Data Warehousing</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Integração e governança de dados em larga escala com pipelines robustos
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="basquiat-card text-center hover-lift hover-glow">
                    <CardContent className="pt-6">
                      <BarChart className="h-16 w-16 text-data-purple mx-auto mb-4" />
                      <h4 className="font-semibold mb-3 text-lg">Visualização & BI</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Dashboards interativos e storytelling com dados para insights estratégicos
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contato':
        return (
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center headline">
                <span className="bg-gradient-primary bg-clip-text text-transparent">Contato</span>
              </h2>
              
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Informações de Contato */}
                <div className="lg:col-span-1">
                  <h3 className="text-2xl font-semibold mb-6 text-data-blue headline">Vamos conversar?</h3>
                  <p className="text-lg text-muted-foreground mb-8 body-text">
                    Estou sempre aberto a novas oportunidades e colaborações interessantes. 
                    Se você tem um projeto em mente ou gostaria de discutir possibilidades, 
                    não hesite em entrar em contato!
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-data-blue/10 rounded-lg flex items-center justify-center">
                        <Mail className="h-6 w-6 text-data-blue" />
                      </div>
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-muted-foreground">contato@aetherdata.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-data-cyan/10 rounded-lg flex items-center justify-center">
                        <Phone className="h-6 w-6 text-data-cyan" />
                      </div>
                      <div>
                        <p className="font-semibold">Telefone</p>
                        <p className="text-muted-foreground">+55 (21) 96000-2005</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-data-purple/10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-data-purple" />
                      </div>
                      <div>
                        <p className="font-semibold">Localização</p>
                        <p className="text-muted-foreground">Rio de Janeiro, RJ</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-data-blue/50 hover:border-data-blue"
                      onClick={() => window.open('https://github.com/Hardcastro', '_blank')}
                    >
                      <Github className="mr-2 h-5 w-5" />
                      GitHub
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-data-cyan/50 hover:border-data-cyan"
                      onClick={() => window.open('https://www.linkedin.com/in/gabriel-barreto-a84650179/', '_blank')}
                    >
                      <Linkedin className="mr-2 h-5 w-5" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
                
                {/* Formulário Avançado */}
                <div className="lg:col-span-2">
                  <AdvancedContactForm />
                    </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <TransitionOverlay isVisible={isTransitioning} direction="out" />
      <TransitionParticles 
        isActive={showTransitionParticles} 
        onComplete={() => setShowTransitionParticles(false)}
      />
      <div className={`min-h-screen bg-background basquiat-grid relative transition-bg ${
        isTransitioning ? 'transition-bg-active' : ''
      }`}>
        <EnhancedParticles />
        <MouseTrail />
      
      {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-700 ${isLoaded ? 'slide-in-top' : 'opacity-0'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
              <div className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent headline">
              DataAnalyst | AEther
            </div>
            
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                    onClick={() => handleTabChange(item.id as TabType)}
                    disabled={isTransitioning}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    activeTab === item.id
                        ? 'text-data-blue'
                      : 'text-muted-foreground hover:text-foreground'
                    } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'btn-crown-cursor'}`}
                >
                  {item.label}
                  {activeTab === item.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-data-blue rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/80 backdrop-blur-md border-t border-border">
        <div className="flex justify-around py-2">
          {navigation.map((item) => (
            <button
              key={item.id}
                onClick={() => handleTabChange(item.id as TabType)}
                disabled={isTransitioning}
                className={`flex flex-col items-center px-3 py-2 text-xs transition-all duration-300 ${
                activeTab === item.id
                    ? 'text-data-blue'
                  : 'text-muted-foreground'
                } ${isTransitioning ? 'opacity-50' : ''}`}
            >
                <div className={`w-1 h-1 rounded-full mb-1 transition-all duration-300 ${
                  activeTab === item.id ? 'bg-data-blue' : 'bg-transparent'
              }`} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
        <main className={`pt-16 pb-16 md:pb-0 relative z-10 transition-all duration-500 ${
          isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`}>
          <div className={`transition-all duration-700 ${isLoaded ? 'content-fade-in' : 'opacity-0'}`}>
        {renderTabContent()}
          </div>
      </main>
    </div>
    </>
  );
};

export default PortfolioTabs;