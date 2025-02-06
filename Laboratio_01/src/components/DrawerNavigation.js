import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DetailsVolcanScreen from '../views/DetailsVolcanScreen';
import about from '../views/about';
import volcanGallery from '../views/volcanGallery';
import volcanComment from '../views/volcanComment';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen name="Inicio" component={DetailsVolcanScreen} />
        <Drawer.Screen name="about" component={about} />
        <Drawer.Screen name="Galeria" component={volcanGallery} />
        <Drawer.Screen name="Comentarios" component={volcanComment} />
       </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;
