import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {ModalPageHeader, IOS, platform, Textarea,ModalRoot, ModalPage,SelectMimicry, Panel,List,Cell, PanelHeader, PanelHeaderBack, Group, Header, CardGrid, Card, Caption, Div, Button, SimpleCell, Avatar , IconButton } from '@vkontakte/vkui';
import { Icon24Education, Icon56UsersOutline } from '@vkontakte/icons';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';
import { Icon28Favorite, Icon28FavoriteOutline } from '@vkontakte/icons';
// Обновленные данные курсов с информацией о видео и описании уроков
const courses = [
  {
    id: 'code',
    title: 'Пишем код с нуля',
    description: 'Изучайте основы программирования и создавайте свои собственные приложения',
    image: 'https://cojo.ru/wp-content/uploads/2022/12/belogrudyi-ezh-1-2.webp',
    lessons: [
      {
        title: 'Урок 1',
        completed: false,
        videoUrl: '0ly25OYC45M',
        description: 'Описание урока 1'
      },
      // ... Другие уроки
    ]
  },
  // ... Другие курсы
];

// Компонент страницы урока
const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const course = courses.find(c => c.id === courseId);
  const lesson = course?.lessons[parseInt(lessonId, 10) - 1];
  const [glossaryOpen, setGlossaryOpen] = useState(false); // Состояние для открытия/закрытия глоссария
  const [isLectureModalOpen, setIsLectureModalOpen] = useState(false);
  const [noteText, setNoteText] = useState(''); // Добавлено состояние для текста заметки

  // Функции для открытия и закрытия модального окна лекции остаются прежними

  // Функция для обработки добавления заметки
  const handleAddNote = () => {
    // Здесь можно добавить логику обработки заметок
    console.log('Заметка добавлена:', noteText);
    setNoteText(''); // Очистить поле после добавления заметки
  };
  // Функция для переключения видимости глоссария
  const toggleGlossary = () => {
    setGlossaryOpen(!glossaryOpen);
  };
  if (!lesson) {
    return <div>Урок не найден</div>;
  }

  // Функция для открытия модального окна лекции
  const openLectureModal = () => {
    setIsLectureModalOpen(true);
  };

  // Функция для закрытия модального окна лекции
  const closeLectureModal = () => {
    setIsLectureModalOpen(false);
  };

  // Создание модального окна
  const lectureModal = (
    <ModalRoot activeModal={isLectureModalOpen ? 'lectureModal' : null}>
      <ModalPage
        id='lectureModal'
        onClose={closeLectureModal}
        header={
          <ModalPageHeader
            left={platform() === IOS && <PanelHeaderButton onClick={closeLectureModal}>Закрыть</PanelHeaderButton>}
          >
            Текст лекции
          </ModalPageHeader>
        }
      >
        <div style={{ padding: '12px' }}>
          {/* Здесь можно вставить текст лекции */}
          <div>Текст лекции здесь...</div>
          {/* Поле для заметок */}
          <Textarea 
            placeholder='Ваши заметки' 
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          {/* Кнопка для добавления заметки */}
          <Button size="l" style={{ marginTop: '12px' }} onClick={handleAddNote}>Добавить</Button>
        </div>
      </ModalPage>
    </ModalRoot>
  );

  const [glossaryModalOpen, setGlossaryModalOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);

  const openGlossaryModal = (term) => {
    setSelectedTerm(term);
    setGlossaryModalOpen(true);
  };

  const closeGlossaryModal = () => {
    setGlossaryModalOpen(false);
  };

  const glossaryTerms = [
    { term: 'Термин 1', description: 'Описание термина 1' },
    { term: 'Термин 2', description: 'Описание термина 2' },
    // Добавьте другие термины и описания
  ];

  const [favoriteClicked, setFavoriteClicked] = useState(false); // Состояние для отслеживания нажатия на сердечко

  const handleFavoriteClick = () => {
    console.log(1); // Вывод в консоль при каждом нажатии
    setFavoriteClicked(!favoriteClicked); // Переключение состояния
  };

  const glossaryModal = (
    <ModalRoot activeModal={glossaryModalOpen ? 'glossaryModal' : null}>
      <ModalPage
        id='glossaryModal'
        onClose={closeGlossaryModal}
        header={
          <ModalPageHeader
            left={platform() === IOS && <PanelHeaderButton onClick={closeGlossaryModal}>Закрыть</PanelHeaderButton>}
          >
            {selectedTerm ? selectedTerm.term : ''}
          </ModalPageHeader>
        }
      >
      <div style={{ padding: '12px' }}>
        <div>{selectedTerm ? selectedTerm.description : ''}</div>
        <IconButton onClick={handleFavoriteClick}>
          {favoriteClicked ? <Icon28Favorite fill="#E64646" /> : <Icon28FavoriteOutline />} {/* Изменение иконки в зависимости от состояния */}
        </IconButton>
      </div>
      </ModalPage>
    </ModalRoot>
  );

  const navigate = useNavigate();

  const goToTest = () => {
    navigate(`/${courseId}/lesson/${lessonId}/test`); // Переход на страницу теста
  };

  return (
      <div style={{ textAlign: 'center' }}>
      <h1>{lesson.title}</h1>
      <p>{lesson.description}</p>
      <div style={{ maxWidth: '80%', margin: 'auto' }}>
        <ReactPlayer 
          url={`https://www.youtube.com/watch?v=${lesson.videoUrl}`} 
          controls 
          width='100%' 
          height='100%'
          style={{ borderRadius: '20px' }} 
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button size="l" mode="primary" onClick={openLectureModal}>Открыть лекцию</Button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <SelectMimicry top="Глосарий" onClick={toggleGlossary} placeholder="Выберите термин">
          Глосарий
        </SelectMimicry>
        {glossaryOpen && (
          <List>
            {glossaryTerms.map((term, index) => (
              <Cell key={index} onClick={() => openGlossaryModal(term)}>
                {term.term}
              </Cell>
            ))}
          </List>
        )}
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button size="l" mode="primary" onClick={goToTest}>Пройти тест</Button>
      </div>
      {glossaryModal}
      {lectureModal}
    </div>
  );
};
const TestPage = () => {
  const { courseId, lessonId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      question: "Вопрос 1",
      answers: ["Ответ 1", "Ответ 2", "Ответ 3", "Ответ 4"],
      correctAnswer: 0,
    },
    // ... другие вопросы
  ];

  const handleAnswer = (answerIndex) => {
    // Обработка ответа
    console.log("Выбранный ответ:", answerIndex);
    // Переход к следующему вопросу или завершение теста
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Тест по уроку {lessonId}</h1>
      <div>
        <p>{questions[currentQuestion].question}</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {questions[currentQuestion].answers.map((answer, index) => (
            <Button 
              key={index} 
              onClick={() => handleAnswer(index)}
              size="l"
              style={{ fontSize: '16px', marginBottom: '10px', width: '80%' }}
            >
              {answer}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};



// Компонент страницы курса
const CoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);

  if (!course) {
    return <div>Курс не найден</div>;
  }

  const renderLessonBlocks = (lessons) => {
    return lessons.map((lesson, index) => (
      <Card style={{ marginBottom: '10px', padding: '10px' }} key={index}>
        <SimpleCell
          before={<Avatar size={48} style={{ background: 'var(--background_content)' }}><Icon24Education /></Avatar>}
          after={
            <Button
              mode={lesson.completed ? 'secondary' : 'primary'}
              size="l"
              onClick={() => navigate(`/${id}/lesson/${index + 1}`)}
            >
              {lesson.completed ? 'Повторить' : 'Изучить'}
            </Button>
          }
        >
          {lesson.title}
          <div style={{ fontSize: '12px', color: 'var(--text_secondary)' }}>
            {getLessonType(index)}
          </div>
        </SimpleCell>
      </Card>
    ));
  };

  const getLessonType = (index) => {
    switch (index) {
      case 0:
        return 'Видеолекция';
      case 1:
        return 'Аудио лекция';
      case 2:
        return 'Конспект';
      default:
        return '';
    }
  };

  return (
    <div style={{ color: 'white', textAlign: 'center' }}>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <div style={{
        backgroundImage: `url(${course.image})`,
        height: 140,
        width: '90%',
        borderRadius: 10,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: '20px auto'
      }} />
      <Div>
        {renderLessonBlocks(course.lessons)}
      </Div>
    </div>
  );
};
  
// Компонент списка курсов
const CoursesList = () => (
  <Group header={<Header mode="secondary">Выберите курс</Header>}>
    <CardGrid size="l">
      {courses.map((course) => (
        <Link to={`/${course.id}`} key={course.id} style={{ textDecoration: 'none', margin: '8px' }}>
          <Card mode="shadow" size="l">
            <Div>
              <Div style={{
                backgroundImage: `url(${course.image})`,
                height: 140,
                width: '90%', // Картинка занимает всю ширину карточки
                borderRadius: 10,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
              <Div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                color: 'white', 
                textAlign: 'center',
                marginTop: 8, 
              }}>
                <Caption level="1" weight="medium" style={{ 
                  marginTop: 16, 
                  fontSize: '1.2em', // Увеличенный размер шрифта
                  fontWeight: 'bold' ,// Жирное начертание
                  marginBottom: '16px',
                }}>
                  {course.title}
                </Caption>
                <Caption level="2" weight="regular">
                    {course.description}
                  </Caption>              
                  </Div>
            </Div>
          </Card>
        </Link>
      ))}
    </CardGrid>
  </Group>
);

  
  
  
  
// Основной компонент Курсы с роутингом
const Courses = ({ id, go }) => {
  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => go('home')} />}>
        Курсы
      </PanelHeader>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CoursesList />} />
          <Route path="/:id" element={<CoursePage />} />
          <Route path="/:courseId/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/:courseId/lesson/:lessonId/test" element={<TestPage />} /> {/* Добавлен маршрут для страницы теста */}
        </Routes>
      </BrowserRouter>
    </Panel>
  );
};

  
  export default Courses;