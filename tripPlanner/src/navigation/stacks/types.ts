// import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import {NativeStackScreenProps, NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  SignUp: undefined;
  KnowHow2: undefined;
  video:undefined;
  review:undefined;
  create:undefined;
  thumbnail:undefined;
  myspace:undefined;
  editcontent:undefined;
  header:undefined;
  createPost:undefined;
  popup:undefined;
  new:undefined;
  UserProfile:undefined;
  ViewUserProfile:undefined;
  home:undefined;
  ProfileDetails:undefined;
  addEducation:undefined;
  addExperience:undefined;
  addProject:undefined;
  addPublication:undefined;
  aboutOwner:undefined;
  editPost:undefined;
  createNewPost:undefined;
  repostPost:undefined;
  talentx:undefined;
  jobalert:undefined;
  internshipapplied:undefined;
  postjob:undefined;
  appliedDetails:undefined;
  openjobs:undefined;
  ClosedJob:undefined;
  draftjob:undefined;
  InternetNotification:undefined;
  ManageJobsOption:undefined;
  netError:undefined;
  homeSearch:undefined;
  Home:undefined;
  recentSearch:undefined;
  errorScreen:undefined;
};

export type UseNavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type LandingScreenProps = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export type KnowHowScreenProps = NativeStackScreenProps<RootStackParamList, 'KnowHow2'>;

export type UserProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'UserProfile'>;

export type ViewUserProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'ViewUserProfile'>;

export type ProfileDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'ProfileDetails'>;
