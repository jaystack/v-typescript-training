/************************************************************* */
/*              PERSONS                                        */
/************************************************************* */

import { Request, Response } from "express";
import { Person } from "../models/Person";

export const getPersons = async (req: Request, res: Response) => {
  try {
    const items = await Person.findAll();
    res.json({
      ok: true,
      date: Date.now(),
      result: items,
    });
  } catch (error) {
    res.status(400)
    res.json({
      ok: false,
      date: Date.now(),
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const createPersons = async (req: Request, res: Response) => {
  try {
    const person = req.body as Person;
    const { id, firstName, lastName, country } = person;

    if (await Person.findOne({ where: { id } }))
      throw new Error("id is not unique");

    await Person.create(person);
    return res.json({
      ok: true,
      date: Date.now(),
    });
  } catch (error) {
    res.status(400)
    return res.json({
      ok: false,
      date: Date.now(),
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const updatePersons = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;
    if (!(await Person.findOne({ where: { id } })))
      throw new Error("id not found");

    const person = <Person>req.body;
    const { firstName, lastName, country } = person;

    await Person.update(person, { where: { id } });
    res.json({
      ok: true,
      date: Date.now(),
    });
  } catch (error) {
    res.status(400)
    res.json({
      ok: false,
      date: Date.now(),
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const deletePersons = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;
  const result = await Person.destroy({ where: { id } });
  res.json({
    ok: true,
    date: Date.now(),
    result,
  });
};
