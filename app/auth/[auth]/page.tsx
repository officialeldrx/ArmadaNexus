import { auth0 } from "@/lib/auth0"

export default async function Auth() { await auth0.getSession() }