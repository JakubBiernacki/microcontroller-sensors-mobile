export interface IDevice {
  pin: number
  type: string
  online: boolean
  data: Record<string, any>
}
