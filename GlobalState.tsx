import React, {createContext, useState} from 'react';
import {MicrocontrollerConnection} from './microcontroller/connection/microcontroller-connection';

export interface IGlobalState {
  microcontrollerConnection?: MicrocontrollerConnection;
  setMicrocontrollerConnection?: React.Dispatch<
    React.SetStateAction<MicrocontrollerConnection | undefined>
  >;
}

export const GlobalState = createContext<IGlobalState>({
  microcontrollerConnection: undefined,
  setMicrocontrollerConnection: undefined,
});

export const GlobalStateProvider = ({children}: {children?: JSX.Element}) => {
  const [microcontrollerConnection, setMicrocontrollerConnection] = useState<
    MicrocontrollerConnection | undefined
  >(undefined);

  const state: IGlobalState = {
    microcontrollerConnection,
    setMicrocontrollerConnection,
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
