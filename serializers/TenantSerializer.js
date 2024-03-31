const TenantSerializer = tenant => {
    return {
        id: tenant._id,
        name: tenant.name,
        theme: tenant.theme,
        domain: tenant.domain,
        subscription: tenant.subscription,
        validity: tenant.validity,
        orgDocument: tenant.orgDocument,
        isActivated: tenant.isActivated,
        noOfUsers: tenant.noOfUsers,
        paymentType: tenant.paymentType,
        paymentMode: tenant.paymentMode,
        serviceEndpoints: tenant.serviceEndpoints,
        createdBy: tenant.createdBy,
        updatedBy: tenant.updatedBy,
        createdAt: tenant.createdAt,
        updatedAt: tenant.updatedAt
    };
};

module.exports = { TenantSerializer }