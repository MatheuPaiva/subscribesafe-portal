import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Básico",
    description: "Ideal para iniciantes",
    price: "R$ 29",
    period: "/mês",
    popular: false,
    features: [
      "Acesso ao conteúdo básico",
      "Suporte por email",
      "Dashboard pessoal",
      "Relatórios mensais",
      "Armazenamento 5GB"
    ],
    limitations: [
      "Até 100 downloads/mês",
      "Sem acesso a webinars"
    ]
  },
  {
    name: "Premium",
    description: "Para profissionais em crescimento",
    price: "R$ 79",
    period: "/mês",
    popular: true,
    features: [
      "Tudo do plano Básico",
      "Acesso a conteúdo premium",
      "Suporte prioritário",
      "Webinars exclusivos",
      "Armazenamento 50GB",
      "Relatórios detalhados",
      "Downloads ilimitados"
    ],
    limitations: []
  },
  {
    name: "Enterprise",
    description: "Para empresas e equipes",
    price: "R$ 199",
    period: "/mês",
    popular: false,
    features: [
      "Tudo do plano Premium",
      "Múltiplos usuários (até 20)",
      "Suporte 24/7",
      "Consultoria personalizada",
      "Armazenamento 500GB",
      "API access",
      "White-label option",
      "Integração customizada"
    ],
    limitations: []
  }
];

export const PricingSection = () => {
  return (
    <section id="plans" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Escolha o Plano Ideal
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Planos flexíveis que crescem junto com seu negócio. 
            Cancele ou altere a qualquer momento.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative transition-smooth hover:shadow-elevated ${
                plan.popular 
                  ? 'border-primary shadow-primary ring-1 ring-primary scale-105' 
                  : 'hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gradient-primary text-primary-foreground">
                  <Star className="w-3 h-3 mr-1" />
                  Mais Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-center gap-3 opacity-60">
                      <div className="w-5 h-5 rounded-full border border-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  variant={plan.popular ? "hero" : "default"} 
                  size="lg" 
                  className="w-full"
                >
                  {plan.popular ? "Começar Agora" : "Escolher Plano"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12 space-y-4">
          <p className="text-muted-foreground">
            ✓ Pagamento 100% seguro via Stripe • ✓ Cancele quando quiser • ✓ Suporte em português
          </p>
          <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              SSL Certificado
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              PCI Compliant
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              LGPD Compliant
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};