import React from 'react';
import { StyleSheet, Text, View, Platform, Dimensions, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import {useAssets} from 'expo-asset';

export default function App() {
    const { width, height } = Dimensions.get('window');
    const [assets] = useAssets([require('./assets/index.html')]);
    const htmlAsset = assets?.[0];

    const getIframe = () => {
        const src = !__DEV__
            ? (
                Platform.OS === 'android'
                    ? htmlAsset?.localUri || ''
                    : htmlAsset?.uri || ''
            )
            : `http://192.168.1.136:8080?r=${Date.now()}`;
        return `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Title</title>
                    <style>
                        iframe {
                            position: absolute;
                            top: 0;
                            left: 0;
                            height: 100vh;
                            width: 100vw;
                            border: 0;
                        }   
                    </style>
                </head>
                <body>
                    <iframe src="${src}"></iframe>
                </body>
            </html>
        `;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                originWhitelist={['*']}
                source={{ html: getIframe()}}
                dataDetectorTypes={'none'}
                allowFileAccess={true}
                useWebKit={true}
                style={{
                    height,
                    width,
                    resizeMode: 'cover',
                    flex: 1
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
