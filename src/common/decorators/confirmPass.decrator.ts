import {registerDecorator,ValidationArguments,ValidationOptions,ValidatorConstraint,ValidatorConstraintInterface} from 'class-validator';

@ValidatorConstraint({ async: false })
export class MatchBetweenFields implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments): boolean {
    const constraints = args.constraints as unknown[];
    const [matchField] = constraints;
    if (typeof matchField !== 'string') {
      return false;
    }
    const obj = args.object as Record<string, unknown>;
    return value === obj[matchField];
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `faile to match src field ${validationArguments?.property} with ${validationArguments?.constraints[0]}`;
  }
}

export function IsMatch(constraints: string[],validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints,
      options: validationOptions,
      validator: MatchBetweenFields,
    });
  };
}
