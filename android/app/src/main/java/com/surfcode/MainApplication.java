package com.surfcode;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.imagepicker.ImagePickerPackage;
import com.polidea.reactnativeble.BlePackage;
import com.beefe.picker.PickerViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.github.douglasjunior.ReactNativeEasyBluetooth.classic.ClassicPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage; // <-- Add this line

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNExitAppPackage(),
            new RNFetchBlobPackage(),
            new ImagePickerPackage(),
            new BlePackage(),
            new PickerViewPackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAuthPackage(), // <-- Add this line
            new ClassicPackage(),
            new RNFirebaseDatabasePackage(),
            new RNFirebaseStoragePackage() // <-- Add this line
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
  
}
