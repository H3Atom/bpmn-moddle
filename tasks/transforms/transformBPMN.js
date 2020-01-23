const fs = require('fs');

const {
  groupBy,
  matchPattern
} = require('min-dash');

const {
  findChildren,
  findProperty,
  findType,
  fixSequence,
  parseXML,
  removeWhitespace
} = require('./helper');

module.exports = async function(results) {
  const { elementsByType } = results;

  let model = elementsByType[ 'cmof:Package' ][ 0 ];

  model.xml = {
    tagAlias: 'lowerCase',
    typePrefix: 't'
  };

  // remove associations
  model.associations = [];

  findProperty('BaseElement#id', model).isId = true;

  // fix extension elements
  Object.assign(findProperty('ExtensionAttributeValue#value', model), {
    name: 'values',
    isMany: true
  });

  const extensionValues = findProperty('BaseElement#extensionValues', model);

  extensionValues.name = 'extensionElements';

  delete extensionValues.isMany;

  // TODO(philippfromme)
  // rename `extensionAttributeValue` to `extensionElements`
  // rename `extensionValues` to `extensionElements`
  // rename `ExtensionAttributeValue` to `ExtensionElements`

  // fix bpmn:Extension definition
  Object.assign(findProperty('Extension#definition', model), {
    isAttr: true,
    isReference: true
  });

  // TODO(philippfromme) add helper function for reordering properties
  builder.alter('BaseElement', function(desc) {
    builder.reorderProperties(desc, [ 'id', 'documentation' ]);
  });

  debugger

  return model;
};
