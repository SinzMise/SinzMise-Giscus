import {
  useState,
  useEffect,
  useCallback,
  useRef,
  MouseEvent as ReactMouseEvent,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from 'react';

export function useComponentVisible<T extends HTMLElement>(initialIsVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return [ref, isComponentVisible, setIsComponentVisible] as [
    MutableRefObject<T>,
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ];
}

export function useToggleEmail() {
  return useCallback((event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = event.target as Element;
    const toggle = element.closest<HTMLAnchorElement>('.email-hidden-toggle a');
    if (toggle && event.currentTarget.contains(toggle)) {
      event.preventDefault();
      const container = element.closest('div');
      const content = container.querySelector('.email-hidden-reply');
      content.classList.toggle('expanded');
    }
  }, []);
}
