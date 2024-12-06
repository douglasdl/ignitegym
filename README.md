# IgniteGym
Ignite Gym


# 1) Application Structure

## Component Library
- [NativeBase](https://nativebase.io) → [gluestack-ui](https://gluestack.io)

## Introduction

## Knowing the Project

## [Figma Layout](https://www.figma.com/file/CtJ79ZLsrnQ59uJBLn05pN/Ignite-Gym?node-id=37%3A6&t=cmMMcVLOQGJOVwqH-0)

## Folders Mapping

Create a project with [Expo](https://docs.expo.dev/get-started/create-a-new-app/) Manager Workflow and using Typescript - Blank (Typescript):
```sh
npx create-expo-app --template
```


Don't need to install the [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver/blob/master/DOCS.md) development dependency anymore:
```sh
npm install --save-dev babel-plugin-module-resolver
```

Instead of edit the file babel.config.js to the the plugins after the (presets: ['babel-preset-expo'], line):
```js
plugins: [
	[
		'module-resolver',
		{
		root: ['./src'],
		alias: {
			'@dtos': './src/dtos',
			'@assets': './src/assets',
			'@components': './src/components',
			'@screens': './src/screens',
			'@storage': './src/storage',
			'@utils': './src/utils',
			'@services': './src/services',
			'@hooks': './src/hooks',
			'@contexts': './src/contexts',
			'@routes': './src/routes'
		}
		},
	],
],
```
Edit the "tsconfig.json" adding this is as a new item in the "compilerOptions":
```json
"paths": {
  "@dtos/*": ["./src/dtos/*"],
  "@assets/*": ["./src/assets/*"],
  "@components/*": ["./src/components/*"],
  "@screens/*": ["./src/screens/*"],
  "@storage/*": ["./src/storage/*"],
  "@utils/*": ["./src/utils/*"],
  "@services/*": ["./src/services/*"],
  "@hooks/*": ["./src/hooks/*"],
  "@contexts/*": ["./src/contexts/*"],
  "@routes/*": ["./src/routes/*"]
}
```

Update the tsconfig.json to be like this:
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@dtos/*": ["./src/dtos/*"],
      "@assets/*": ["./src/assets/*"],
      "@components/*": ["./src/components/*"],
      "@screens/*": ["./src/screens/*"],
      "@storage/*": ["./src/storage/*"],
      "@utils/*": ["./src/utils/*"],
      "@services/*": ["./src/services/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@contexts/*": ["./src/contexts/*"],
      "@routes/*": ["./src/routes/*"]
    }
  }
}
```

## Application Fonts

Install the [Expo Google Fonts](https://docs.expo.dev/guides/using-custom-fonts/#using-a-google-font):
```sh
npx expo install expo-font @expo-google-fonts/roboto
```

## Customizing the StatusBar

Import the StatusBar from react-native and configure it:
```tsx
import { StatusBar } from 'react-native';

<StatusBar 
	barStyle='light-content'
	backgroundColor='transparent'
	translucent
/>
```

## Application Assets

# 2) Component Library

## Installing the [Gluestack](https://gluestack.io)

Install the dependencies:
```sh
npm i @gluestack-ui/themed@1.1.34 @gluestack-style/react@1.0.57 @gluestack-ui/config@1.1.19 --legacy-peer-deps
npx expo install react-native-svg
```

## Customizing the Default Theme

- Create the folder theme inside src and create the THEME using the extendTheme from native-base.

## Background Image

## Using SVG

Install the dependencies [react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer) to use a SVG as a component:
```sh
npm i react-native-svg-transformer -D
```

Create the file metro.config.js as follows:
```js
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();
```
## Heading Component

## Input Component

## Finishing the Inputs

## Button Component

## Using Variants

## Constraining the Variants

## Finishing the SignIn

## Creating the SignUp

# 3) Rotas Públicas

## Proposal

## Install the Stack Navigator

Install the [React Navigation](https://reactnavigation.org/) dependencies:
```sh
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
```

## Create the routes

Create a routes folder inside the src folder:
```sh
mkdir routes
```

Create the 'auth.routes.tsx' file:
```sh
cd routes
touch auth.routes.tsx
```

## Add Typage to the routes

## Create the navigation context

## Removing the Header

## Modifying the navigation theme

## Apply authentication navigation

## Define the standard image

# 4) Private Routes

## Proposal

## Create the App interfaces structure

## Install the bottom navigator

Install the [bottom-tabs](https://reactnavigation.org/docs/tab-based-navigation)
```sh
npm install @react-navigation/bottom-tabs
```

## Create the App routes

## Using the Bottom Tab

## Add Typage to the routes

## Removing the Header

## Removing the menu label

## Changing the bottom navigator icons

## Styling the active and inactive menu

## Styling the Bottom Navigator

## App Routes Recap

# 5) Finishing the interfaces

## Proposal

## Horizontal and Vertical Positioning

## Styling the HomeHeader

## UserPhoto Component

## Logout Button

## Finishing the HomeHeader

## Create the Group component

## Using the Pressable

## Styling the Pressable event

## Showing the selected group

## Listing the groups

## Exercises List Header

## Create the ExerciseCard component

## Listing the exercises

## Home Recap

## Screen Header component

## History Card Component

## Understanding the SelectionList

## Using the SelectionList

## Empty List Message

## History Recap

## User Profile Header

## User Photo

## Skeleton Effect

## Change Photo Button

## Name and e-mail inputs

## Password input

## Profile Recap

## Navigate to the Exercise Screen

## Create the Back button

## Finish the Exercise Header

## Exercise Image

## Fisnishing the Exercise interface

## Exercise Recap

## Interfaces final adjustments

# 6) Photo Galery

## Proposal

## Install the Image Picker

Install the [Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
```sh
npx expo install expo-image-picker
```

## Accessing the Photos Album

## Enable the image edition

## Retrive the selected image

## Show the selected image

## Enable the photo loading

## File System

## Search file info

Install the [Expo File System](https://docs.expo.dev/versions/latest/sdk/filesystem/):
```sh
npx expo install expo-file-system
```

## Limiting the photo size

## Using toast messages

## Recap

# 7) Forms

## Proposal

## Inputs with states

## Understanding the React Hook Forms

Install the [React Hook Form](https://react-hook-form.com/) dependencies:
```sh
npm install react-hook-form
```

## Controlled Inputs

## Getting values from the form

## Adding typage to the form data

## Form initial values

## Adding rules to the inputs

## Getting the error message

## Rules Patterns

## Styling the validation messages

## Styling the invalid inputs

## Knowing Schema Validations

Install the [Yup](npm install @hookform/resolvers yup) dependencies:
```sh
npm install @hookform/resolvers yup
```

## Using Schema Validations

## Password validation

## Password confirmation validation

## Recap

## Adjusting the Heading

## Ending

# Backend Integration

# 1) Fundaments

## Introduction

## About the App

## About the Backend

## Organizing the Project

## What is an API

API: Application Programming Interface

## HTTP Methods

- Get: Read
- Post: Create
- Put: Update
- Delete: Delete
- Patch: Partial Update

## HTTP Codes

- 1xx: Inform
	- 102: Processing.

- 2xx: Success
	- 200: Success.
	- 201: Created. Usually after a POST insertion.

- 3xx: Redrect
	- 301: Permanently Moved.
	- 302: Moved.

- 4xx: Client Error
	- 400: Bad Request.
	- 401: Unauthorized.
	- 404: Not Found.

- 5xx: Server Error
	- 500: Internal Server Error.


# 2) Fetch API

## Proposal

## Visualizing the Database

- [Beekeeper Studio](https://github.com/beekeeper-studio/beekeeper-studio/releases)

## User Register

## Get backend response

## Async Await

## Understanding the backend flow

# 3) HTTP Client

## HTTP Client

## Installing the Axios

Install the [Axios](https://axios-http.com/docs/intro) dependencies:
```sh
npm install axios
```

## Defining our API

## Using Axios

## Axios Exceptions

## Understanding Interceptors

## Creating the AppError

## Handling API errors

# 4) React Native Contexts

## Proposal

## Context Concept

## Creating a Context

## Add typage to the Context

## Unifying the Contex Create and Provider

## Creating your own Hook

## Sharing States in to Context

## Reviewing the SignIn Form

## Updating the Context States

## Getting the user data from the backend

## Handle the handleSignIn exceptions

## SignIn Feedback

## Redirect the logged user

## Install the AsyncStorage

Install the [Expo AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/) dependencies:
```sh
npx expo install @react-native-async-storage/async-storage
```

## Persisting the logged user

## Loading the logged user

## Showing Loading while load the user

## Showing the username

## Showing the user standard photo

## Creating the SignOut Method

## Creating Account and logging in the user


# 5) JWT Authentication

## 

## 

##

##

##

##

##

##


# 6) Consuming the Backend

##

## 

##

##

##

##

##

##

## 

##

##

##

##

##

##

## 

##

##

##

##

##

##

##


# 7) Image Upload

## 

##

##

##

##

##

##


# 8) Refresh Token

## 

## 

##

##

##

##

##

##

##

##

##

