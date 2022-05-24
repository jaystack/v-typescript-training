import express, { Response } from 'express';

export function resultOk(response: Response, result?: any) {
    response.json({ ok: true, date: Date.now(), result })
}

export function resultFail(response: Response, error: unknown) {
    response.status(400).json({
        ok: false,
        date: Date.now(),
        message: error instanceof Error ? error.message : 'Unknown error'
    })
}
