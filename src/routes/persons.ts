import { Response, Request } from 'express';
import { resultFail, resultOk } from '../helpers';
import { persons, Person } from '../dbContext';

function createPerson(id: string, firstName: string, lastName: string, country: string): Person {
    //if ([id, firstName, lastName, country].some(input => input === undefined || input == null)) throw Error('')
    if ([id, firstName, lastName, country].some(input => !input)) throw Error('All inputs need a value')
    
    return {
        id,
        firstName,
        lastName,
        country,
    }
}

export const index = async (req: Request, res: Response) => {
    try {
        const items = await persons.allItems();
        resultOk(res, items);
    } catch(error) {
        resultFail(res, error);
    }
}

export const postNew = async (req: Request, res: Response) => {
    try {
        const person = req.body as Person;
        const { id, firstName, lastName, country } = person;

        if (await persons.hasKey(id)) throw new Error('id is not unique');
        await persons.set(id, createPerson(id, firstName, lastName, country))
        resultOk(res);
    } catch(error) {
        resultFail(res, error);
    }
}

export const postUpdate = async (req: Request, res: Response) => {
    try {
        const  { params: { id } } = req;
        if (!await persons.hasKey(id)) throw new Error('id not found');
    
        const person = req.body as Person;
        const { firstName, lastName, country } = person;
        await persons.set(id, createPerson(id, firstName, lastName, country));
        resultOk(res);
    } catch(error) {
        resultFail(res, error);
    }    
}

export const deleteItem = async (req: Request, res: Response) => {
    try {
        const { params: { id } } = req;
        const result = await persons.delete(id);
        resultOk(res, result);
    } catch(error) {
        resultFail(res, error);
    }   
}