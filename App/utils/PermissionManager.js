
import {
    PermissionsAndroid
} from "react-native";

function getPermissions(permission) {
    return new Promise(async () => {
        const granted = await PermissionsAndroid.request(
            permission
        )

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use")
        } else {
            console.log("permission denied")
        }
    });
}

export default {
    getPermissions,
};