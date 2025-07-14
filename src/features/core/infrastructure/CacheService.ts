import "reflect-metadata"
import { Bit } from "bitterer/browser";

interface ICache {
  [name: string]: unknown
}

@Bit('cacheService')
export class CacheService {
  private cache: ICache = {}

  get<T>(name: string): T | undefined {
    return this.cache[name] as T
  }

  set(name: string, value: unknown) {
    this.cache[name] = value
  }
}