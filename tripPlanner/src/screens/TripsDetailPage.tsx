import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Icon, Typography} from '../components';
import {COLORS, DIMENSIONS} from '../utils/constants';
import {useUserDispatch, useUserState} from '../hooks/globalState';
import {base} from '../assets/styles';
import Navigation from '../navigation/Navigation';
import {useNavigation} from '@react-navigation/native';
import {deleteTaskFromTripForUser, getAllTasksForTrip} from '../utils/service';
import Checkbox from '../components/Checkbox';

function TripsDetailPage({route}: any) {
  const {details} = route.params;

  console.log(details?.tripId,"trip id in details")

  const dispatch = useUserDispatch();
  const userState = useUserState();
  const navigation = useNavigation<any>();
  // console.log(userState, 'user');

  const [relaod, setReload] = useState<any>(false);
  const [done, setDone] = useState<any>({status: false, id: ''});
  const [data, setData] = useState<any>([]);
  const [seemore, setSeeMore] = useState<any>(false);

  useEffect(() => {
    // console.log('inside effect');
    getAllTasksForTrip(userState?.userId,details?.tripId)
      .then((res: any) => {
        console.log(res, 'res');
        setData(res);
      })
      .catch((e: any) => {});
  }, [relaod]);

  const renderHeader = () => {
    return (
      <View
        style={[
          base.bg_primary,
          base.d_flex,
          base.row,
          base.align_center,
          {justifyContent: 'space-between'},
          base.p_xs,
          base.mb_m,
        ]}>
        <View
          style={[
            base.bg_primary,
            base.mb_s,
            base.p_xs,
            base.br_6,
            base.d_flex,
            base.row,
            base.align_center,
            {justifyContent: 'space-between'},
          ]}>
          <View>
            <Typography
              size={20}
              textColor="white"
              style={{marginBottom: '1.5%', fontWeight: '800'}}>
              {details?.name}
            </Typography>
            <View style={[base.row, base.align_center]}>
              <Icon
                style={[base.mr_xs, {tintColor: 'white'}]}
                height={2}
                width={2}
                name="map"
              />
              <Typography
                size={16}
                textColor="white"
                style={{marginBottom: '1.5%', fontWeight: '800'}}>
                {details?.destination}
              </Typography>
            </View>
            <Typography
              size={14}
              textColor="white"
              style={{marginBottom: '1.5%'}}>
              {details?.startDate} - {details?.endDate}
              {/* 12/06/200 - 12/7/2000 */}
            </Typography>
            <Typography lines={4} size={14} textColor="white">
              {!seemore && details?.description.length > 140
                ? details?.description
                : details?.description.slice(0, 80)}
            </Typography>
            {details?.description.length > 140 ? (
              <TouchableOpacity
                onPress={() => {
                  setSeeMore(!seemore);
                }}>
                <Typography lines={4} size={14} textColor="white">
                  {seemore ? 'see less' : 'see more'}
                </Typography>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  const renderTrips = ({item}: any) => {
    const handleDeleteTask = () => {
      deleteTaskFromTripForUser(
        userState?.userId,
        details?.tripId,
        item?.taskID,
      )
        .then(() => {
          setReload(!relaod);
        })
        .catch((e: any) => {});
    };

    return (
      <TouchableOpacity>
        <View
          style={[
            base.bg_primary,
            base.mb_s,
            base.p_xs,
            base.br_6,
            base.d_flex,
            base.row,
            base.align_center,
            {justifyContent: 'space-between'},
          ]}>
          <View style={[base.w_70]}>
            <Typography
              size={20}
              textColor="white"
              style={{marginBottom: '1.5%', fontWeight: '800'}}>
              {item?.name}
            </Typography>
            <Typography
              size={14}
              textColor="white"
              style={{marginBottom: '1.5%'}}>
              {item?.startDate} - {item?.endDate}
            </Typography>
            <Typography lines={2} size={14} textColor="white">
              {item?.description}
            </Typography>
          </View>
          <View style={[base.align_center]}>
            <Checkbox
              style={[base.mt_l]}
              checked={done.status}
              onPress={() => setDone({status: !done.status, id: item?.taskID})}>
              <></>
            </Checkbox>
            <Button
              textColor="primary"
              style={{
                backgroundColor: COLORS.white,
                padding: DIMENSIONS.wp(2),
                marginBottom: 0,
                borderWidth: 0,
              }}
              size={18}
              textStyle={{fontWeight: '800'}}
              onPress={handleDeleteTask}>
              Delete
            </Button>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {renderHeader()}
      <View style={[base.px_xs]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          data={data}
          renderItem={renderTrips}
          ListEmptyComponent={
            <View>
              <Typography
                align="center"
                textColor="primary"
                size={25}
                weight="BLD"
                style={[base.mb_s, {fontWeight: '800'}]}>
                No Tasks Added
              </Typography>
            </View>
          }
          ListFooterComponent={
            <Button
              disabled={false}
              testId="saveChanges"
              style={[{width: '100%', backgroundColor: COLORS.primary}]}
              textColor="white"
              textStyle={{fontWeight: '800'}}
              onPress={() => {
                navigation.navigate('AddTask', {
                  tripID: details?.tripId,
                  setReload: setReload,
                });
              }}>
              {data?.length > 0 ? 'Add another' : 'Add'}
            </Button>
          }
          ListHeaderComponent={
            <>
              {data?.length > 0 ? (
                <View>
                  <Typography
                    align="left"
                    textColor="primary"
                    size={25}
                    weight="BLD"
                    style={[base.mb_s, {fontWeight: '800'}]}>
                    Trip Tasks
                  </Typography>
                </View>
              ) : null}
            </>
          }
        />
      </View>
    </View>
  );
}

export default TripsDetailPage;
