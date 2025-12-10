import { useRef, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialDataForm } from '../variables/variables';
import { submitForm } from '../utils/submitForm';
import { formSchema } from '../schema/formSchema';
import styles from '../styles/form.module.css';

export const Form = () => {
    const {
        register,
        formState: { errors, isValid, isDirty },
        trigger,
    } = useForm({
        defaultValues: initialDataForm,
        resolver: yupResolver(formSchema),
        mode: 'onChange',
    });

    const [formState, formAction, isPending] = useActionState(
        submitForm,
        initialDataForm,
    );

    const submitButtonRef = useRef(null);

    const errorsMessage = {
        email: errors.email?.message,
        password: errors.password?.message,
        repeatPassword: errors.repeatPassword?.message,
    };

    const handleFieldBlur = async () => {
        const isFormValid = await trigger();

        if (isFormValid && isDirty && submitButtonRef.current) {
            submitButtonRef.current.focus();
        }
    };

    return (
        <form className={styles.form} action={formAction}>
            <div className={styles['form-group']}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Введите Email"
                    className={styles.input}
                    {...register('email', {
                        onBlur: handleFieldBlur,
                    })}
                />
                {errorsMessage.email && (
                    <div className={styles.error}>{errorsMessage.email}</div>
                )}
            </div>
            <div className={styles['form-group']}>
                <label htmlFor="password">Пароль:</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
                    className={styles.input}
                    {...register('password', {
                        onBlur: handleFieldBlur,
                    })}
                />
                {errorsMessage.password && (
                    <div className={styles.error}>{errorsMessage.password}</div>
                )}
            </div>
            <div className={styles['form-group']}>
                <label htmlFor="repeatPassword">Повторить пароль:</label>
                <input
                    type="password"
                    name="repeatPassword"
                    placeholder="Введите пароль повторно"
                    className={styles.input}
                    {...register('repeatPassword', {
                        onBlur: handleFieldBlur,
                    })}
                />
                {errorsMessage.repeatPassword && (
                    <div className={styles.error}>
                        {errorsMessage.repeatPassword}
                    </div>
                )}
            </div>
            <button
                type="submit"
                ref={submitButtonRef}
                className={styles.button}
                disabled={!isValid || isPending}
            >
                Зарегистрироваться
            </button>

            {formState.message && <div>{formState.message}</div>}
        </form>
    );
};
