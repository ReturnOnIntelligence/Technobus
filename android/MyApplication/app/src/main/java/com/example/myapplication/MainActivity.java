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
import android.widget.TextView;
import android.widget.Toast;
import android.os.CountDownTimer;



public class MainActivity extends AppCompatActivity {

    WebView wv;
    ImageView iv;
    TextView textView;

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

//                Toast toast = Toast.makeText(getApplicationContext(),
//                    "При первом запуске нужно подключение к интернету!", Toast.LENGTH_SHORT);
//            toast.show();

                wv.setVisibility(View.INVISIBLE);//!!!!!!!!!!!!!!!!
                iv = (ImageView) findViewById(R.id.iv);
                iv.setVisibility(View.VISIBLE);

                textView = (TextView) findViewById(R.id.textView);
                textView.setVisibility(View.VISIBLE);



                new CountDownTimer(5000, 5000) {

                    public void onTick(long millisUntilFinished) {
                    }

                    public void onFinish() {
                        wv.loadUrl("http://www.returnonintelligence.ru/technobus/");

                        wv.setVisibility(View.VISIBLE);//!!!!!!!!!!!!!!!!
                        iv = (ImageView) findViewById(R.id.iv);
                        iv.setVisibility(View.INVISIBLE);
                        textView = (TextView) findViewById(R.id.textView);
                        textView.setVisibility(View.INVISIBLE);
                    }
                }.start();
            }
        });

        wv.loadUrl("http://www.returnonintelligence.ru/technobus/");
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