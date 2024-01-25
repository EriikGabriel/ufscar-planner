/** Retorno de dados deferidos do Siga */
type SigaSubject = {
  atividade: string
  turma: string
  horarios: {
    inicio: string
    fim: string
    sala: string
    dia: string
  }[]
}

/** Resposta OK da API de deferimento do Sagui */
type SigaApiOk = {
  data: SigaSubject[]
}

/** Resposta de Erro da API de deferimento do Sagui */
type SigaApiError = {
  timestamp: number
  status: number
  error: string
  message: string
  path: string
}

/** Resposta que o siga pode retornar pela API */
export type SigaResponse = SigaApiOk | SigaApiError

/** O motivo de erro que o Siga retornou */
export enum SigaErrorReason {
  /** O usuário não está autorizado ou suas credenciais são inválidas. */
  UNAUTHORIZED,
  /** Um erro desconhecido. */
  UNKNOWN,
}

/** Um erro do Siga, mapeado pelo planner */
export type SigaError = {
  ok: false
  error: SigaErrorReason
}

/** Um sucesso do Siga, incluindo as matérias do deferimento. */
export type SigaSuccess = {
  ok: true
  subjects: SigaSubject[]
}

export type SigaResult = SigaSuccess | SigaError
