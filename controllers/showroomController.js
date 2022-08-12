const { Showroom } = require("../models");
const asyncHandler = require("express-async-handler");
const { findShowroomByID } = require("../repository/showroomRepository");
const { findProjetByID } = require("../repository/projetRepository");
const { findUserById } = require("../repository/userRepositiry");
const addShowroom = asyncHandler(async (req, res) => {
  const { adresse, telephone, projetId, vendeur } = req.body;
  if (!adresse) {
    res.status(400);
    throw new Error("please fill required fields");
  }
  const showroomExist = await Showroom.findOne({ where: { adresse } });
  if (showroomExist) {
    res.status(400);
    throw new Error("showroom already exists");
  }
  const projet = await findProjetByID(projetId);
  if (!projet) {
    res.status(404);
    throw new Error("projet not found");
  }
  const user = await findUserById(vendeur);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const showroomCreated = await Showroom.create({ ...req.body });
  await projet.addShowroom(showroomCreated);
  await user.addShowroom(showroomCreated);
  res.json(showroomCreated);
});

const getAllShowrooms = asyncHandler(async (req, res) => {
  const showrooms = await Showroom.findAll();
  res.json(showrooms);
});

const getShowroomById = asyncHandler(async (req, res) => {
  const showroom = await findShowroomByID(req.params.id);
  if (!showroom) {
    res.status(404);
    throw new Error("Showroom not found");
  }
  const user = await findUserById(showroom.UserId);
  res.json({
    id:showroom.id,
    telephone:showroom.telephone,
    adresse:showroom.adresse,
    ProjetId:showroom.ProjetId,
    vendeur:user,
  })
});

const updateShowroom = asyncHandler(async (req, res) => {
  const showroom = await findShowroomByID(req.params.id);
  if (!showroom) {
    res.status(404);
    throw new Error("Showroom not found");
  }
  await showroom.update({ ...req.body });
  res.json(showroom);
});

const deleteShowroom = asyncHandler(async (req, res) => {
  const showroom = await findShowroomByID(req.params.id);
  if (!showroom) {
    res.status(404);
    throw new Error("Showroom not found");
  }
  await showroom.destroy();
  res.json({ message: "showroom deleted" });
});

module.exports = {
  addShowroom,
  getAllShowrooms,
  getShowroomById,
  updateShowroom,
  deleteShowroom,
};
