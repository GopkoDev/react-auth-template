import './Loader.scss';
import { Portal } from '../../Portals/Portal';
import { useScrollLock } from '../../../hooks/useScrollLock';

interface LoaderProps {
  isOpen: boolean;
}

export const Loader = ({ isOpen = false }: LoaderProps): JSX.Element | null => {
  useScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <Portal containerId="loader-portal">
      <div className="loader">
        <div className="loader--overlay" />
        <div className="loader--spinner">
          <div className="loader--spinner_inner" />
        </div>
      </div>
    </Portal>
  );
};
