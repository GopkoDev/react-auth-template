import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface PortalProps {
  children: React.ReactNode;
  containerId: string;
}

export const Portal: React.FC<PortalProps> = ({ children, containerId }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById(containerId);
    if (!element) {
      element = document.createElement('div');
      element.id = containerId;
      document.body.appendChild(element);
    }
    setContainer(element);

    return () => {
      if (element?.parentNode && element.childNodes.length === 0) {
        element.parentNode.removeChild(element);
      }
    };
  }, [containerId]);

  return container ? createPortal(children, container) : null;
};
