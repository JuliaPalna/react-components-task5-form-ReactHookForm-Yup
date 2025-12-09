export function submitForm(prevState, queryData) {
    const email = queryData['email'];
    const password = queryData['password'];
    const newDataForm = { ...prevState, email, password };

    console.log(newDataForm);
    return { message: 'Данные отправлены', newDataForm };
}
