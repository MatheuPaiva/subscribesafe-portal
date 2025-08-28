import { Shield, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Portal Cliente</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Plataforma profissional para gestão de assinaturas e acesso a conteúdos exclusivos.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth cursor-pointer">
                <Mail className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth cursor-pointer">
                <Phone className="w-4 h-4" />
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Links Rápidos</h3>
            <nav className="flex flex-col gap-2">
              <a href="#plans" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Planos e Preços
              </a>
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Recursos
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Documentação
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Status do Sistema
              </a>
            </nav>
          </div>
          
          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Suporte</h3>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Central de Ajuda
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Contato
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Chat Online
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                WhatsApp
              </a>
            </nav>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">suporte@portalcliente.com.br</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">(11) 9999-9999</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 Portal Cliente. Todos os direitos reservados.
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-smooth">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-foreground transition-smooth">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-foreground transition-smooth">
                LGPD
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};