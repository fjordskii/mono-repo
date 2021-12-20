import { TapePlayerContext, TapePlayerEvent, TapePlayerStateSchema } from "../types";
import { MachineConfig } from 'xstate'
import { playingEffect, forwardingEffect, rewindingEffect } from "./effects";

function machineBuilder(): [
    MachineConfig<TapePlayerContext, TapePlayerStateSchema, TapePlayerEvent>,
    any
  ] {
    return [
      {
        id: "tape player",
        initial: "stopped",
        context: {
          pos: 0
        },
        states: {
          rewinding: {
            onEntry: ["rewindingEffect"],
            after: {
              500: [
                {
                  target: "rewinding",
                  cond: ctx => ctx.pos > 0
                },
                {
                  target: "stopped"
                }
              ]
            },
            on: { STOP: "stopped" }
          },
          stopped: {
            on: {
              PLAY: { target: "playing" },
              FORWARD: "forwarding",
              REWIND: "rewinding"
            }
          },
          playing: {
            onEntry: ["playingEffect"],
            after: {
              500: [
                {
                  target: "playing",
                  cond: ctx => ctx.pos < 100
                },
                {
                  target: "stopped"
                }
              ]
            },
            on: {
              FORWARD: "forwarding",
              STOP: "stopped"
            }
          },
          forwarding: {
            onEntry: ["forwardingEffect"],
            after: {
              500: [
                {
                  target: "forwarding",
                  cond: ctx => ctx.pos < 100
                },
                { target: "stopped" }
              ]
            },
            on: { PLAY: "playing", STOP: "stopped" }
          }
        }
      },
      {
        actions: {
          playingEffect,
          forwardingEffect,
          rewindingEffect
        }
      }
    ];
  }