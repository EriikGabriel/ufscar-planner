"use server"

import { setCookie } from "@helpers/store"

export async function setSigaServerCookie(data: string) {
  await setCookie("siga-auth", String(data), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  })
}

export async function setFirstSetupServerCookie(data: boolean) {
  await setCookie("first-setup", String(data), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  })
}
