import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Bot, DollarSign, Target, TrendingUp } from "lucide-react";

export const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone_whatsapp: "",
    pin_seguranca: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Primeiro, criar conta no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: `${formData.telefone_whatsapp}@finbot.com`, // Usar telefone como email único
        password: formData.pin_seguranca,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            nome: formData.nome,
            telefone_whatsapp: formData.telefone_whatsapp
          }
        }
      });

      if (authError) throw authError;

      // Depois, criar perfil na tabela usuarios
      const { error: profileError } = await supabase
        .from('usuarios')
        .insert({
          id: authData.user?.id,
          nome: formData.nome,
          telefone_whatsapp: formData.telefone_whatsapp,
          pin_seguranca: formData.pin_seguranca
        });

      if (profileError) throw profileError;

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Bem-vindo ao FinBot. Seu assistente financeiro pessoal está pronto.",
      });

      // Resetar formulário
      setFormData({ nome: "", telefone_whatsapp: "", pin_seguranca: "" });

    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.message || "Tente novamente",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-primary rounded-full p-4">
              <Bot className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            FinBot
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Seu assistente financeiro pessoal inteligente. Controle suas finanças, 
            defina metas e receba insights personalizados via WhatsApp.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle>Controle Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Monitore receitas, despesas e categorize suas transações automaticamente
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle>Metas Inteligentes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Defina objetivos financeiros e acompanhe seu progresso em tempo real
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle>Insights Personalizados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Receba análises e dicas personalizadas direto no seu WhatsApp
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Cadastro Form */}
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Comece Agora</CardTitle>
              <CardDescription className="text-center">
                Cadastre-se gratuitamente e transforme sua vida financeira
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="telefone">WhatsApp</Label>
                  <Input
                    id="telefone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.telefone_whatsapp}
                    onChange={(e) => setFormData({ ...formData, telefone_whatsapp: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="pin">PIN de Segurança (6 dígitos)</Label>
                  <Input
                    id="pin"
                    type="password"
                    placeholder="••••••"
                    maxLength={6}
                    value={formData.pin_seguranca}
                    onChange={(e) => setFormData({ ...formData, pin_seguranca: e.target.value })}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cadastrando...
                    </>
                  ) : (
                    "Cadastrar Gratuitamente"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};