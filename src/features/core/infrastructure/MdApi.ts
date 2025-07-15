import "reflect-metadata"
import axios from "axios";
import { Bit } from "bitterer/browser";

@Bit('mdApi')
export class MdApi {
  async getMd(pathname: string) {
    const path = pathname.slice(6)
    const { data } = await axios.get<string>(`/md/${path}.md`)
    return data
  }
}