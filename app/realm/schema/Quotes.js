class Quotes {}
Quotes.schema = {
  name: 'Quote',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    content: 'string',
    image: 'string',
    description: 'string',
    create_date: {type: 'date', default: new Date()},
  },
};

export default Quotes;
