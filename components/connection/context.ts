import React, {createContext} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {IConnectionOption} from '../../types/connection-option.interface';

export interface ISetFormValueContext {
  setIpAddress: React.Dispatch<React.SetStateAction<string>>;
  setPort: React.Dispatch<React.SetStateAction<string>>;
  setPreviousConnections: React.Dispatch<
    React.SetStateAction<IConnectionOption[]>
  >;
}

export const SetFormValueContext = createContext<ISetFormValueContext>({
  setIpAddress(_: ((prevState: string) => string) | string): void {},
  setPort(_: ((prevState: string) => string) | string): void {},
  setPreviousConnections(
    _:
      | ((prevState: IConnectionOption[]) => IConnectionOption[])
      | IConnectionOption[],
  ): void {},
});

export const NavigationContext =
  createContext<NativeStackNavigationProp<any> | null>(null);
