import { createMachine, Interpreter } from 'xstate';
// Stateless machine definition
// machine.transition(...) is a pure function used by the interpreter.
const toggleMachine = createMachine({
    id: 'toggle',
    initial: 'inactive',
    states: {
        inactive: { on: { TOGGLE: 'loading' } },
        loading: { on: { TOGGLE: 'inactive' } },
    },
});
// Machine instance with internal state
const toggleService = new Interpreter(toggleMachine)
    .onTransition((state) => console.log(state.value))
    .start();
// => 'inactive'
toggleService.send('TOGGLE');
// => 'loading'
toggleService.send('TOGGLE');
// => 'inactive'
//# sourceMappingURL=machine.js.map