"use server"

import { SigaErrorReason, SigaResponse, SigaResult } from "@@types/siga"

const SIGA_URL = "https://sistemas.ufscar.br/sagui-api/siga/deferimento"

export async function fetchSiga(
  user: string,
  password: string
): Promise<SigaResult> {
  const encodedAuth = Buffer.from(`${user}:${password}`).toString("base64")
  const headers = { Authorization: "Basic " + encodedAuth }

  try {
    const fetchResult = await fetch(SIGA_URL, { headers })
    if (fetchResult.status == 200) {
      try {
        const res = (await fetchResult.json()) as SigaResponse
        if ("error" in res) {
          if (res.status == 401 || res.status == 403) {
            return { ok: false, error: SigaErrorReason.UNAUTHORIZED }
          } else {
            return { ok: false, error: SigaErrorReason.UNKNOWN }
          }
        } else {
          return { ok: true, subjects: res.data }
        }
      } catch (_jsonError) {
        return { ok: false, error: SigaErrorReason.UNKNOWN }
      }
    } else if (fetchResult.status == 401 || fetchResult.status == 403) {
      return { ok: false, error: SigaErrorReason.UNAUTHORIZED }
    } else {
      return { ok: false, error: SigaErrorReason.UNKNOWN }
    }
  } catch (_) {
    return { ok: false, error: SigaErrorReason.UNKNOWN }
  }
}
