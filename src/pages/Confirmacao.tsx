import { CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Confirmacao = () => {
  const handleWhatsAppRedirect = () => {
    const phoneNumber = "5511999999999"; // Substitua pelo seu número do WhatsApp
    const message = encodeURIComponent(
      "Olá! Acabei de me cadastrar no sistema financeiro e gostaria de começar a usar o bot para gerenciar minhas finanças. Pode me ajudar?"
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="glass-card p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="tech-icon-container">
              <CheckCircle className="w-16 h-16 text-accent" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-light">
              Cadastro Realizado!
            </h1>
            <p className="text-muted-foreground text-lg">
              Parabéns! Sua conta foi criada com sucesso.
            </p>
            <p className="text-sm text-muted-foreground">
              Agora você pode começar a gerenciar suas finanças através do nosso bot no WhatsApp.
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleWhatsAppRedirect}
              className="w-full h-14 text-lg font-semibold bg-accent hover:bg-accent/90 text-white shadow-glow transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Iniciar Conversa no WhatsApp
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Clique no botão acima para ser redirecionado ao WhatsApp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmacao;