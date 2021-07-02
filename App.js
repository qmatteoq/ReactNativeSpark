/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   NativeModules,
   PlatformColor
 } from 'react-native';
 
 import {
   Colors,
   Header
 } from 'react-native/Libraries/NewAppScreen';
 
 const Section = ({children, title}) => {
   const isDarkMode = useColorScheme() === 'dark';
   return (
     <View style={styles.sectionContainer}>
       <Text
         style={[
           styles.sectionTitle,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         {title}
       </Text>
       <View
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
         {children}
       </View>
     </View>
   );
 };
 
 import HelloWorld from './components/HelloWorld';
 import FilePicker from './components/FilePicker';
 
 const App = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
   return (
     <SafeAreaView style={backgroundStyle}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={backgroundStyle}>
         <Header />
         <View
           style={styles.acrylicBackground}>
           <Section title="Hello community days!">
             <Text>Edit <Text style={styles.highlight}>App.js</Text> to change this
             screen and then come back to see your edits.</Text>
           </Section>
           <Section title="Hello world">
             <HelloWorld name="Matteo" />
           </Section>
           <Section title="File picker">
             <FilePicker />
           </Section>
           <Section title="Learn More">
             <Text>Read the docs to discover what to do next:</Text>
           </Section>
         </View>
       </ScrollView>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
   acrylicBackground: {
     backgroundColor: PlatformColor('SystemControlAcrylicWindowBrush')    
   },
 });
 
 export default App;