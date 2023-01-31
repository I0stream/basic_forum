"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const threadController_1 = require("../controllers/threadController");
const router = (0, express_1.Router)();
router.get('/', threadController_1.getAllThreads);
router.post('/', threadController_1.createThread);
router.get('/:threadId', threadController_1.getThread);
router.put('/:threadId', threadController_1.updateThread);
router.delete('/:threadId', threadController_1.deleteThread);
exports.default = router;