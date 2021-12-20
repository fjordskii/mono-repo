import { TapePlayerContext, TapePlayerEvent } from "types";
import { actions } from "xstate";

export const playingEffect = actions.assign<TapePlayerContext, TapePlayerEvent>(
    ctx => ({
      pos: ctx.pos + 1
    })
  );
  
 export const forwardingEffect = actions.assign<TapePlayerContext, TapePlayerEvent>(
    ctx => ({
      pos: ctx.pos + (10 - ctx.pos % 10)
    })
  );
  
 export const rewindingEffect = actions.assign<TapePlayerContext, TapePlayerEvent>(
    ctx => ({
      pos: ctx.pos - (ctx.pos % 10 || 10)
    })
  );