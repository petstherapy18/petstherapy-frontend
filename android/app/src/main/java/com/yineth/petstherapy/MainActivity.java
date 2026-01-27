package com.yineth.petstherapy;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.google.firebase.messaging.FirebaseMessaging;

import org.json.JSONObject;
import android.widget.Toast;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;


public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().getDecorView().setBackgroundColor(
                android.graphics.Color.parseColor("#ffbce5"));



        // 🔔 PERMISO NOTIFICACIONES (Android 13+)
        if (Build.VERSION.SDK_INT >= 33) {
            if (ContextCompat.checkSelfPermission(
                    this,
                    Manifest.permission.POST_NOTIFICATIONS
            ) != PackageManager.PERMISSION_GRANTED) {

                ActivityCompat.requestPermissions(
                        this,
                        new String[]{Manifest.permission.POST_NOTIFICATIONS},
                        1001
                );
            }
        }

        FirebaseMessaging.getInstance().getToken()
                .addOnSuccessListener(token -> {
                    enviarTokenAlBackend(token);
                });


        // 🔒 BLOQUEAR BOTÓN ATRÁS DEL SISTEMA (FORMA CORRECTA)
        getOnBackPressedDispatcher().addCallback(this, new androidx.activity.OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                // NO hacer nada aquí
                // El control queda en JavaScript (Capacitor)
            }
        });





    }





    private void enviarTokenAlBackend(String token) {
        new Thread(() -> {
            try {

            URL url = new URL("https://petstherapy-backend.onrender.com/api/usuarios/guardar-token");
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setDoOutput(true);

                JSONObject json = new JSONObject();
                json.put("correo", "petstherapy18@gmail.com");
                json.put("token", token);

                OutputStream os = conn.getOutputStream();
                os.write(json.toString().getBytes());
                os.flush();
                os.close();

                conn.getResponseCode(); // ejecuta request
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
    }
}
