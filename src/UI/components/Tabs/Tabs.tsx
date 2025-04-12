import React, { JSX } from 'react';
import './Tabs.scss';

interface Tab {
  label: string;
  content?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeIndex: number;
  onChange?: (index: number) => void;
}

export const Tabs = ({
  tabs,
  activeIndex,
  onChange,
}: TabsProps): JSX.Element => {
  const content = tabs[activeIndex].content;

  const changeTabHandler = (index: number) => {
    if (onChange) {
      onChange(index);
    }
  };
  return (
    <section className="tabs">
      <ul className="tabs--header">
        {tabs.map((tab, index) => {
          const isActive = activeIndex === index;
          return (
            <li
              key={index}
              className={`tabs--tab ${isActive ? 'active' : ''}`}
              onClick={() => changeTabHandler(index)}
              data-text={tab.label}
            >
              {tab.label}
            </li>
          );
        })}
      </ul>
      {content && <div className="tabs--content">{content}</div>}
    </section>
  );
};
