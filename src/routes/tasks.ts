import { PrismaClient } from '@prisma/client'
import express from 'express'
import { getErrorMessageFromError, getStatusCodeFromError } from '../utils/error-handling'

const router = express.Router()

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    try {
        const allTodos = await prisma.task.findMany()
        res.send(allTodos)
    } catch (error) {
        res.status(getStatusCodeFromError(error))
        res.send({ message: getErrorMessageFromError(error), error })
    }
})

router.post('/', async (req, res) => {
    try {
        const task = await prisma.task.create({
            data: {
                // don't worry about sanitizing input any further.  Prisma will handle type mismatches and stuff.
                title: req.body.title,
                color: req.body.color,
                completed: req.body.completed,
            }
        })
        res.status(201)
        res.send(task)
    } catch (error) {
        res.status(getStatusCodeFromError(error))
        res.send({ message: getErrorMessageFromError(error), error })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const task = await prisma.task.update({
            where: { id: +req.params.id },
            data: {
                title: req.body.title,
                color: req.body.color,
                completed: req.body.completed
            }
        })
        res.status(200)
        res.send(task)
    } catch (error) {
        res.status(getStatusCodeFromError(error))
        res.send({ message: getErrorMessageFromError(error), error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const task = await prisma.task.delete({
            where: { id: +req.params.id }
        })
        res.status(200)
        res.send(task)
    } catch (error) {
        res.status(getStatusCodeFromError(error))
        res.send({ message: getErrorMessageFromError(error), error })
    }
})

export default router