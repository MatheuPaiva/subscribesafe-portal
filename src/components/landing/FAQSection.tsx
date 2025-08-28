import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona o sistema de assinaturas?",
    answer: "Nosso sistema utiliza pagamentos recorrentes processados pelo Stripe. Você pode cancelar, pausar ou alterar seu plano a qualquer momento através do portal do cliente. O acesso aos conteúdos é automaticamente ajustado conforme seu plano ativo."
  },
  {
    question: "O que acontece se o pagamento falhar?",
    answer: "Em caso de falha no pagamento, você receberá notificações por email com instruções para regularizar. Após 3 tentativas sem sucesso, o acesso aos conteúdos premium será temporariamente suspenso até a regularização."
  },
  {
    question: "Posso alterar meu plano a qualquer momento?",
    answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano através do portal do cliente. Mudanças são aplicadas imediatamente e o valor é ajustado proporcionalmente na próxima cobrança."
  },
  {
    question: "Os dados são seguros?",
    answer: "Absolutamente. Utilizamos criptografia de ponta a ponta, certificação SSL e somos compliant com LGPD. Seus dados pessoais e informações de pagamento são processados de forma totalmente segura."
  },
  {
    question: "Como funciona o suporte técnico?",
    answer: "Oferecemos suporte via chat ao vivo, email e WhatsApp. Usuários Premium e Enterprise têm suporte prioritário com SLA garantido. Nossa equipe fala português e está disponível das 8h às 20h."
  },
  {
    question: "Posso usar em múltiplos dispositivos?",
    answer: "Sim, sua conta funciona em qualquer dispositivo - computador, tablet ou smartphone. O plano Enterprise permite múltiplos usuários (até 20) na mesma conta corporativa."
  },
  {
    question: "Existe período de teste gratuito?",
    answer: "Oferecemos 7 dias de acesso gratuito ao plano Premium para novos usuários. Não é necessário cartão de crédito para começar o teste."
  },
  {
    question: "Como cancelo minha assinatura?",
    answer: "O cancelamento pode ser feito a qualquer momento através do seu dashboard. Você manterá acesso até o final do período já pago, sem taxas de cancelamento."
  }
];

export const FAQSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nosso portal do cliente.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-lg px-6 border shadow-card"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Não encontrou sua resposta?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:suporte@portalcliente.com.br"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-smooth font-medium"
              >
                Entre em Contato
              </a>
              <a 
                href="https://wa.me/5511999999999"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-smooth font-medium"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};