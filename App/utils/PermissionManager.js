
import {
    PermissionsAndroid
} from "react-native";

function getMultiplePermissions(permission) {
    return new Promise(async () => {
        const granted = await PermissionsAndroid.requestMultiple(
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
    getMultiplePermissions,
};