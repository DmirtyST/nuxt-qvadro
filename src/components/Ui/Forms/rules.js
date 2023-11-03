import {helpers,required} from '@vuelidate/validators'
const validEmail = helpers.regex(/^([a-z0-9_.+-]+)@([a-z0-9-]+\.)+([a-z]{2,6})$/gm)
const validNumber = helpers.regex(/^\+380(39|50|63|66|67|68|91|92|93|94|95|96|97|98|99)\d{7}$/gm)
export const rules = computed(() => ({
   
      email:{
        required:helpers.withMessage('',required),
        regex:helpers.withMessage('',validEmail),
        },
        phoneNumber: {
          required: helpers.withMessage('', required),
          regex:helpers.withMessage('',validNumber),
        }

}))