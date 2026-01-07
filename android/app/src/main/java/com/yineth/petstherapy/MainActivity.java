package com.yineth.petstherapy;

import android.os.Bundle;
import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.graphics.Color;
import android.widget.Toast;

import androidx.activity.OnBackPressedCallback;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.getcapacitor.BridgeActivity;
import com.google.firebase.messaging.FirebaseMessaging;

import org.json.JSONObject;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 🎨 Fondo base (evita parpadeo blanco)
        getWindow().getDecorView().setBackgroundColor(
                Color.parseColor("#ffbce5")
        );

        Toast.makeText(this, "APP INICIADA", Toast.LENGTH_SHORT).show();

        // 🔔 Permiso notificaciones (Android 13+)
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

        // 🔥 MANEJO CORRECTO DEL BOTÓN FÍSICO (CAPACITOR)
        getOnBackPressedDispatcher().addCallback(this,
                new OnBackPressedCallback(true) {
                    @Override
                    public void handleOnBackPressed() {

                        if (getBridge() != null &&
                                getBridge().getWebView() != null &&
                                getBridge().getWebView().canGoBack()) {

                            getBridge().getWebView().goBack();

                        } else {
                            finish(); // salir de la app
                        }
                    }
                }
        );

        // 🔑 Firebase Token
        FirebaseMessaging.getInstance().getToken()
                .addOnSuccessListener(token -> {
                    Toast.makeText(this, "TOKEN GENERADO", Toast.LENGTH_SHORT).show();
                    enviarTokenAlBackend(token);
                });
    }

    // 📡 Enviar token al backend
    private void enviarTokenAlBackend(String token) {
        new Thread(() -> {
            try {
                URL url = new URL(
                        "https://petstherapy-backend.onrender.com/api/usuarios/guardar-token"
                );
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

                conn.getResponseCode();

            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
    }
}
