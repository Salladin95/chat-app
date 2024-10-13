import path from 'path';
import multer from 'multer';
import express from 'express';

// Настраиваем директорию для сохранения аватаров
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/avatars/'); // Директория для загрузки
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Уникальное имя файла
  },
});

// Фильтр для проверки типа файла (например, изображения)
const fileFilter = (_req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

// Настройка multer с размером файла и фильтрацией
export const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Ограничение на размер файла до 5MB
  fileFilter,
});
