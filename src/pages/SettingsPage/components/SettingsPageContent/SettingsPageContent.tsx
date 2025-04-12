import { JSX } from 'react';
import './SettingsPageContent.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tabs } from '../../../../UI/components/Tabs/Tabs';
import { tabs } from '../../data/tabs';
import { ProfileSettings } from '../ProfileSettings/ProfileSettings';
import { SecuritySettings } from '../SecuritySettings/SecuritySettings';
import { NotificationSettings } from '../NotificationSettings/NotificationSettings';

export const tabComponents: Record<string, JSX.Element> = {
  profile: <ProfileSettings />,
  security: <SecuritySettings />,
  notifications: <NotificationSettings />,
};

export const SettingsPageContent = (): JSX.Element => {
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

  const activeComponent = tab && tabComponents[tab] && tabComponents[tab];

  return (
    <section className="sttings_page container">
      <Tabs tabs={tabs} activeIndex={activeIndex} onChange={handleTabChange} />

      <section className="sttings_page--conent">{activeComponent}</section>
    </section>
  );
};
