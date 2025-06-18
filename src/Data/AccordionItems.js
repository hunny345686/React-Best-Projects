export const accordionItems = [
  {
    id: 1,
    title:
      "What is hoisting in JavaScript, and how do let/const differ from var?",
    content: `Hoisting is JavaScript's behavior of moving declarations to the top of the scope before code execution.

- var is hoisted and initialized to undefined.
- let and const are hoisted but not initialized (Temporal Dead Zone).

Example:

console.log(a); // undefined
var a = 5;

console.log(b); // ReferenceError
let b = 10;`,
  },
  {
    id: 2,
    title: "Explain closures with a real-world use case.",
    content: `A closure gives access to an outer function's scope from an inner function, even after the outer function has returned.

Use Case: Data privacy.

function createCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`,
  },
  {
    id: 3,
    title: "What is the JavaScript event loop and call stack?",
    content: `The event loop manages async operations. The call stack handles function calls. Async callbacks wait in the task/microtask queue until the stack is clear.

Example:

console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");
// Output: Start, End, Promise, Timeout`,
  },
  {
    id: 4,
    title: "What is currying in JavaScript and when should you use it?",
    content: `Currying transforms a function with multiple arguments into nested functions taking one argument each.

Use Case: Partial application.

function multiply(a) {
  return function (b) {
    return a * b;
  };
}
const double = multiply(2);
console.log(double(5)); // 10`,
  },
  {
    id: 5,
    title: "What are Pure Components in React and why use them?",
    content: `PureComponent implements shouldComponentUpdate with shallow prop/state comparison to avoid unnecessary renders.

import React, { PureComponent } from 'react';

class MyComponent extends PureComponent {
  render() {
    return <div>{this.props.name}</div>;
  }
}`,
  },
  {
    id: 6,
    title: "Difference between functional and class components in React?",
    content: `Functional components are stateless by default, simpler, and can use hooks. Class components are ES6 classes with lifecycle methods.

Use functional components for simpler and modern codebase.

function Greet() {
  return <h1>Hello</h1>;
}`,
  },
  {
    id: 7,
    title: "How do useEffect dependencies affect re-renders?",
    content: `useEffect(() => {...}, [dep]) re-runs when dep changes. Empty array [] = run once. No deps = run on every render.`,
  },
  {
    id: 8,
    title: "What is memoization and how do useMemo/useCallback help?",
    content: `Memoization caches function results to avoid recalculations.

- useMemo: Caches computed values.
- useCallback: Caches function references.

const memoizedValue = useMemo(() => expensiveFn(a), [a]);
const memoizedFn = useCallback(() => doSomething(b), [b]);`,
  },
  {
    id: 9,
    title: "What is Context API and how is it different from Redux?",
    content: `Context API is built-in and good for low-frequency global state. Redux is more robust, has middleware, devtools, and better suited for complex apps.`,
  },
  {
    id: 10,
    title: "Explain useReducer with example.",
    content: `useReducer is used for complex state logic.

const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch(action.type) {
    case 'increment': return { count: state.count + 1 };
  }
}`,
  },
  {
    id: 11,
    title: "Explain lazy loading in React with Suspense.",
    content: `React.lazy enables component-level code splitting.

const LazyComponent = React.lazy(() => import('./Comp'));

<Suspense fallback={<Loader />}> <LazyComponent /> </Suspense>`,
  },
  {
    id: 12,
    title: "What is debouncing and throttling?",
    content: `Debounce: delay until no further call. Throttle: call at intervals.

function debounce(fn, delay) { ... }
function throttle(fn, delay) { ... }`,
  },
  {
    id: 13,
    title: "Difference between shallow vs deep copy?",
    content: `Shallow copy copies references; deep copy recursively clones all nested objects.

Use lodash's cloneDeep or structuredClone.`,
  },
  {
    id: 14,
    title: "How to handle error boundaries in React?",
    content: `Class component with componentDidCatch + static getDerivedStateFromError.

Use case: Catch rendering errors.

class ErrorBoundary extends React.Component { ... }`,
  },
  {
    id: 15,
    title: "How to optimize performance in large React apps?",
    content: `Use memo, lazy load, avoid inline functions, virtualize lists, use useCallback/useMemo, code splitting.`,
  },
];
