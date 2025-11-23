import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { user, password } = await req.json()

    if (!user || !password) {
      return NextResponse.json(
        { ok: false, error: "MISSING_CREDENTIALS" },
        { status: 400 }
      )
    }

    const encoded = Buffer.from(`${user}:${password}`).toString("base64")

    const fetchRes = await fetch(
      "https://sistemas.ufscar.br/sagui-api/siga/deferimento",
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + encoded,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    )

    if (fetchRes.status === 401 || fetchRes.status === 403) {
      return NextResponse.json(
        { ok: false, error: "UNAUTHORIZED" },
        { status: 401 }
      )
    }

    const data = await fetchRes.json()

    return NextResponse.json({ ok: true, data }, { status: 200 })
  } catch (err) {
    console.error("API SIGA ERROR:", err)

    return NextResponse.json({ ok: false, error: "UNKNOWN" }, { status: 500 })
  }
}
