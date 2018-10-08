
import {
    PermissionsAndroid
} from "react-native";

class PermissionManager {
    
    static myInstance = null;

    static getInstance(){
        if (PermissionManager.myInstance == null) {
            PermissionManager.myInstance = new PermissionManager();
        }

        return this.myInstance;
    }

    getPermissions(permission) {
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
}

export default PermissionManager;