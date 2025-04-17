import Joi, { ObjectSchema } from 'joi';

export const validateSchema = async (
  inputs: any,
  schema: ObjectSchema
): Promise<false | string> => {
  try {
    
    const { error } = schema.validate(inputs);
    
    if (error) {
      const message = error.details.map(d => d.message.replace(/['"]+/g, '')).join(', ');
      console.log("mes",message);
      
      throw message;
    }
    return false ; // No error
  } catch (err) {
    
    throw err;
  }
};
