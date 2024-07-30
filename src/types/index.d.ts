import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { WebViewErrorEvent } from 'react-native-webview/lib/WebViewTypes'
import { RefObject } from 'react'

declare module 'react-native-webview' {
  export interface WebViewProps extends ViewProps {
    source: { uri?: string; html?: string } | { uri: string } | { html: string };
    onMessage?: ( event: WebViewMessageEvent ) => void;
    onError?: ( event: WebViewErrorEvent ) => void;
    onLoadStart?: ( event: NativeSyntheticEvent<LoadStartEventData> ) => void;
    onLoad?: ( event: NativeSyntheticEvent<LoadEventData> ) => void;
    onLoadEnd?: ( event: NativeSyntheticEvent<LoadEventData> ) => void;
    style?: StyleProp<ViewStyle>;
    ref: RefObject<WebView> | null;
    allowsBackForwardNavigationGestures?: boolean;
  }

  export type MessageData = {
    type: 'log' | 'push';
    message: string;
  }

  export interface WebViewMessageEvent {
    nativeEvent: {
      data: string;
    };
  }

  export interface WebView extends WebViewProps {
    injectJavaScript: ( script: string ) => void;
    goBack: () => void;
    goForward: () => void;
    reload: () => void;
  }
}
