import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsSlug(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isSlug',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
          return typeof value === 'string' && slugRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid slug (lowercase letters, numbers, and hyphens only)`;
        },
      },
    });
  };
}

export function IsHexColor(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isHexColor',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
          return typeof value === 'string' && hexColorRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid hex color code`;
        },
      },
    });
  };
}

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          return value.length >= 8 && 
                 /[A-Z]/.test(value) && 
                 /[a-z]/.test(value) && 
                 /[0-9]/.test(value) && 
                 /[^A-Za-z0-9]/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be at least 8 characters long and contain uppercase, lowercase, number, and special character`;
        },
      },
    });
  };
}
