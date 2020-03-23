export function toFormData<T>(formValue: T) {
  const formData = new FormData();

  console.log('formvalue', formValue);
  for (const key of Object.keys(formValue)) {
    const value = formValue[key];
    console.log('value', value);
    if (Array.isArray(value)) {
      value.forEach(val => {
        console.log(typeof val);
        if (typeof val === 'object' && !(val instanceof File)) {

          formData.append(`${key}[]`, JSON.stringify(val));

        } else {
          formData.append(`${key}[]`, val);
        }
      });
    } else {
      //  console.log('not array');
      formData.append(key, value);
    }
  }
  // console.log(formData);
  // console.log('exiting toFormData');


  return formData;
}
