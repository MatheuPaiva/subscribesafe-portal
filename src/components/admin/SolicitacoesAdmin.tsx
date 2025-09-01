import { useEffect, useState } from "react";
import { useSolicitacoes } from "@/hooks/useSolicitacoes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Solicitacao {
  id: string;
  descricao: string;
  status: string;
  created_at: string;
  resposta_admin?: string;
  valor_mensalidade?: number;
  respondida_em?: string;
  profiles: {
    name: string;
    email: string;
    cpf?: string;
  };
}

const SolicitacoesAdmin = () => {
  const { buscarTodasSolicitacoes, responderSolicitacao, loading } = useSolicitacoes();
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [selectedSolicitacao, setSelectedSolicitacao] = useState<Solicitacao | null>(null);
  const [resposta, setResposta] = useState('');
  const [valor, setValor] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  const carregarSolicitacoes = async () => {
    const result = await buscarTodasSolicitacoes();
    if (result.data) {
      setSolicitacoes(result.data as Solicitacao[]);
    }
  };

  const handleResponder = async () => {
    if (!selectedSolicitacao || !resposta.trim() || !valor.trim()) return;

    const result = await responderSolicitacao(
      selectedSolicitacao.id,
      resposta,
      parseFloat(valor)
    );

    if (result.success) {
      setIsDialogOpen(false);
      setResposta('');
      setValor('');
      setSelectedSolicitacao(null);
      await carregarSolicitacoes();
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      'pendente': 'outline',
      'respondida': 'default'
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Painel Administrativo</CardTitle>
          <CardDescription>Gerencie todas as solicitações dos clientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Solicitação</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : solicitacoes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Nenhuma solicitação encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  solicitacoes.map((solicitacao) => (
                    <TableRow key={solicitacao.id}>
                      <TableCell className="font-medium">
                        {solicitacao.profiles.name || 'Nome não informado'}
                      </TableCell>
                      <TableCell>{solicitacao.profiles.email}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={solicitacao.descricao}>
                          {solicitacao.descricao}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(solicitacao.status)}</TableCell>
                      <TableCell>
                        {format(new Date(solicitacao.created_at), 'dd/MM/yyyy HH:mm', {
                          locale: ptBR
                        })}
                      </TableCell>
                      <TableCell>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedSolicitacao(solicitacao);
                                if (solicitacao.resposta_admin) {
                                  setResposta(solicitacao.resposta_admin);
                                }
                                if (solicitacao.valor_mensalidade) {
                                  setValor(solicitacao.valor_mensalidade.toString());
                                }
                              }}
                            >
                              {solicitacao.status === 'respondida' ? 'Ver Resposta' : 'Responder'}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>
                                {solicitacao?.status === 'respondida' ? 'Resposta Enviada' : 'Responder Solicitação'}
                              </DialogTitle>
                              <DialogDescription>
                                Cliente: {selectedSolicitacao?.profiles.name} ({selectedSolicitacao?.profiles.email})
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Solicitação do Cliente</Label>
                                <div className="p-3 bg-muted rounded-md text-sm">
                                  {selectedSolicitacao?.descricao}
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="resposta">Sua Resposta</Label>
                                <Textarea
                                  id="resposta"
                                  placeholder="Digite sua resposta detalhada para o cliente..."
                                  value={resposta}
                                  onChange={(e) => setResposta(e.target.value)}
                                  className="min-h-[100px]"
                                  disabled={selectedSolicitacao?.status === 'respondida'}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="valor">Valor da Mensalidade (R$)</Label>
                                <Input
                                  id="valor"
                                  type="number"
                                  step="0.01"
                                  placeholder="0.00"
                                  value={valor}
                                  onChange={(e) => setValor(e.target.value)}
                                  disabled={selectedSolicitacao?.status === 'respondida'}
                                />
                              </div>

                              {selectedSolicitacao?.status === 'respondida' && (
                                <div className="text-sm text-muted-foreground">
                                  Respondida em {format(new Date(selectedSolicitacao.respondida_em!), 'dd/MM/yyyy HH:mm', {
                                    locale: ptBR
                                  })}
                                </div>
                              )}

                              {selectedSolicitacao?.status !== 'respondida' && (
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Cancelar
                                  </Button>
                                  <Button 
                                    onClick={handleResponder}
                                    disabled={loading || !resposta.trim() || !valor.trim()}
                                  >
                                    {loading ? 'Enviando...' : 'Enviar Resposta'}
                                  </Button>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolicitacoesAdmin;