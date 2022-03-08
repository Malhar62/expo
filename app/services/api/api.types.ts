import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"

export interface User {
  id: number
  name: string
}
export interface Hits {
  hits: any[]
  nbHits: number,
  page: number,
  nbPages: number
  hitsPerPage: number
  exhaustiveNbHits: boolean
  exhaustiveTypo: boolean
  query: string
  params: string
  processingTimeMS: number
}
export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

export type GetHits = { kind: "ok"; data: Hits } | GeneralApiProblem