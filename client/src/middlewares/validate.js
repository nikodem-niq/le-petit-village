export const validate = (name,value,errors,setErrors) => {
    switch(name) {
        case 'fullName' :
            if(value.length < 3 || value.length > 125 || typeof value == String) {
                setErrors({...errors, [name] : 'Invalid input at "full name" field.'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;
        case 'email' :
            if(value.length < 3 || value.length > 70 || typeof value == String || !value.includes('@') || !value.includes('.')) {
                setErrors({...errors, [name] : 'Invalid input at "email" field.'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;
        case 'phone' :
            if(value.length < 5 || value.length > 14 || typeof value == String) {
                setErrors({...errors, [name] : 'Invalid input at "phone" field.'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;
        case 'howManyChildren':
            if(parseInt(value) < 0 || parseInt(value) > 5000 || typeof parseInt(value) == Number) {
                setErrors({...errors, [name] : 'Invalid input at "how many children" field.'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;
        case 'nameOfChildren' :
            if(value.length < 3 || value.length > 250 || typeof value == String) {
                setErrors({...errors, [name] : 'Invalid input at "name of children field.'})
            } else {
                setErrors({...errors, [name] : ''})
            }
            break;
        default:
            break;
    }
}