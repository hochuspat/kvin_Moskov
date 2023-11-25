import nltk
import spacy
import gensim
import pytextrank

# Загружаем файл txt с лекцией
with open("lecture.txt", encoding="utf-8") as f:
    text = f.read()

# Разбиваем текст на предложения
sentences = nltk.sent_tokenize(text)

# Создаем объект spacy для обработки текста
nlp = spacy.load("ru_core_news_sm")

# Добавляем пайплайн pytextrank для извлечения ключевых слов и фраз
nlp.add_pipe("textrank")

# Применяем nlp к тексту
doc = nlp(text)

# Извлекаем ключевые слова и фразы и берем только топ-10
keywords = [p.text for p in doc._.phrases[:10]]

# Создаем словарь gensim из ключевых слов и фраз
dictionary = gensim.corpora.Dictionary([keywords])

# Создаем корпус gensim из предложений
corpus = [dictionary.doc2bow(nltk.word_tokenize(s)) for s in sentences]

# Обучаем модель gensim LDA на корпусе
lda = gensim.models.LdaModel(corpus, num_topics=5, id2word=dictionary)

# Присваиваем каждому предложению тему
topics = [lda.get_document_topics(bow) for bow in corpus]

# Находим наиболее вероятную тему для каждого предложения
max_topics = [max(t, key=lambda x: x[1])[0] for t in topics]

# Группируем предложения по темам, ограничив количество предложений в каждой группе
groups = {}
for i, t in enumerate(max_topics):
    if t not in groups:
        groups[t] = []
    if len(groups[t]) < 5:  # Ограничиваем количество предложений до 5 на группу
        groups[t].append(sentences[i])

# Создаем конспект по лекции с разделением на главы
summary = ""
for t in sorted(groups):
    # Добавляем заголовок главы с ключевыми словами по теме
    summary += f"## Глава {t+1}: {', '.join(keywords[:3])}\n\n"
    # Добавляем предложения по теме
    summary += " ".join(groups[t]) + "\n\n"

# Выводим конспект на экран
print(summary)

# Сохраняем модель LDA
lda.save("lda.model")