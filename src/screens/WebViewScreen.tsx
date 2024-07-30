import { WebViewMessageEvent } from 'react-native-webview'
import { useRef } from 'react'
import { WebView, MessageData } from 'react-native-webview'
import { Alert, SafeAreaView, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import { WebViewErrorEvent } from 'react-native-webview/lib/WebViewTypes'

const uri = process.env.EXPO_PUBLIC_WEBVIEW_URI || ''

export default function WebViewScreen () {
  const webviewRef = useRef<WebView>( null )

  const handleSendMessageToWeb = ( data: any ): void => {
    const { current } = webviewRef || {}

    !!current && current.postMessage( JSON.stringify( data ) )
  }

  const handleReceiveMessageToWeb = ( e: WebViewMessageEvent ): void => {
    const { nativeEvent: { data } } = e

    try {
      const { type, message }: MessageData = JSON.parse( data )

      switch ( type ) {
        case 'log': {
          console.log( message )
          break
        }
        case 'push': {
          Alert.alert( message )
          break
        }
      }
    } catch ( e ) {
      console.error( `Failed to parse message: ${ data }` )
    }
  }

  const handleError = ( e: WebViewErrorEvent ) => {
    console.error( 'Webview error:', e.nativeEvent )
  }

  return (
    <SafeAreaView style={ styles.container }>
      <WebView
        allowsBackForwardNavigationGestures
        ref={ webviewRef }
        style={ styles.webview }
        source={ { uri } }
        onMessage={ handleReceiveMessageToWeb }
        onError={ handleError }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
} )
