import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Code, Database, TrendingUp, Mail, MapPin, Phone, Github, Linkedin, ExternalLink } from "lucide-react";
import heroImage from "@/assets/hero-basquiat.jpg";

interface TabProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Tab = ({ isActive, onClick, children }: TabProps) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 font-graffiti text-lg uppercase tracking-wider transition-all duration-300 border-b-4 ${
      isActive
        ? "border-primary text-primary shadow-neon bg-primary/10"
        : "border-transparent text-muted-foreground hover:text-foreground hover:border-accent"
    }`}
  >
    {children}
  </button>
);

const PortfolioTabs = () => {
  const [activeTab, setActiveTab] = useState("home");

  const projects = [
    {
      title: "Análise de Vendas E-commerce",
      description: "Dashboard interativo para análise de performance de vendas com insights automatizados",
      tech: ["Python", "Pandas", "Plotly", "Streamlit"],
      link: "#"
    },
    {
      title: "Predição de Churn",
      description: "Modelo de machine learning para predizer cancelamentos de clientes",
      tech: ["Python", "Scikit-learn", "XGBoost", "SQL"],
      link: "#"
    },
    {
      title: "ETL Pipeline",
      description: "Pipeline automatizado de extração, transformação e carregamento de dados",
      tech: ["Apache Airflow", "PostgreSQL", "Docker", "AWS"],
      link: "#"
    }
  ];

  const skills = [
    { category: "Linguagens", items: ["Python", "R", "SQL", "JavaScript"] },
    { category: "Ferramentas", items: ["Pandas", "NumPy", "Scikit-learn", "TensorFlow"] },
    { category: "Visualização", items: ["Tableau", "Power BI", "Plotly", "Matplotlib"] },
    { category: "Cloud", items: ["AWS", "Google Cloud", "Azure", "Databricks"] },
    { category: "Bancos de Dados", items: ["PostgreSQL", "MongoDB", "BigQuery", "Snowflake"] }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-lg border-4 border-primary">
              <div className="absolute inset-0 bg-gradient-basquiat opacity-80"></div>
              <img 
                src={heroImage} 
                alt="Data Analytics Art" 
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                <div>
                  <h1 className="text-4xl md:text-6xl font-graffiti text-background mb-4 uppercase tracking-wider drop-shadow-lg">
                    Data Artist
                  </h1>
                  <p className="text-xl md:text-2xl text-background/90 font-bold drop-shadow-md">
                    Transformando dados em insights visuais
                  </p>
                  <Button variant="basquiat" size="lg" className="mt-6">
                    Ver Projetos
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "50+", label: "Projetos" },
                { number: "5+", label: "Anos" },
                { number: "20+", label: "Clientes" },
                { number: "∞", label: "Insights" }
              ].map((stat, index) => (
                <Card key={index} className="text-center border-2 border-accent hover:shadow-neon transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-3xl font-graffiti text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "sobre":
        return (
          <div className="space-y-8">
            <Card className="border-2 border-secondary">
              <CardHeader>
                <CardTitle className="text-3xl font-graffiti text-primary uppercase">
                  Sobre Mim
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed">
                  Sou um analista de dados apaixonado por transformar números em narrativas visuais. 
                  Com mais de 5 anos de experiência, combino técnicas estatísticas avançadas com 
                  storytelling visual para gerar insights acionáveis.
                </p>
                <p className="text-lg leading-relaxed">
                  Minha abordagem única mistura rigor analítico com criatividade artística, 
                  inspirada no neo-expressionismo para criar visualizações que não apenas informam, 
                  mas também inspiram tomadas de decisão.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="text-xl font-bold text-accent mb-4">Experiência</h3>
                    <ul className="space-y-2">
                      <li>• Senior Data Analyst - TechCorp (2022-atual)</li>
                      <li>• Data Analyst - StartupXYZ (2020-2022)</li>
                      <li>• Junior Analyst - DataFirm (2019-2020)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-accent mb-4">Educação</h3>
                    <ul className="space-y-2">
                      <li>• MBA em Data Science - USP</li>
                      <li>• Estatística - UNICAMP</li>
                      <li>• Certificação Google Analytics</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "projetos":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-graffiti text-primary uppercase mb-4">Meus Projetos</h2>
              <p className="text-muted-foreground text-lg">Cada projeto é uma obra de arte dos dados</p>
            </div>
            <div className="grid gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="border-2 border-neo-cyan hover:shadow-street transition-all duration-300 hover:transform hover:scale-105">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl font-bold text-primary">{project.title}</CardTitle>
                        <CardDescription className="text-lg mt-2">{project.description}</CardDescription>
                      </div>
                      <Button variant="neo" size="icon">
                        <ExternalLink />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="bg-neo-purple text-background">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "habilidades":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-graffiti text-primary uppercase mb-4">Tech Stack</h2>
              <p className="text-muted-foreground text-lg">Ferramentas para criar arte com dados</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skillGroup, index) => (
                <Card key={index} className="border-2 border-neo-green hover:shadow-neon transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-secondary uppercase tracking-wide">
                      {skillGroup.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="border-accent text-accent">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 mt-12">
              {[
                { icon: BarChart3, label: "Análise", color: "text-primary" },
                { icon: Code, label: "Programação", color: "text-secondary" },
                { icon: Database, label: "Big Data", color: "text-accent" },
                { icon: TrendingUp, label: "Machine Learning", color: "text-neo-orange" }
              ].map((item, index) => (
                <Card key={index} className="text-center border-2 border-muted hover:border-primary transition-all duration-300">
                  <CardContent className="p-6">
                    <item.icon className={`h-12 w-12 mx-auto mb-4 ${item.color}`} />
                    <p className="font-semibold">{item.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "contato":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-graffiti text-primary uppercase mb-4">Vamos Colaborar</h2>
              <p className="text-muted-foreground text-lg">Pronto para criar arte com seus dados</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-accent">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-secondary">Entre em Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-primary" />
                    <span>contato@dataartist.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-primary" />
                    <span>+55 (11) 99999-9999</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 text-primary" />
                    <span>São Paulo, Brasil</span>
                  </div>
                  
                  <div className="flex space-x-4 pt-4">
                    <Button variant="street" size="icon">
                      <Github className="h-5 w-5" />
                    </Button>
                    <Button variant="street" size="icon">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary">Envie uma Mensagem</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Seu Nome" 
                    className="w-full p-3 rounded border-2 border-muted bg-background text-foreground"
                  />
                  <input 
                    type="email" 
                    placeholder="Seu Email" 
                    className="w-full p-3 rounded border-2 border-muted bg-background text-foreground"
                  />
                  <textarea 
                    placeholder="Sua Mensagem" 
                    rows={4}
                    className="w-full p-3 rounded border-2 border-muted bg-background text-foreground"
                  />
                  <Button variant="basquiat" className="w-full">
                    Enviar Mensagem
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b-4 border-primary bg-card">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-0">
            <Tab isActive={activeTab === "home"} onClick={() => setActiveTab("home")}>
              Home
            </Tab>
            <Tab isActive={activeTab === "sobre"} onClick={() => setActiveTab("sobre")}>
              Sobre
            </Tab>
            <Tab isActive={activeTab === "projetos"} onClick={() => setActiveTab("projetos")}>
              Projetos
            </Tab>
            <Tab isActive={activeTab === "habilidades"} onClick={() => setActiveTab("habilidades")}>
              Skills
            </Tab>
            <Tab isActive={activeTab === "contato"} onClick={() => setActiveTab("contato")}>
              Contato
            </Tab>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        {renderTabContent()}
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-secondary bg-card py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Data Artist Portfolio. Criando arte com dados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioTabs;