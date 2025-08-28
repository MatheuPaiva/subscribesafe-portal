import { Shield, Users, Clock, BarChart3, Lock, Headphones } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Segurança Máxima",
    description: "Criptografia de ponta a ponta e conformidade com LGPD para proteger seus dados pessoais."
  },
  {
    icon: Users,
    title: "Gestão de Usuários",
    description: "Controle total sobre perfis, permissões e acesso a conteúdos baseado na assinatura."
  },
  {
    icon: Clock,
    title: "Disponibilidade 24/7",
    description: "Acesse sua conta e conteúdos a qualquer hora, com uptime garantido de 99.9%."
  },
  {
    icon: BarChart3,
    title: "Relatórios Detalhados",
    description: "Acompanhe seu progresso, downloads e estatísticas de uso em dashboards intuitivos."
  },
  {
    icon: Lock,
    title: "Controle de Acesso",
    description: "Sistema automático que gerencia permissões baseado no status da sua assinatura."
  },
  {
    icon: Headphones,
    title: "Suporte Especializado",
    description: "Equipe de suporte em português, disponível via chat, email e WhatsApp."
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Recursos Profissionais
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tudo que você precisa para gerenciar suas assinaturas e acessar conteúdos 
            exclusivos de forma segura e eficiente.
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
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">
              Certificado ISO 27001 • PCI DSS Level 1 • LGPD Compliant
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};