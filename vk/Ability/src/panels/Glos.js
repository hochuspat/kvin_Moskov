import React from 'react';
import { Panel, PanelHeader, Gallery, Div, Card, CardGrid, CardScroll, ContentCard } from '@vkontakte/vkui';

const GlossaryPage = () => {
  // Данные глоссария
  const glossaryTerms = [
    { term: 'Термин 1', description: 'Описание термина 1' },
    { term: 'Термин 2', description: 'Описание термина 2' },
    // ... Другие термины
  ];

  return (
    <Panel>
      <PanelHeader>Глоссарий</PanelHeader>
      <Div>
        <Gallery
          slideWidth="90%"
          align="center"
          style={{ height: 150 }}
        >
          {glossaryTerms.map((item, index) => (
            <div key={index} style={{ padding: '0 10px' }}>
              <Card size="l" mode="outline">
                <div style={{ padding: '20px' }}>
                  <strong>{item.term}</strong>
                  <p>{item.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </Gallery>
      </Div>
    </Panel>
  );
};

export default GlossaryPage;
