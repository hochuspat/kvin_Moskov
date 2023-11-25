import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, Group, Cell, Avatar, Div, Button, Header, Banner } from '@vkontakte/vkui';
// Импортирую иконки из @vkontakte/icons
import { Icon28EducationOutline, Icon28VideoOutline, Icon28BookOutline } from '@vkontakte/icons';


const Home = ({ id, go, fetchedUser }) => (
	
  <Panel id={id}>
    <PanelHeader>Образовательное приложение</PanelHeader>
    {fetchedUser &&
      <Group title="Информация о пользователе">
        <Cell
          before={<Avatar size={72} src={fetchedUser.photo_200} />}
          description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
        >
          Привет, {fetchedUser.first_name}!
        </Cell>
      </Group>}

    <Group header={<Header mode="secondary">Меню</Header>}>
      <Banner
        // Использую иконку Icon28EducationOutline вместо изображения персика
        // Увеличиваю размер иконки до 64 и выравниваю её по центру с помощью стиля
        before={<Icon28EducationOutline style={{ width: 64, height: 64, margin: 'auto' }} />}
        header="Курсы"
        subheader="Изучайте новые темы и развивайте свои навыки"
        asideMode="expand"
        onClick={go}
        data-to="courses"
      />
      <Banner
        // Использую иконку Icon28VideoOutline вместо изображения персика
        // Увеличиваю размер иконки до 64 и выравниваю её по центру с помощью стиля
        before={<Icon28VideoOutline style={{ width: 64, height: 64, margin: 'auto' }} />}
        header="Лекции"
        subheader="Слушайте интересные лекции от экспертов в разных областях"
        asideMode="expand"
        onClick={go}
        data-to="lectures"
      />
      <Banner
        // Использую иконку Icon28BookOutline вместо изображения персика
        // Увеличиваю размер иконки до 64 и выравниваю её по центру с помощью стиля
        before={<Icon28BookOutline style={{ width: 64, height: 64, margin: 'auto' }} />}
        header="Глоссарий"
        subheader="Поискайте определения терминов и понятий, связанных с обучением"
        asideMode="expand"
        onClick={go}
        data-to="glossary"
      />
    </Group>
  </Panel>
);

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

export default Home;
