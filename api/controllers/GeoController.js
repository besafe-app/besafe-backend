/**
 * GeoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await  CovidMap.find();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getByCity: async (req, res) => {
    try {
      const { city } = req.params;
      const covidData = await CovidMap.findOne({ city: city });
      if (covidData) {
        return res.status(200).json(covidData);
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
