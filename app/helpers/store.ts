"use server"

import { compare, hash } from "bcrypt-ts"
import { randomInt } from "crypto"
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"

type CookieOptions = Omit<ResponseCookie, "name" | "value">

export async function hashValue(value: string) {
  const randomSalt = await randomInt(10, 16)
  const valueHash = await hash(value, randomSalt)

  return valueHash
}

export async function verifyValue(value: string, valueHash: string) {
  const isValid = await compare(value, valueHash)

  return isValid
}

export async function getCookie(name: string) {
  return cookies().get(name)
}

export async function setCookie(
  name: string,
  value: string,
  options?: CookieOptions
) {
  if (options?.secure) {
    const valueHash = await hashValue(value)
    cookies().set(name, valueHash, options)
  } else {
    cookies().set(name, value, options)
  }
}

export async function deleteCookie(name: string) {
  cookies().delete(name)
}
