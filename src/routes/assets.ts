/************************************************************* */
/*              ASSETS                                        */
/************************************************************* */

import { Request, Response } from "express";
import { Asset } from "../models/Asset";

export const getAssets = async (req: Request, res: Response) => {
  try {
    const items = await Asset.findAll();
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

export const getAssetById = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;
    const items = await Asset.scope("full").findOne({ where: { id } });
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

export const createAssets = async (req: Request, res: Response) => {
  try {
    const assets = req.body as Asset;
    const { id } = assets;

    //if (await Assets.findOne({where:{id}})) throw new Error('id is not unique');

    await Asset.create(assets);
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

export const updateAssets = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;
    if (!(await Asset.findOne({ where: { id } })))
      throw new Error("id not found");

    const asset = <Asset>req.body;

    await Asset.update(asset, { where: { id } });
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

export const deleteAssets = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;
  const result = await Asset.destroy({ where: { id } });
  res.json({
    ok: true,
    date: Date.now(),
    result,
  });
};
