const mongoose = require("mongoose");

const schemaInfoSchema = new mongoose.Schema({
  version: Number,
});

const SchemaInfo = mongoose.model("SchemaInfo", schemaInfoSchema);

module.exports = SchemaInfo;


