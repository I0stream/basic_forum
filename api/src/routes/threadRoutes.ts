import { Router } from 'express';
import {getAllThreads, createThread, getThread, updateThread, deleteThread } from '../controllers/threadController';

const router = Router();


router.get('/', getAllThreads);

router.post('/', createThread);

router.get('/:threadId', getThread)

router.put('/:threadId', updateThread)

router.delete('/:threadId', deleteThread)

export default router;


