import "reflect-metadata"
import axios from "axios";
import type { INavigation } from "../domain/INavigation";
import { Bit } from "bitterer/browser";

@Bit('navigationApi')
export class NavigationApi {
  async getNavigations() {
    const {data} = await axios.get<INavigation[]>(`/navigation.json`)
    return data
  }
}