
import * as React from "react";
import { 
  TOAST_REMOVE_DELAY, 
  Toast, 
  ToasterToast, 
  State, 
  Action 
} from "./toast/types";
import { reducer } from "./toast/reducer";

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string, dispatch: React.Dispatch<Action>) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });

  // Side effects for dismiss actions
  if (action.type === "DISMISS_TOAST") {
    const { toastId } = action;
    
    if (toastId) {
      addToRemoveQueue(toastId, dispatch);
    } else {
      memoryState.toasts.forEach((toast) => {
        addToRemoveQueue(toast.id, dispatch);
      });
    }
  }
}

function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

// Add convenience methods for different toast types
toast.success = (props: Omit<ToasterToast, "id" | "variant">) => {
  return toast({ ...props, variant: "success" });
};

toast.error = (props: Omit<ToasterToast, "id" | "variant">) => {
  return toast({ ...props, variant: "error" });
};

toast.warning = (props: Omit<ToasterToast, "id" | "variant">) => {
  return toast({ ...props, variant: "warning" });
};

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
