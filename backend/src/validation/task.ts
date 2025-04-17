import Joi from 'joi';
import { validateSchema } from './checkValidator'; // adjust path as needed

interface UpdateTaskRequest {
  body: {
    name?: string;
    due?: Date;
    complete?: boolean;
    description?: string;
  };
}

// ✅ Use the exact name of the interface here
export default async function updateTask(req: UpdateTaskRequest): Promise<false | string> {
  
  const schema = Joi.object({
    name: Joi.string().optional(),
    due: Joi.date().greater('now').optional(),
    complete: Joi.boolean().optional(),
    description: Joi.string().optional()
  });

  return await validateSchema(req.body, schema);
}