import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import { createStorageProvider } from '../storage';

const router = Router();
const storage = createStorageProvider();

const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const MAX_SIZE = parseInt(process.env.MAX_FILE_SIZE || '5242880', 10);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIMES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}. Allowed: ${ALLOWED_MIMES.join(', ')}`));
    }
  },
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({ error: `File too large. Maximum size is ${Math.round(MAX_SIZE / 1024 / 1024 * 10) / 10}MB` });
        }
        return res.status(400).json({ error: err.message });
      }
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const filePath = (process.env.STORAGE_PROVIDER || 'local') === 's3'
      ? `${Date.now()}-${req.file.originalname}`
      : '';

    storage.upload(filePath, req.file)
      .then((result) => {
        const returnedUrl = result.url || '';
        const absoluteUrl = returnedUrl.startsWith('http')
          ? returnedUrl
          : `${req.protocol}://${req.get('host')}${returnedUrl}`;

        res.json({ ...result, url: absoluteUrl });
      })
      .catch(next);
  });
});

export default router;
