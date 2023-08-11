import React, {createContext, useState} from 'react';
import {Microcontroller} from './microcontroller/microcontroller';

export interface IGlobalState {
  microcontroller?: Microcontroller;
  setMicrocontroller?: React.Dispatch<
    React.SetStateAction<Microcontroller | undefined>
  >;
}

export const GlobalState = createContext<IGlobalState>({
  microcontroller: undefined,
  setMicrocontroller: undefined,
});

export const GlobalStateProvider = ({children}: {children?: JSX.Element}) => {
  const [microcontroller, setMicrocontroller] = useState<
    Microcontroller | undefined
  >(undefined);

  const state: IGlobalState = {
    microcontroller,
    setMicrocontroller,
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
