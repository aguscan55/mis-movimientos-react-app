import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Camera, CheckCircle2, Scan } from 'lucide-react-native';

export default function PagoScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);

  if (!permission) return <View style={styles.container} />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Camera size={60} color="#666" style={{ marginBottom: 20 }} />
        <Text style={styles.permissionText}>Necesitamos acceso a tu cámara para escanear códigos QR de pago.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={requestPermission}>
          <Text style={styles.buttonText}>Habilitar Cámara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={scannedData ? undefined : ({ data }) => setScannedData(data)}
      />

      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Escanear código QR</Text>
        </View>

        {!scannedData && (
          <View style={styles.focusFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        )}

        <View style={styles.bottomSheet}>
          {scannedData ? (
            <View style={styles.resultContainer}>
              <View style={styles.successIcon}>
                <CheckCircle2 size={50} color="#4CAF50" />
              </View>
              <Text style={styles.resultTitle}>Código Detectado</Text>
              <Text style={styles.resultData} numberOfLines={2}>{scannedData}</Text>
              
              <TouchableOpacity style={styles.primaryButton} onPress={() => setScannedData(null)}>
                <Text style={styles.buttonText}>Escanear otro código</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.scanningContainer}>
              <Scan size={30} color="#666" />
              <Text style={styles.scanningText}>Enfocá el código QR en el centro del marco para pagar</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  permissionText: { textAlign: 'center', fontSize: 16, color: '#666', marginBottom: 30, lineHeight: 24 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  focusFrame: {
    alignSelf: 'center',
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#fff',
  },
  topLeft: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 16 },
  topRight: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 16 },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 16 },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 16 },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    minHeight: 200,
  },
  scanningContainer: {
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
  },
  scanningText: { color: '#666', fontSize: 15, textAlign: 'center', fontWeight: '500' },
  resultContainer: { alignItems: 'center', width: '100%' },
  successIcon: { marginBottom: 10 },
  resultTitle: { fontSize: 20, fontWeight: 'bold', color: '#111', marginBottom: 8 },
  resultData: { fontSize: 14, color: '#666', marginBottom: 24, textAlign: 'center' },
  primaryButton: {
    backgroundColor: '#007AFF',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});