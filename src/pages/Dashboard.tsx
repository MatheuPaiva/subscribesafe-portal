import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSolicitacoes } from "@/hooks/useSolicitacoes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import SolicitacoesAdmin from "@/components/admin/SolicitacoesAdmin";

interface Solicitacao {
  id: string;
  descricao: string;
  status: string;
  created_at: string;
  resposta_admin?: string;
  valor_mensalidade?: number;
  respondida_em?: string;
}

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const { criarSolicitacao, buscarSolicitacoes, loading: enviandoSolicitacao } = useSolicitacoes();
  const [descricao, setDescricao] = useState('');
  const [userRole, setUserRole] = useState<string>('user');
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (user) {
      checkUserRole();
      carregarSolicitacoes();
    }
  }, [user, loading, navigate]);

  const checkUserRole = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', user.id)
      .single();
    
    if (data?.role) {
      setUserRole(data.role);
    }
  };

  const carregarSolicitacoes = async () => {
    const result = await buscarSolicitacoes();
    if (result.data) {
      setSolicitacoes(result.data as Solicitacao[]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao.trim()) return;

    const result = await criarSolicitacao(descricao);
    if (result.success) {
      setDescricao('');
      await carregarSolicitacoes(); // Recarrega as solicitações após criar uma nova
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      'pendente': 'outline',
      'respondida': 'default'
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Se for administrador, mostra interface administrativa
  if (userRole === 'admin') {
    return (
      <div className="min-h-screen bg-muted/30 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Personal Agente IA - Admin</h1>
              <p className="text-muted-foreground">Painel Administrativo - {user.user_metadata?.name || user.email}</p>
            </div>
            <Button onClick={signOut} variant="outline">
              Sair
            </Button>
          </div>

          <SolicitacoesAdmin />
        </div>
      </div>
    );
  }

  // Interface padrão do usuário
  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Personal Agente IA</h1>
            <p className="text-muted-foreground">Bem-vindo, {user.user_metadata?.name || user.email}!</p>
          </div>
          <Button onClick={signOut} variant="outline">
            Sair
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Nova Solicitação</CardTitle>
              <CardDescription>Descreva o que você precisa que nossa IA ajude você</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição da solicitação</Label>
                  <Textarea
                    id="descricao"
                    placeholder="Descreva detalhadamente o que você precisa. Exemplo: 'Preciso de um relatório de vendas mensal automatizado para minha empresa' ou 'Quero criar um sistema de gestão de tarefas para minha equipe'..."
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="min-h-[120px]"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={enviandoSolicitacao || !descricao.trim()}
                >
                  {enviandoSolicitacao ? 'Enviando...' : 'Enviar Solicitação'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
              <CardDescription>Suas informações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium">Nome</p>
                <p className="text-sm text-muted-foreground">{user.user_metadata?.name || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">CPF</p>
                <p className="text-sm text-muted-foreground">{user.user_metadata?.cpf || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Telefone</p>
                <p className="text-sm text-muted-foreground">{user.user_metadata?.phone || 'Não informado'}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seção de Solicitações do Usuário */}
        <Card>
          <CardHeader>
            <CardTitle>Minhas Solicitações</CardTitle>
            <CardDescription>Acompanhe suas solicitações e respostas</CardDescription>
          </CardHeader>
          <CardContent>
            {enviandoSolicitacao ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-sm text-muted-foreground mt-2">Carregando...</p>
              </div>
            ) : solicitacoes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>Você ainda não fez nenhuma solicitação.</p>
                <p className="text-sm">Use o formulário acima para fazer sua primeira solicitação.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {solicitacoes.map((solicitacao) => (
                  <div key={solicitacao.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm">Solicitação</p>
                        <p className="text-sm text-muted-foreground mt-1">{solicitacao.descricao}</p>
                      </div>
                      <div className="ml-4 text-right space-y-1">
                        {getStatusBadge(solicitacao.status)}
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(solicitacao.created_at), 'dd/MM/yyyy HH:mm', {
                            locale: ptBR
                          })}
                        </p>
                      </div>
                    </div>
                    
                    {solicitacao.status === 'respondida' && solicitacao.resposta_admin && (
                      <div className="border-t pt-3 space-y-2">
                        <div>
                          <p className="font-medium text-sm text-green-700 dark:text-green-400">Resposta da Equipe</p>
                          <p className="text-sm mt-1 p-3 bg-green-50 dark:bg-green-950/20 rounded-md">
                            {solicitacao.resposta_admin}
                          </p>
                        </div>
                        {solicitacao.valor_mensalidade && (
                          <div>
                            <p className="font-medium text-sm">Valor da Mensalidade</p>
                            <p className="text-lg font-bold text-green-600 dark:text-green-400">
                              R$ {solicitacao.valor_mensalidade.toLocaleString('pt-BR', { 
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2 
                              })}
                            </p>
                          </div>
                        )}
                        {solicitacao.respondida_em && (
                          <p className="text-xs text-muted-foreground">
                            Respondida em {format(new Date(solicitacao.respondida_em), 'dd/MM/yyyy HH:mm', {
                              locale: ptBR
                            })}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;