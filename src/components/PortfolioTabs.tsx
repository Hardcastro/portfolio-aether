import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code, Database, BarChart, Brain } from 'lucide-react';

type TabType = 'home' | 'sobre' | 'projetos' | 'habilidades' | 'contato';

// Animated background particles component
const BackgroundParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 6,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-neon-green/20 particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const PortfolioTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const projects = [
    {
      title: "Dashboard Analytics Vendas",
      description: "Sistema completo de BI para análise de vendas com visualizações interativas e insights automatizados.",
      technologies: ["Python", "Power BI", "SQL", "Azure"],
      status: "Concluído",
      link: "#"
    },
    {
      title: "Modelo Preditivo E-commerce",
      description: "Machine Learning para previsão de churn e segmentação de clientes em plataforma e-commerce.",
      technologies: ["Python", "Scikit-learn", "Pandas", "Jupyter"],
      status: "Em desenvolvimento",
      link: "#"
    },
    {
      title: "ETL Pipeline Financeiro",
      description: "Pipeline automatizado para extração, transformação e carga de dados financeiros em tempo real.",
      technologies: ["Apache Airflow", "PostgreSQL", "Docker", "AWS"],
      status: "Concluído",
      link: "#"
    }
  ];

  const skills = {
    "Linguagens & Frameworks": ["Python", "R", "SQL", "JavaScript", "React", "Node.js"],
    "Ferramentas de BI": ["Power BI", "Tableau", "Looker", "QlikView"],
    "Banco de Dados": ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    "Cloud & DevOps": ["AWS", "Azure", "Docker", "Kubernetes", "Apache Airflow"],
    "Machine Learning": ["Scikit-learn", "TensorFlow", "PyTorch", "Pandas", "NumPy"],
    "Visualização": ["D3.js", "Plotly", "Matplotlib", "Seaborn"]
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
              <div className="mb-8">
                <h1 className="text-6xl md:text-8xl font-bold mb-6">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Dados que impulsionam
                  </span>
                  <br />
                  <span className="text-foreground">seu negócio</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Especialista em <span className="text-neon-green font-semibold">Business Intelligence</span>, 
                  <span className="text-neon-blue font-semibold"> Machine Learning</span> e 
                  <span className="text-neon-purple font-semibold"> Data Analytics</span> transformando 
                  complexidade em clareza através de insights orientados por dados.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="neon-glow text-lg px-8 py-4">
                  <Mail className="mr-2 h-5 w-5" />
                  Vamos conversar
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-neon-green/50 hover:border-neon-green">
                  <BarChart className="mr-2 h-5 w-5" />
                  Ver Portfolio
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-neon-green">50+</div>
                  <div className="text-sm text-muted-foreground">Projetos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-neon-blue">5+</div>
                  <div className="text-sm text-muted-foreground">Anos exp.</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-neon-purple">20+</div>
                  <div className="text-sm text-muted-foreground">Clientes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-neon-pink">100%</div>
                  <div className="text-sm text-muted-foreground">Satisfação</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sobre':
        return (
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-center">
                <span className="bg-gradient-primary bg-clip-text text-transparent">Sobre Mim</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Sou um analista de dados apaixonado por transformar dados complexos em insights 
                    acionáveis que impulsionam o crescimento dos negócios. Com mais de 5 anos de 
                    experiência, especializo-me em criar soluções de BI, desenvolver modelos de 
                    machine learning e construir pipelines de dados robustos.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Minha abordagem combina rigor técnico com criatividade, sempre buscando maneiras 
                    inovadoras de visualizar e interpretar dados para contar histórias que façam a diferença.
                  </p>
                </div>
                
                <Card className="border-neon-green/20 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-neon-green">Experiência</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Senior Data Analyst</h4>
                      <p className="text-sm text-muted-foreground">TechCorp • 2022 - Presente</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Data Analyst</h4>
                      <p className="text-sm text-muted-foreground">DataSolutions • 2020 - 2022</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Junior Analyst</h4>
                      <p className="text-sm text-muted-foreground">StartupXYZ • 2019 - 2020</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-neon-blue/20 bg-card/50 backdrop-blur text-center">
                  <CardContent className="pt-6">
                    <Database className="h-12 w-12 text-neon-blue mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Data Engineering</h3>
                    <p className="text-sm text-muted-foreground">
                      Construção de pipelines robustos e escaláveis
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-neon-purple/20 bg-card/50 backdrop-blur text-center">
                  <CardContent className="pt-6">
                    <Brain className="h-12 w-12 text-neon-purple mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Machine Learning</h3>
                    <p className="text-sm text-muted-foreground">
                      Modelos preditivos e algoritmos avançados
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-neon-pink/20 bg-card/50 backdrop-blur text-center">
                  <CardContent className="pt-6">
                    <BarChart className="h-12 w-12 text-neon-pink mx-auto mb-4" />
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
              <h2 className="text-4xl font-bold mb-12 text-center">
                <span className="bg-gradient-primary bg-clip-text text-transparent">Projetos</span>
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <Card key={index} className="border-neon-green/20 bg-card/50 backdrop-blur hover:border-neon-green/50 transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="group-hover:text-neon-green transition-colors">
                          {project.title}
                        </CardTitle>
                        <Badge variant={project.status === "Concluído" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="border-neon-blue/50 text-neon-blue">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="w-full group-hover:border-neon-green group-hover:text-neon-green">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Ver projeto
                      </Button>
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
              <h2 className="text-4xl font-bold mb-12 text-center">
                <span className="bg-gradient-primary bg-clip-text text-transparent">Habilidades</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(skills).map(([category, skillList], index) => (
                  <Card key={index} className="border-neon-purple/20 bg-card/50 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="text-neon-purple">{category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill, skillIndex) => (
                          <Badge 
                            key={skillIndex} 
                            variant="secondary" 
                            className="bg-neon-purple/10 text-neon-purple border-neon-purple/30"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12 text-center">
                <h3 className="text-2xl font-semibold mb-6 text-neon-green">Áreas de Especialização</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Code className="h-16 w-16 text-neon-blue mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Data Science</h4>
                    <p className="text-sm text-muted-foreground">
                      Análise estatística, modelagem preditiva e descoberta de padrões
                    </p>
                  </div>
                  <div className="text-center">
                    <Database className="h-16 w-16 text-neon-green mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">ETL & Data Warehousing</h4>
                    <p className="text-sm text-muted-foreground">
                      Integração e governança de dados em larga escala
                    </p>
                  </div>
                  <div className="text-center">
                    <BarChart className="h-16 w-16 text-neon-purple mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Visualização</h4>
                    <p className="text-sm text-muted-foreground">
                      Dashboards interativos e storytelling com dados
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contato':
        return (
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">
                <span className="bg-gradient-primary bg-clip-text text-transparent">Contato</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-neon-green">Vamos conversar!</h3>
                  <p className="text-lg text-muted-foreground mb-8">
                    Interessado em colaborar? Estou sempre aberto a discutir novos projetos, 
                    oportunidades criativas ou parcerias estratégicas.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-neon-green/10 rounded-lg flex items-center justify-center">
                        <Mail className="h-6 w-6 text-neon-green" />
                      </div>
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-muted-foreground">contato@analista.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-neon-blue/10 rounded-lg flex items-center justify-center">
                        <Phone className="h-6 w-6 text-neon-blue" />
                      </div>
                      <div>
                        <p className="font-semibold">Telefone</p>
                        <p className="text-muted-foreground">+55 (11) 99999-9999</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-neon-purple/10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-neon-purple" />
                      </div>
                      <div>
                        <p className="font-semibold">Localização</p>
                        <p className="text-muted-foreground">São Paulo, Brasil</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 mt-8">
                    <Button variant="outline" size="icon" className="border-neon-green/50 hover:border-neon-green">
                      <Github className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="border-neon-blue/50 hover:border-neon-blue">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <Card className="border-neon-green/20 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle>Envie uma mensagem</CardTitle>
                    <CardDescription>
                      Preencha o formulário e responderei em breve
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Nome</label>
                        <Input placeholder="Seu nome" className="border-muted/50" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input placeholder="seu@email.com" className="border-muted/50" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Assunto</label>
                      <Input placeholder="Assunto da mensagem" className="border-muted/50" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Mensagem</label>
                      <Textarea 
                        placeholder="Sua mensagem..."
                        rows={5}
                        className="border-muted/50"
                      />
                    </div>
                    <Button className="w-full neon-glow">
                      <Mail className="mr-2 h-4 w-4" />
                      Enviar mensagem
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background tech-grid relative">
      <BackgroundParticles />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              DataAnalyst
            </div>
            
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'text-neon-green'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-green rounded-full" />
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
              onClick={() => setActiveTab(item.id as TabType)}
              className={`flex flex-col items-center px-3 py-2 text-xs ${
                activeTab === item.id
                  ? 'text-neon-green'
                  : 'text-muted-foreground'
              }`}
            >
              <div className={`w-1 h-1 rounded-full mb-1 ${
                activeTab === item.id ? 'bg-neon-green' : 'bg-transparent'
              }`} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-16 pb-16 md:pb-0 relative z-10">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default PortfolioTabs;