import { JSX } from 'react';
import './UserSettingsPageContent.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tabs } from '../../../UI/components/Tabs/Tabs';
import { tabs } from '../data/tabs';

export const UserSettingsPageContent = (): JSX.Element => {
  const { tab } = useParams<{ tab: string }>();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const index = tabs.findIndex((tabObj) => tabObj.path === tab);
    if (index === -1) {
      navigate('/settings/profile');
      return;
    }

    setActiveIndex(index);
  }, [tab]);

  const handleTabChange = (index: number) => {
    setActiveIndex(index);
    navigate(`/settings/${tabs[index].path}`);
  };

  return (
    <section className="sttings_page container">
      <Tabs tabs={tabs} activeIndex={activeIndex} onChange={handleTabChange} />
    </section>
  );
};
