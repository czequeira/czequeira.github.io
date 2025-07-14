export interface INavigation {
  title?: string
  items?: INavigation[]
  to: string
  redirect?: string
}