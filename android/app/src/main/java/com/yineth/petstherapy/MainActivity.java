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

import com.ryltsov.alex.plugins.file.opener.FileOpenerPlugin;

// NUEVAS IMPORTACIONES
import android.content.Intent;
import android.net.Uri;
import android.util.Base64;
import java.io.File;
import java.io.FileOutputStream;
import androidx.core.content.FileProvider;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        registerPlugin(FileOpenerPlugin.class);

        getWindow().getDecorView().setBackgroundColor(
                android.graphics.Color.parseColor("#ffbce5"));

        // Permisos notificaciones
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
                .addOnSuccessListener(token -> enviarTokenAlBackend(token));

        // Bloquear botón atrás
        getOnBackPressedDispatcher().addCallback(this, new androidx.activity.OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {}
        });
    }

    // 🌸 Método nativo público que puedes llamar desde JS
    public void abrirArchivo(String base64, String nombre) {
        runOnUiThread(() -> { // 🔹 esto asegura que el intent se ejecute en el hilo principal
            try {
                File archivo = new File(getCacheDir(), nombre);
                byte[] datos = Base64.decode(base64.split(",")[1], Base64.DEFAULT);
                FileOutputStream fos = new FileOutputStream(archivo);
                fos.write(datos);
                fos.close();

                String mimeType = "application/pdf";
                if (nombre.toLowerCase().endsWith(".jpg") || nombre.toLowerCase().endsWith(".jpeg"))
                    mimeType = "image/jpeg";
                if (nombre.toLowerCase().endsWith(".png"))
                    mimeType = "image/png";

                Uri uri = FileProvider.getUriForFile(
                        this,
                        getPackageName() + ".fileprovider",
                        archivo
                );

                Intent intent = new Intent(Intent.ACTION_VIEW);
                intent.setDataAndType(uri, mimeType);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_GRANT_READ_URI_PERMISSION);
                startActivity(intent);

            } catch (Exception e) {
                e.printStackTrace();
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

                conn.getResponseCode();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
    }
}
