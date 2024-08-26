import { FormControl } from "@angular/forms";

export const noSpaceValidator = ( control:FormControl ) => {
    if(control.value != null && control.value.indexOf(' ') !== -1 ){
        return {noSpaceValidator:true}
    }
    else return null
}