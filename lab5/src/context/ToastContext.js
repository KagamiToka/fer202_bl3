import React, { createContext, useMemo, useReducer } from "react";

let nextId = 1;

function toastReducer(state, action) {
  switch (action.type) {
    case "PUSH":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((t) => t.id !== action.payload);
    default:
      return state;
  }
}

export const ToastContext = createContext({
  pushToast: () => {},
});

export const ToastProvider = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const pushToast = (message, type = "info", timeoutMs = 3000) => {
    const id = nextId++;
    dispatch({ type: "PUSH", payload: { id, message, type } });
    setTimeout(() => dispatch({ type: "REMOVE", payload: id }), timeoutMs);
  };

  const value = useMemo(() => ({ pushToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-container position-fixed top-0 end-0 p-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast alert alert-${t.type} alert-dismissible fade show`}
            role="alert"
          >
            {t.message}
            <button
              type="button"
              className="btn-close"
              onClick={() => dispatch({ type: "REMOVE", payload: t.id })}
            ></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};