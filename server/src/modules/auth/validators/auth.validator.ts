import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';


export function validateDto(dtoClass: any) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const dtoObject = plainToClass(dtoClass, req.body);

      const errors = await validate(dtoObject, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        const formattedErrors = errors.map(error => {
          const constraints = error.constraints
            ? Object.values(error.constraints)
            : ['Invalid value'];
          return {
            property: error.property,
            message: constraints[0],
          };
        });

        res.status(400).json({
          message: 'Validation failed',
          errors: formattedErrors,
        });
        return;
      }

      req.body = dtoObject;
      next();
    } catch (error) {
      res.status(500).json({
        message: 'Validation error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
}
