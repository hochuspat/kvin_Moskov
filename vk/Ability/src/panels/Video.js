import React from 'react';
import { Panel, PanelHeader, Group, Div, Button } from '@vkontakte/vkui';
import ReactPlayer from 'react-player';

// Данные уроков
const lessons = [
  {
    title: 'Урок 1',
    description: 'Описание урока 1',
    videoUrl: '0ly25OYC45M'
  },
  // ... Другие уроки
];

const LessonsPage = () => {
  // Состояние для текущего индекса урока
  const [currentLessonIndex, setCurrentLessonIndex] = React.useState(0);

  // Функции для навигации по урокам
  const goToNextLesson = () => {
    setCurrentLessonIndex((prevIndex) =>
      prevIndex < lessons.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const goToPreviousLesson = () => {
    setCurrentLessonIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const currentLesson = lessons[currentLessonIndex];

  return (
    <Panel>
      <PanelHeader>Уроки</PanelHeader>
      <Group>
        <Div style={{ textAlign: 'center' }}>
          <h2>{currentLesson.title}</h2>
          <p>{currentLesson.description}</p>
          <div style={{ maxWidth: '80%', margin: 'auto' }}>
            <ReactPlayer 
              url={`https://www.youtube.com/watch?v=${currentLesson.videoUrl}`}
              controls 
              width='100%' 
              height='100%'
              style={{ borderRadius: '20px' }}
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <Button size="l" style={{ marginBottom: '10px' }} onClick={goToPreviousLesson}>Предыдущий урок</Button>
            <Button size="l" onClick={goToNextLesson}>Следующий урок</Button>
          </div>
        </Div>
      </Group>
    </Panel>
  );
};

export default LessonsPage;
