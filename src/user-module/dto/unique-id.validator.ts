import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';
import {UserService} from "../user.service";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueIdConstraint implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    async validate(id: string, args: ValidationArguments) {
        const userId = parseInt(id, 10); 
        const user = await this.userService.getUser(userId);
        return !user; // Return true if user does not exist
    }

    defaultMessage(args: ValidationArguments) {
        return 'ID $value already exists. Choose another ID.';
    }
}

export function IsUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUniqueIdConstraint,
        });
    };
}
