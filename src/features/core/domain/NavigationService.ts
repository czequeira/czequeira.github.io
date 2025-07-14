import "reflect-metadata"
import { Bit, Inject } from "bitterer/browser";
import type { INavigation } from "./INavigation";
import { CacheService } from "../infrastructure/CacheService";
import { NavigationApi } from "../infrastructure/NavigationApi";

@Bit('navigationService')
export class NavigationService {
  constructor(
    @Inject('cacheService') private cacheService: CacheService,
    @Inject('navigationApi') private navigationApi: NavigationApi,
  ) {}

  async getNavigations(): Promise<INavigation[]> {
    let navigations = this.cacheService.get<INavigation[]>('navigation')
    if (navigations) return navigations
    navigations = await this.navigationApi.getNavigations() 
    this.cacheService.set('navigation', navigations)
    return navigations
  }
}