import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSolicitacoes } from "@/hooks/useSolicitacoes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const { criarSolicitacao, loading: enviandoSolicitacao } = useSolicitacoes();
  const [descricao, setDescricao] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao.trim()) return;

    const result = await criarSolicitacao(descricao);
    if (result.success) {
      setDescricao('');
    }
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;