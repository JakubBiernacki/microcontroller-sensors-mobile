import React, {createContext} from 'react';
import {IPreviousConnection} from './Connection';

export interface ISetValueContext {
  setIpAddress: React.Dispatch<React.SetStateAction<string>>;
  setPort: React.Dispatch<React.SetStateAction<string>>;
  setPreviousConnections: React.Dispatch<
    React.SetStateAction<IPreviousConnection[]>
  >;
}

export const SetValueContext = createContext<ISetValueContext>({
  setIpAddress(_: ((prevState: string) => string) | string): void {},
  setPort(_: ((prevState: string) => string) | string): void {},
  setPreviousConnections(
    _:
      | ((prevState: IPreviousConnection[]) => IPreviousConnection[])
      | IPreviousConnection[],
  ): void {},
});
