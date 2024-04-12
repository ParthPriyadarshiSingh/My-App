import { update_signupDetails } from "./constants";

export const updateSignupDetails = (signupDetails: object) => {
    return {
        type: updateSignupDetails,
        payload: signupDetails,
    }
}