const { Property,Tenant,RentalPayment } = require('../models');

const addProperty = async (req, res) => {
    const { name, address, type, number_of_units, rental_cost } = req.body;

    // Basic input validation
    if (!name || !address || !type || !number_of_units || !rental_cost) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Ensure number_of_units and rental_cost are valid numbers
    const numberOfUnits = parseInt(number_of_units, 10);
    const rentalCost = parseFloat(rental_cost);

    if (isNaN(numberOfUnits) || isNaN(rentalCost)) {
        return res.status(400).json({ error: 'Invalid number format' });
    }

    try {
        // Create new property
        const newProperty = await Property.create({
            name,
            address,
            type,
            number_of_units: numberOfUnits,
            rental_cost: rentalCost,
        });
        res.status(201).json(newProperty);
    } catch (error) {
        console.error('Error adding property:', error.message);
        res.status(500).json({ error: 'Error adding property' });
    }
};


const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.findAll();
        res.status(200).json(properties);
    } catch (error) {
        console.log("error viewing", error);
        
        res.status(500).json({ error : error.message });
    }
};

const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id);
        if (property) {
            res.status(200).json(property);
        } else {
            res.status(404).json({ error: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProperty = async (req, res) => {
    try {
        const [updated] = await Property.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedProperty = await Property.findByPk(req.params.id);
            res.status(200).json(updatedProperty);
        } else {
            res.status(404).json({ error: 'Property not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const deleteProperty = async (req, res) => {
    try {
        const propertyId = req.params.id;

        await Tenant.destroy({
            where: { propertyId: propertyId },
            include: [{ model: RentalPayment }],
        });

        const deleted = await Property.destroy({
            where: { id: propertyId },
        });

        if (deleted) {
            res.status(204).send()
            console.log("property deleted");
            
        } else {
            res.status(404).json({ error: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    addProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
};
