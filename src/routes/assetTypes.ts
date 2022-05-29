/************************************************************* */
/*              ASSETTYPES                                     */
/************************************************************* */

import { Request, Response } from "express";
import { AssetType } from "../models/AssetType";

export const getAssetTypes = async (req: Request, res: Response) => {
  try {
    const items = await AssetType.findAll();
    res.json({
      ok: true,
      date: Date.now(),
      result: items,
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

export const createAssetTypes = async (req: Request, res: Response) => {
  try {
    const at = req.body as AssetType;
    const { id, label } = at;

    if (await AssetType.findOne({ where: { id } }))
      throw new Error("id is not unique");
    await AssetType.create(at); //.set(id, createAssetType(id, label));

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

export const updateAssetTypes = async (req: Request, res: Response) => {
  try {
    const payload: AssetType = req.body;
    const id = req.params.id;
    const { label } = payload;

    if (!(await AssetType.findOne({ where: { id } })))
      throw new Error("id not found");

    await AssetType.update(payload, { where: { id: id } });
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

export const deleteAssetTypes = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;
    //const result = await assetTypes.delete(id);
    const result = await AssetType.destroy({ where: { id } });
    res.json({
      ok: true,
      date: Date.now(),
      result,
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
