import express from 'express';
import {
  getErrorMessageFromError,
  getStatusCodeFromError,
} from '../utils/error-handling';
import prisma from '../client';
import Fuse from 'fuse.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allTodos = await prisma.task.findMany({
      orderBy: {
        completed: 'asc',
      },
    });
    res.send(allTodos);
  } catch (error) {
    res.status(getStatusCodeFromError(error));
    res.send({ message: getErrorMessageFromError(error), error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const todo = await prisma.task.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    res.send(todo);
  } catch (error) {
    res.status(getStatusCodeFromError(error));
    res.send({ message: getErrorMessageFromError(error), error });
  }
});

router.post('/', async (req, res) => {
  try {
    const task = await prisma.task.create({
      data: {
        // don't worry about sanitizing input any further.  Prisma will handle type mismatches and stuff.
        title: req.body.title,
        color: req.body.color,
        completed: req.body.completed,
      },
    });
    res.status(201);
    res.send(task);
  } catch (error) {
    res.status(getStatusCodeFromError(error));
    res.send({ message: getErrorMessageFromError(error), error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const task = await prisma.task.update({
      where: { id: +req.params.id },
      data: {
        title: req.body.title,
        color: req.body.color,
        completed: req.body.completed,
      },
    });
    res.send(task);
  } catch (error) {
    res.status(getStatusCodeFromError(error));
    res.send({ message: getErrorMessageFromError(error), error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await prisma.task.delete({
      where: { id: +req.params.id },
    });
    res.send(task);
  } catch (error) {
    res.status(getStatusCodeFromError(error));
    res.send({ message: getErrorMessageFromError(error), error });
  }
});

router.get('/search/:term', async (req, res) => {
  try {
    const allTodos = await prisma.task.findMany({});
    const fuse = new Fuse(allTodos, { includeScore: true, keys: ['title'] });

    res.send(fuse.search(req.params.term));
  } catch (error) {
    res.status(getStatusCodeFromError(error));
    res.send({ message: getErrorMessageFromError(error), error });
  }
});

export default router;
