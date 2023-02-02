import { Router } from 'express';
import { getAllMessages, createMessage, getMessage, getMessageByThreadId,
    updateMessage, deleteMessage,getMessagesByUserId } from '../controllers/messageController';

const router = Router();

router.get('/', getAllMessages);

router.post('/', createMessage);

router.get('/:messageId', getMessage);
router.get('/threadMessages/:threadId', getMessageByThreadId)
router.get('/user/:userId', getMessagesByUserId)
router.put('/:messageId', updateMessage);

router.delete('/:messageId', deleteMessage);

export default router;