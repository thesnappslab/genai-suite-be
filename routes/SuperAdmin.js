const router = require('express').Router();

const { addTenant, getTenants, getTenant, editTenant } = require('../services/SuperAdminService');

router.post(`/add-tenant`, async (req, res) => {
    await addTenant(req.body, res);
});
router.get(`/get-tenants`, async (req, res) => {
    await getTenants(req, res);
});
router.get(`/get-tenant/:id`, async (req, res) => {
    await getTenant(req.params.id, res);
});
router.put(`/edit-tenant/:id`, async (req, res) => {
    await editTenant(req.params.id, req.body, res);
});
router.delete(`/delete-tenant/:id`, async (req, res) => {
    await deleteTenant(req.params.id, req.body, res);
});

module.exports = router;