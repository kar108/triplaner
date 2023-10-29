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
import {getAllTripsForUser} from '../utils/service';

function Home() {
  const dispatch = useUserDispatch();
  const userState = useUserState();
  const navigation = useNavigation<any>();
  // console.log(userState, 'user');

  const [relaod, setReload] = useState<any>(false);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    // console.log('inside effect');
    getAllTripsForUser(userState?.userId)
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
        <View style={[base.d_flex, base.row, base.align_center]}>
          <View
            style={{
              borderRadius: DIMENSIONS.wp(5),
              width: DIMENSIONS.wp(10),
              height: DIMENSIONS.wp(10),
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '5%',
            }}>
            <Typography
              size={25}
              style={{fontWeight: '800'}}
              textColor="primary">
              {userState.fullName[0]}
            </Typography>
          </View>
          <TouchableOpacity
            onPress={() => {
              dispatch({fullName: '', email: '', userId: '', auth: false});
            }}>
            <Typography
              style={{fontWeight: '800', textTransform: 'capitalize'}}
              textColor="white">
              Log out
            </Typography>
          </TouchableOpacity>
        </View>
        <Button
          textColor="primary"
          style={{
            backgroundColor: COLORS.white,
            padding: DIMENSIONS.wp(1),
            marginBottom: 0,
            width: '20%',
          }}
          size={18}
          textStyle={{fontWeight: '800'}}
          onPress={() => {
            navigation.navigate('AddTrip', {relaod:relaod,setReload: setReload});
          }}>
          Add +
        </Button>
      </View>
    );
  };

  const renderTrips = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TripsDetailPage', {details: item});
        }}>
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
                {item?.destination}
              </Typography>
            </View>
            <Typography
              size={14}
              textColor="white"
              style={{marginBottom: '1.5%'}}>
              {item?.startDate} - {item?.endDate}
              {/* 12/06/200 - 12/7/2000 */}
            </Typography>
            <Typography lines={2} size={14} textColor="white">
              {item?.description}
            </Typography>
          </View>
          <View>
            <Icon
              height={2}
              width={4}
              name="right"
              style={{tintColor: 'white'}}
            />
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
                No Trips Added
              </Typography>
            </View>
          }
          ListHeaderComponent={
            <>
              {data.length > 0 ? (
                <View>
                  <Typography
                    align="left"
                    textColor="primary"
                    size={25}
                    weight="BLD"
                    style={[base.mb_s, {fontWeight: '800'}]}>
                    My Trips
                  </Typography>
                </View>
              ) : null}
            </>
          }
          ListFooterComponent={
            false ? (
              <ActivityIndicator
                style={{marginBottom: '35%'}}
                color={COLORS.primary}
              />
            ) : (
              <View style={{marginBottom: '35%'}} />
            )
          }
          // onEndReached={() => {
          //   if (flag) {
          //     setLoader(true);
          //     setPage(page + 1);
          //   }
          // }}
          // onEndReachedThreshold={0.5}
        />
      </View>
    </View>
  );
}

export default Home;
