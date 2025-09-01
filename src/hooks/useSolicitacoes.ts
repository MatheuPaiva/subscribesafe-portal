import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

export const useSolicitacoes = () => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const criarSolicitacao = async (descricao: string) => {
    try {
      setLoading(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('Usuário não autenticado')
      }

      const { error } = await supabase
        .from('solicitacoes')
        .insert({
          user_id: user.id,
          descricao: descricao.trim(),
          status: 'pendente'
        })

      if (error) throw error

      toast({
        title: "Solicitação enviada!",
        description: "Sua solicitação foi enviada com sucesso. Em breve entraremos em contato."
      })

      return { success: true, error: null }
    } catch (error: any) {
      toast({
        title: "Erro ao enviar solicitação",
        description: error.message,
        variant: "destructive"
      })
      return { success: false, error }
    } finally {
      setLoading(false)
    }
  }

  const buscarSolicitacoes = async () => {
    try {
      setLoading(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('Usuário não autenticado')
      }

      const { data, error } = await supabase
        .from('solicitacoes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { data, error: null }
    } catch (error: any) {
      toast({
        title: "Erro ao buscar solicitações",
        description: error.message,
        variant: "destructive"
      })
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const buscarTodasSolicitacoes = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from('solicitacoes')
        .select(`
          *,
          profiles:user_id (
            name,
            email,
            cpf
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { data, error: null }
    } catch (error: any) {
      toast({
        title: "Erro ao buscar solicitações",
        description: error.message,
        variant: "destructive"
      })
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const responderSolicitacao = async (
    id: string, 
    resposta_admin: string, 
    valor_mensalidade: number
  ) => {
    try {
      setLoading(true)

      const { error } = await supabase
        .from('solicitacoes')
        .update({
          resposta_admin,
          valor_mensalidade,
          respondida_em: new Date().toISOString(),
          status: 'respondida'
        })
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Resposta enviada!",
        description: "A resposta foi enviada com sucesso para o cliente."
      })

      return { success: true, error: null }
    } catch (error: any) {
      toast({
        title: "Erro ao responder solicitação",
        description: error.message,
        variant: "destructive"
      })
      return { success: false, error }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    criarSolicitacao,
    buscarSolicitacoes,
    buscarTodasSolicitacoes,
    responderSolicitacao
  }
}