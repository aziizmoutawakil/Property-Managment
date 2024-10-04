const { Tenant } = require('../models');



exports.ViewTenant = async (req,res) => {
  try {
    const tenant  = await Tenant.findByPk(req.params.id)
    if (!tenant) {
      res.status(404).json('Tenant Not Found')
    }
    res.status(200).json(tenant)
  } catch (error) {
    res.status(500).json({ error: error.message });

  }
}
exports.ViewTenants = async(req,res) =>{
  try {
    const Tenants = await Tenant.findAll()
  res.status(200).json(Tenants)
  } catch (error) {
    console.log("error viewing", error);
        
    res.status(500).json({ error : error.message });
  }
}

exports.addTenant = async (req, res) => {
  const { name, contact, section, propertyId } = req.body;

  try {
    const newTenant = await Tenant.create({
      name,
      contact,
      section,
      propertyId
    });
    res.status(201).json(newTenant);
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ error: error.message }); 
  }
};


exports.deleteTenant = async (req, res) => {
  try {
    const removed = await Tenant.destroy({
      where: { id: req.params.id },
    });
    if (removed) {
      res.status(204).send("Tenant Deleted");
    } else {
      res.status(404).json({ error: 'Tenant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTenant = async (req, res) => {
  try {
    const [updated] = await Tenant.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedTenant = await Tenant.findByPk(req.params.id);
      res.status(200).json(updatedTenant);
    } else {
      res.status(404).json({ error: 'Tenant not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
