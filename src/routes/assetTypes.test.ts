import { Request, Response } from "express";
import { faker } from "@faker-js/faker";

const assetTypesStub = {
  AssetType: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
};
jest.mock("../models/AssetType", () => assetTypesStub);

import {
  createAssetTypes,
  deleteAssetTypes,
  getAssetTypes,
  updateAssetTypes,
} from "./assetTypes";

describe("assetType", () => {
  const req: Partial<Request> = {
    get: jest.fn(),
  };
  const res: Partial<Response> = {
    status: jest.fn(),
    json: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("get all assets", async () => {
    assetTypesStub.AssetType.findAll.mockResolvedValue([]);

    await getAssetTypes(req as Request, res as Response);

    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      ok: true,
      date: expect.any(Number),
      result: [],
    });

    expect(assetTypesStub.AssetType.findAll).toBeCalledTimes(1);
    expect(assetTypesStub.AssetType.findAll).toBeCalledWith();
  });

  it("create asset", async () => {
    assetTypesStub.AssetType.findOne.mockResolvedValue(null);
    const body = {
      id: faker.random.word(),
      label: faker.commerce.product(),
    };

    await createAssetTypes({ ...req, body } as Request, res as Response);

    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      ok: true,
      date: expect.any(Number),
    });

    expect(assetTypesStub.AssetType.create).toBeCalledTimes(1);
    expect(assetTypesStub.AssetType.findOne).toBeCalledTimes(1);
    expect(assetTypesStub.AssetType.create).toBeCalledWith(body);
    expect(assetTypesStub.AssetType.findOne).toBeCalledWith({
      where: { id: body.id },
    });
  });

  it("create asset but exists", async () => {
    const id = faker.random.word();
    assetTypesStub.AssetType.findOne.mockResolvedValue({ id });
    const body = {
      id,
      label: faker.commerce.product(),
    };

    await createAssetTypes({ ...req, body } as Request, res as Response);

    expect(res.status).toBeCalledTimes(1);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      ok: false,
      date: expect.any(Number),
      message: "id is not unique",
    });

    expect(assetTypesStub.AssetType.create).toBeCalledTimes(0);
    expect(assetTypesStub.AssetType.findOne).toBeCalledTimes(1);
    expect(assetTypesStub.AssetType.findOne).toBeCalledWith({
      where: { id: body.id },
    });
  });

  it("update asset", async () => {
    const asset = {
      id: faker.random.word(),
      label: faker.commerce.product(),
    };
    assetTypesStub.AssetType.findOne.mockResolvedValue(asset);
    const params = {
      id: asset.id,
    };
    const body = {
      label: faker.commerce.product(),
    };

    await updateAssetTypes(
      { ...req, body, params } as Request,
      res as Response
    );

    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      ok: true,
      date: expect.any(Number),
    });

    expect(assetTypesStub.AssetType.update).toBeCalledTimes(1);
    expect(assetTypesStub.AssetType.findOne).toBeCalledTimes(1);
    expect(assetTypesStub.AssetType.update).toBeCalledWith(body, {
      where: { id: asset.id },
    });
    expect(assetTypesStub.AssetType.findOne).toBeCalledWith({
      where: { id: asset.id },
    });
  });

  it("delete asset", async () => {
    const id = faker.random.word();
    assetTypesStub.AssetType.destroy.mockResolvedValue(1);
    const params = {
      id,
    };

    await deleteAssetTypes({ ...req, params } as Request, res as Response);

    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      ok: true,
      date: expect.any(Number),
      result: 1,
    });

    expect(assetTypesStub.AssetType.destroy).toBeCalledTimes(1);
    expect(assetTypesStub.AssetType.destroy).toBeCalledWith({
      where: { id },
    });
  });
});
