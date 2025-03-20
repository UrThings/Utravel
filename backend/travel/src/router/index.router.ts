import { Router } from 'express';
import travelRouter from './travel.routes'
import userRouter from './user.routes'
import bookRouter from './book.routes'
import cardRouter from './card.routes'
const router = Router();  


router.use('/travel', travelRouter);
router.use('/user', userRouter);
router.use('/book', bookRouter);
router.use('/card', cardRouter);

export default router;
