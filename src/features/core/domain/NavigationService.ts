import "reflect-metadata"
import { Bit, Inject } from "bitterer/browser";
import type { INavigation } from "./INavigation";
import { CacheService } from "../infrastructure/CacheService";
import { NavigationApi } from "../infrastructure/NavigationApi";
import { MdApi } from "../infrastructure/MdApi";

@Bit('navigationService')
export class NavigationService {
  constructor(
    @Inject('cacheService') private cacheService: CacheService,
    @Inject('navigationApi') private navigationApi: NavigationApi,
    @Inject('mdApi') private mdApi: MdApi,
  ) {}

  async getNavigations(): Promise<INavigation[]> {
    let navigations = this.cacheService.get<INavigation[]>('navigation')
    if (navigations) return navigations
    navigations = await this.navigationApi.getNavigations() 
    this.cacheService.set('navigation', navigations)
    return navigations
  }

  async getMd(pathname: string): Promise<string> {
    let md = this.cacheService.get<string>(`md:${pathname}`)
    if (md) return md
    md = await this.mdApi.getMd(pathname) 
    this.cacheService.set(`md:${pathname}`, md)
    return md
  }
}