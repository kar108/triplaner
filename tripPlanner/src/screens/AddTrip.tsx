import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import { AddEducationScreenProps } from '../../../navigation/stacks/types';
import {base} from '../assets/styles';
import {COLORS, SIZES} from '../utils/constants';
import {Icon, Input, Typography, Button} from '../components';
import {SnackbarType} from '../stores/types';
import {useSnackbar} from '../hooks';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {formatDate, generateUniqueTripID} from '../utils/helper';
import firestore from '@react-native-firebase/firestore';
import {useUserState} from '../hooks/globalState';
import {addTripForUser} from '../utils/service';

const db = firestore();

type form = {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  description: string;
};

const AddTrip = ({navigation, route}: any) => {
  const {relaod,setReload} = route.params;
  const snackbar = useSnackbar();
  const userState = useUserState();

  const [form, setForm] = useState<form>({
    name: '',
    destination: '',
    startDate: 'Start Date',
    endDate: 'End Date',
    description: '',
  });

  const {
    d_flex,
    row,
    self_center,
    self_start,
    justify_between,
    align_center,
    p_s,
    p_xs,
    p_xxs,
    mb_m,
    mb_s,
    ml_xxs,
    m_xxs,
    mt_s,
    mt_xs,
    ml_xs,
    mb_xs,
    bg_white20,
  } = base;

  const handleBack = () => {
    navigation.goBack();
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState({
    start: false,
    end: false,
  });

  const handleSaveChanges = async () => {
    let payload = {
      name: form.name,
      destination: form.destination,
      startDate: form.startDate,
      endDate: form.endDate,
      description: form.description,
      tripId: await generateUniqueTripID(),
      userId: userState?.userId,
    };
    console.log(payload, 'pay');
    await addTripForUser(userState?.userId, payload)
      .then(() => {
        handleBack();
        setReload(!relaod)
      })
      .catch((e: any) => {});
  };

  return (
    <View style={[{backgroundColor: COLORS.gray2, flex: 1}]}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            d_flex,
            m_xxs,
            p_s,
            {backgroundColor: COLORS.white, borderRadius: 10},
          ]}>
          <View style={[d_flex, row, {justifyContent: 'space-between'}]}>
            <Typography
              textColor="gray90"
              make500={true}
              size={SIZES.unit * 14}
              mb={1}>
              Name
              <Text style={{color: COLORS.error505}}>*</Text>
            </Typography>
          </View>

          <Input
            style={mb_m}
            inputStyle={{color: COLORS.gray90, fontSize: 14}}
            wrapperStyle={{backgroundColor: COLORS.gray35}}
            placeholderTextColor={COLORS.gray8}
            placeholder="First Trip"
            value={form.name}
            onChange={(e: string) => {
              setForm({...form, name: e});
            }}
            maxLength={50}
          />
          <View style={[d_flex, row, {justifyContent: 'space-between'}]}>
            <Typography
              textColor="gray90"
              make500={true}
              size={SIZES.unit * 14}
              mb={1}>
              Destination
              <Text style={{color: COLORS.error505}}>*</Text>
            </Typography>
          </View>
          <Input
            style={mb_m}
            inputStyle={{color: COLORS.gray90, fontSize: 14}}
            wrapperStyle={{backgroundColor: COLORS.gray35}}
            placeholderTextColor={COLORS.gray8}
            placeholder="Bali"
            value={form.destination}
            onChange={(e: string) => {
              setForm({...form, destination: e});
            }}
            maxLength={50}
          />
          <View style={[row]}>
            <Button
              onPress={() =>
                setDatePickerVisibility({...isDatePickerVisible, start: true})
              }
              style={[base.bg_primary, {width: '50%'}]}>
              {form.startDate}
            </Button>
            <Button
              onPress={() =>
                setDatePickerVisibility({...isDatePickerVisible, end: true})
              }
              style={[base.bg_primary, , {width: '50%'}]}>
              {form.endDate}
            </Button>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible.start}
            mode="date"
            onConfirm={(d: any) => {
              setForm({...form, startDate: formatDate(d)});
            }}
            onCancel={() => {
              setDatePickerVisibility({...isDatePickerVisible, start: false});
            }}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible.end}
            mode="date"
            onConfirm={(d: any) => {
              setForm({...form, endDate: formatDate(d)});
            }}
            onCancel={() => {
              setDatePickerVisibility({...isDatePickerVisible, end: false});
            }}
          />
          <View style={[d_flex, row, {justifyContent: 'space-between'}]}>
            <Typography
              textColor="gray90"
              make500={true}
              size={SIZES.unit * 14}
              mb={1}>
              Description
              <Text style={{color: COLORS.error505}}>*</Text>
            </Typography>
          </View>
          <Input
            inputStyle={{color: COLORS.gray90, fontSize: 14}}
            wrapperStyle={{backgroundColor: COLORS.gray35}}
            placeholderTextColor={COLORS.gray8}
            placeholder="Write a brief about your trip.."
            value={form.description}
            onChange={(e: string) => {
              setForm({...form, description: e});
            }}
            maxLength={500}
            multiline={true}
            minimumHeight={200}
            // numberOfLines={10}
          />

          <Button
            disabled={  !(
              form.name &&
              form.destination &&
              form.startDate &&
              form.startDate !== 'Start Date' &&
              form.endDate &&
              form.endDate !== 'End Date' &&
              form.description
            )}
            testId="saveChanges"
            style={[mt_s, {width: '100%', backgroundColor: COLORS.primary}]}
            textColor="white"
            textStyle={{fontWeight: '800'}}
            onPress={handleSaveChanges}>
            Save changes
          </Button>
          <Button
            disabled={false}
            testId="saveChanges"
            style={[{width: '100%', backgroundColor: COLORS.primary}]}
            textColor="white"
            textStyle={{fontWeight: '800'}}
            onPress={handleBack}>
            Cancel
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const Styles = StyleSheet.create({
  btmsheet: {
    maxHeight: 200,
  },
  btn: {
    width: '48.75%',
  },
  searchBar: {
    backgroundColor: COLORS.gray35,
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white20,
    width: 172,
    height: 112,
    borderRadius: 10,
  },
  paperActive: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white20,
    width: 172,
    height: 112,
    borderRadius: 10,
    borderColor: COLORS.white,
    borderWidth: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray3,
    flex: 1,
  },
});

export default AddTrip;
