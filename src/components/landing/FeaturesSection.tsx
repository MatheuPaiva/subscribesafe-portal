import { Brain, MessageSquare, Zap, BarChart3, Shield, Headphones } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "IA Avançada",
    description: "Tecnologia de inteligência artificial de última geração para entender e resolver suas demandas específicas."
  },
  {
    icon: MessageSquare,
    title: "Comunicação Natural",
    description: "Converse com nossa IA como se fosse um assistente humano, usando linguagem natural e simples."
  },
  {
    icon: Zap,
    title: "Respostas Rápidas",
    description: "Soluções personalizadas entregues em minutos, não em horas ou dias."
  },
  {
    icon: BarChart3,
    title: "Análise Inteligente",
    description: "Capacidade de analisar dados complexos e fornecer insights acionáveis para seu negócio."
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Seus dados e conversas são protegidos com criptografia de ponta e conformidade com LGPD."
  },
  {
    icon: Headphones,
    title: "Suporte Contínuo",
    description: "Assistência especializada sempre disponível para garantir que você aproveite ao máximo nossa plataforma."
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Como Nosso Agente IA Te Ajuda
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra como nossa inteligência artificial pode transformar a forma 
            como você resolve problemas e toma decisões no seu dia a dia.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-elevated transition-smooth group">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 gradient-primary rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-bounce">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
            <Brain className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">
              Tecnologia OpenAI • Processamento Seguro • LGPD Compliant
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};