from PIL import Image
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Загрузка изображения
image_path = 'photo_2023-11-24_11-36-36.jpg' 
image = Image.open(image_path)

text = pytesseract.image_to_string(image, lang='rus')

# Вывод распознанного текста
print(text)
