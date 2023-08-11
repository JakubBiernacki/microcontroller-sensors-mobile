export interface IMicrocontrollerDevice {
  pin: number;
  type: string;
  online: boolean;
  data: Record<string, any>;
}
