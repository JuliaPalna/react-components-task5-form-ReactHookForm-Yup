import { object, string, ref } from 'yup';
import { VALIDATION_PATTERNS } from '../variables/variables';
import { getValidateError } from '../utils/utils';

export const formSchema = object().shape({
    email: string()
        .email()
        .required()
        .matches(VALIDATION_PATTERNS.EMAIL, `${getValidateError('EMAIL')}`)
        .min(3, `${getValidateError('LENGTH', { min: 3, max: 20 })}`)
        .max(20, `${getValidateError('LENGTH', { min: 3, max: 20 })}`),

    password: string()
        .required()
        .matches(
            VALIDATION_PATTERNS.PASSWORD,
            `${getValidateError('PASSWORD')}`,
        )
        .min(3, `${getValidateError('LENGTH', { min: 3, max: 6 })}`)
        .max(6, `${getValidateError('LENGTH', { min: 3, max: 6 })}`),

    repeatPassword: string()
        .required()
        .oneOf([ref('password')], `${getValidateError('REPEAT_PASSWORD')}`),
});
