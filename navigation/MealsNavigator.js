import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { Platform, Text } from 'react-native';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const defaultStackNavOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? '#FFF' : Colors.primaryColor,
        headerTitle: 'A Screen'
    }
}

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
}, defaultStackNavOptions);

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, defaultStackNavOptions)

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> : 'Favorites'
        }
    }
}

const MealsFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeTintColor: '#FFF',
    shifting: true,
    barStyle: {
        backgroundColor: Colors.primaryColor
    }
}) :
    createBottomTabNavigator(
        tabScreenConfig,
        {
            tabBarOptions: {
                labelStyle: {
                    fontFamily: 'open-sans-bold'
                },
                activeTintColor: Colors.accentColor,
            }
        });

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
        defaultNavigationOptions: defaultStackNavOptions
    });

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: FiltersNavigator
}, {
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }
    });

export default createAppContainer(MainNavigator);