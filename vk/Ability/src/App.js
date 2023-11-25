import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, Tabbar, TabbarItem } from '@vkontakte/vkui';
import Icon28HomeOutline from '@vkontakte/icons/dist/28/home_outline';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Courses from './panels/Courses';
import VideoPage from './panels/Video';
import Glos from './panels/Glos';

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  const go = e => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  const goHome = () => {
    setActivePanel('home');
  };

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home id='home' fetchedUser={fetchedUser} go={go} />
                <Courses id='courses' go={go} />
                <VideoPage id='lectures' go={go} />
				<Glos id='glossary' go={go} />

              </View>
              <Tabbar>
                <TabbarItem
                  onClick={goHome}
                  selected={activePanel === 'home'}
                  text="Главная"
                >
                  <Icon28HomeOutline />
                </TabbarItem>
              </Tabbar>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;
