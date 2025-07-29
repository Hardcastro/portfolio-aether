import PortfolioTabs from "@/components/PortfolioTabs";

const Index = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>AEther Portfolio - Teste</h1>
      <p>Se você está vendo esta mensagem, o React está funcionando!</p>
      <PortfolioTabs />
    </div>
  );
};

export default Index;
