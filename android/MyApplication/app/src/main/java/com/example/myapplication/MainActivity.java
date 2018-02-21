package com.example.myapplication;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.content.Context;

import android.widget.ImageView;
import android.widget.Toast;



public class MainActivity extends AppCompatActivity {

    WebView wv;
    ImageView iv;

    @Override
    public void onBackPressed(){
        if(wv.canGoBack()){
            wv.goBack();
        }
        else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        wv = (WebView) findViewById(R.id.wv);
        wv.getSettings().setJavaScriptEnabled(true);
        wv.setFocusable(true);
        wv.setFocusableInTouchMode(true);
        wv.getSettings().setRenderPriority(WebSettings.RenderPriority.HIGH);

        if (isWorkingInternetPersent()) {
            wv.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);
        }
        else {
            wv.getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        }

        wv.getSettings().setDomStorageEnabled(true);
        wv.getSettings().setDatabaseEnabled(true);
        wv.getSettings().setAppCacheEnabled(true);
        wv.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);


        wv.setWebViewClient(new WebViewClient() {
            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {

                Toast toast = Toast.makeText(getApplicationContext(),
                    "При первом запуске нужно подключение к интернету!", Toast.LENGTH_SHORT);
            toast.show();

                wv.setVisibility(View.INVISIBLE);
                iv = (ImageView) findViewById(R.id.iv);
                iv.setVisibility(View.VISIBLE);
            }
        });

        wv.loadUrl("http://o99922wq.beget.tech/");

//       // Для вставки SVG
//        ImageView imageView = (ImageView) findViewById(R.id.iv2);
//        SVG svg = SVGParser.getSVGFromResource(getResources(), R.raw.svg);
////The following is needed because of image accelaration in some devices such as samsung
//        imageView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
//        imageView.setImageDrawable(svg.createPictureDrawable());
    }




    public boolean isWorkingInternetPersent() {
        ConnectivityManager connectivityManager = (ConnectivityManager) getBaseContext()
                .getSystemService(Context.CONNECTIVITY_SERVICE);
        if (connectivityManager != null) {
            NetworkInfo[] info = connectivityManager.getAllNetworkInfo();
            if (info != null)
                for (int i = 0; i < info.length; i++)
                    if (info[i].getState() == NetworkInfo.State.CONNECTED) {
                        return true;
                    }

        }
        return false;
    }
}