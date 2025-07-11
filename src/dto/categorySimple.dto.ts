export class CategorySimpleDTO {
  id: number
  name: string
  icon: string

  constructor(id: number, name: string, icon: string) {
    this.id = id
    this.name = name
    this.icon = icon
  }
}
