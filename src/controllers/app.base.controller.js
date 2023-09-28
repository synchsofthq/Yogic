// import Base Model & prisma client for Tablefrom the directory
const base_model = require("../models/base.model");
// Initialize the Fields for datatable
const Table = new base_model.DataInteraction();

const retrieve = async (prisma, model, prisma_payload = {}) => {
  Table.initialize(prisma, model);
  return Table.findMany(prisma_payload);
};
const findUnique = async (
  prisma,
  model,
  prisma_payload = {},
  projection = null
) => {
  Table.initialize(prisma, model);
  return Table.findUnique(prisma_payload, projection);
};

const create = async (prisma, model, prisma_payload = {}) => {
  Table.initialize(prisma, model);
  return Table.create(prisma_payload);
};

const upsert = async (prisma, model, prisma_payload = {}) => {
  Table.initialize(prisma, model);
  return Table.upsert(
    prisma_payload.where,
    prisma_payload.update,
    prisma_payload.create
  );
};
const update = async (prisma, model, prisma_payload = {}) => {
  Table.initialize(prisma, model);
  return Table.update(prisma_payload.where, prisma_payload.update);
};
const updateMany = async (prisma, model, prisma_payload = {}) => {
  Table.initialize(prisma, model);
  return Table.updateMany(prisma_payload.where, prisma_payload.update);
};

const deleteRows = async (prisma, model, prisma_payload = {}) => {
  Table.initialize(prisma, model);
  console.log(prisma_payload)
  return Table.delete(prisma_payload, {});
};



module.exports = {
  retrieve,
  findUnique,
  create,
  upsert,
  update,
  updateMany,
  deleteRows
};
