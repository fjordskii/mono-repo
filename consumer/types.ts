export type EventId = "PLAY" | "STOP" | "FORWARD" | "REWIND";

export interface TapePlayerEvent extends EventListenerObject {
  type: EventId;
}

export interface TapePlayerStateSchema {
  states: {
    stopped: {};
    playing: {};
    forwarding: {};
    rewinding: {};
  };
}

export type AvailableStates = keyof TapePlayerStateSchema["states"];

export interface TapePlayerContext {
  pos: number;
}