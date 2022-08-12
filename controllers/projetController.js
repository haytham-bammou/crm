const { Projet, Image, Phase,Showroom } = require("../models");
const asyncHandler = require("express-async-handler");
const { findProjetByID } = require("../repository/projetRepository");
const { findOrganismeByID } = require("../repository/organismeRepository");
const showroom = require("../models/showroom");

const addProjet = asyncHandler(async (req, res) => {
  const { nom, site, description, organismeId, images } = req.body;
  if (!nom || !site || !description) {
    res.status(400);
    throw new Error("please fill required fields");
  }
  const projetExist = await Projet.findOne({ where: { nom } });
  if (projetExist) {
    res.status(400);
    throw new Error("projet already exists");
  }
  const organisme = await findOrganismeByID(organismeId);
  if (!organisme) {
    res.status(404);
    throw new Error("organisme not found");
  }
  const projetCreated = await Projet.create({ ...req.body });
  let image;
  images.forEach(async (image) => {
    image = await Image.create({ url: image.url });
    projetCreated.addImage(image);
  });
  await organisme.addProjet(projetCreated);
  res.json({
    id: projetCreated.id,
    nom: projetCreated.nom,
    description: projetCreated.description,
    site: projetCreated.site,
    OrganismeId: projetCreated.OrganismeId,
    Images: images,
  });
});

const getAllProjets = asyncHandler(async (req, res) => {
  const projets = await Projet.findAll({ include: [Image, Phase] });
  res.json(projets);
});

const getProjetById = asyncHandler(async (req, res) => {
  const projet = await findProjetByID(req.params.id);
  if (!projet) {
    res.status(404);
    throw new Error("Projet not found");
  }
  res.json(projet);
});

const updateProjet = asyncHandler(async (req, res) => {
  const projet = await findProjetByID(req.params.id);
  if (!projet) {
    res.status(404);
    throw new Error("Projet not found");
  }
  let img;
  req.body.images.forEach(async (image) => {
    img = await Image.create({ url: image.url });
    await projet.addImage(img);
  });
  await projet.update({ ...req.body });
  res.json({
    id: projet.id,
    nom: projet.nom,
    description: projet.description,
    site: projet.site,
    OrganismeId: projet.OrganismeId,
    Images: req.body.images.concat(projet.Images),
  });
});
const removeProjects = asyncHandler(async (req, res) => {
  const { projetIds } = req.body;

  projetIds.forEach(async (id) => {
    const projet = await findProjetByID(id);
    if (!projet) {
      res.status(404);
      throw new Error("Projet not found");
    }
    projet.Images.forEach(async (image) => await image.destroy());
    await projet.destroy();
  });
});
const deleteProjet = asyncHandler(async (req, res) => {
  const projet = await findProjetByID(req.params.id);
  if (!projet) {
    res.status(404);
    throw new Error("Projet not found");
  }
  projet.Images.forEach(async (image) => await image.destroy());
  await projet.destroy();
  res.json({ message: "projet deleted" });
});
const getProjetShowrooms = asyncHandler(async (req, res) => {
    const id = req.params.id
    const projet = await Projet.findOne({where : {id} , include : Showroom})
    if(!projet) {
        res.status(404)
        res.json({message : "Projet not found"})
    }
    res.json(projet.Showrooms)
})
const getProjetPhases = asyncHandler(async (req, res) => {
    const id = req.params.id
    const projet = await Projet.findOne({where : {id} , include : Phase})
    if(!projet) {
        res.status(404)
        res.json({message : "Projet not found"})
    }
    res.json(projet.Phases)
})
module.exports = {
    getProjetShowrooms,
    getProjetPhases,
  addProjet,
  getAllProjets,
  getProjetById,
  removeProjects,
  updateProjet,
  deleteProjet,
};
