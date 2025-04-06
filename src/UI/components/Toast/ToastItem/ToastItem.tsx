import { useEffect } from 'react';
import './ToastItem.scss';
import { ToastType } from '../ToastProvider';

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onRemove: (id: string) => void;
  duration?: number;
}

export const ToastItem = ({
  id,
  message,
  type,
  onRemove,
  duration = 3000,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  return (
    <div className={`toast toast--${type}`}>
      <p className="toast--message">{message}</p>
    </div>
  );
};
