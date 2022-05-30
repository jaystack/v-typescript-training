import { NextFunction, Request, Response } from "express";

export const errorHandler =(err: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({
        ok: false,
        date: Date.now(),
        error: err
    })
  };
