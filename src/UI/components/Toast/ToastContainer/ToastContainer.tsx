import { Portal } from '../../../Portals/Portal';
import { ToastItem } from '../ToastItem/ToastItem';
import { useToast } from '../ToastProvider';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <Portal containerId="toast-root">
      <div className="toast-container">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onRemove={removeToast}
          />
        ))}
      </div>
    </Portal>
  );
};
