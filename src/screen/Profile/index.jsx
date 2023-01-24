import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SettingsRow} from './parts';
import Button from '../../component/atoms/Button';
import {colors} from '../../utils';
import {removeLogin} from '../../features/authSlice';
import LogoutModal from './parts/LogoutModal';
import {useState, useCallback, useEffect} from 'react';
import {PageUndifined} from '../../component/molecules';
import {DefaultPhoto} from '../../assets/img';
import {fetchOrder} from '../../features/orderHistorySlice';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const favorites = useSelector(state => state?.favorite?.favorites);
  const [modalVisible, setModalVisible] = useState(false);
  const order = useSelector(state => state.allOrder.allOrder);
  const filterData = order.filter(item => item?.customer?._id === user?.id);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    dispatch(fetchOrder());
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <Text
          style={{
            color: colors.white,
            fontSize: 18,
            fontWeight: '700',
            textAlign: 'center',
          }}>
          {user ? `Wellcome, ${user?.firstName}` : 'Profile'}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          {user ? (
            <>
              <View style={styles.profileUser}>
                <Image
                  source={
                    !user?.image
                      ? DefaultPhoto
                      : {
                          uri: `http://192.168.1.8:8000/${user?.image}`,
                        }
                  }
                  style={styles.image}
                />
                <View style={{marginTop: 10}}>
                  <Text style={styles.userName}>
                    {user?.firstName} {user?.lastName}
                  </Text>
                  <Text style={styles.email}>{user?.email}</Text>
                </View>
              </View>
              <View style={styles.boxActivity}>
                <View style={styles.activity}>
                  <View style={{marginHorizontal: 10}}>
                    <Text
                      style={styles.totalActivity}
                      onPress={() => navigation.navigate('Receipt')}>
                      {filterData.length || 0}
                    </Text>
                    <Text style={styles.titleActivity}>Booking</Text>
                  </View>
                  <View style={{marginHorizontal: 10}}>
                    <Text
                      style={styles.totalActivity}
                      onPress={() => navigation.navigate('Favorite')}>
                      {favorites[user?.username]?.length || 0}
                    </Text>
                    <Text style={styles.titleActivity}>Favorites</Text>
                  </View>
                </View>
              </View>
              <View style={styles.box}>
                <SettingsRow
                  title="Username"
                  dataEditable={true}
                  data={user?.username}
                  prop="username"
                />
                <SettingsRow
                  title="Password"
                  dataEditable={true}
                  isPassword={true}
                  data={user?.password}
                  prop="pass"
                />
                <SettingsRow
                  title="Email"
                  dataEditable={true}
                  data={user?.email}
                  prop="email"
                />
                <SettingsRow
                  title="First Name"
                  dataEditable={true}
                  data={user?.firstName}
                  prop="firstName"
                />
                <SettingsRow
                  title="Last Name"
                  dataEditable={true}
                  data={user?.lastName}
                  prop="lastName"
                />
                <SettingsRow
                  title="Phone"
                  dataEditable={true}
                  data={user?.telephone}
                  prop="phone"
                  keyboardType="numeric"
                />
              </View>
            </>
          ) : (
            <SafeAreaView
              style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: colors.white,
              }}>
              <PageUndifined type="not login" namePage="Profile" />
            </SafeAreaView>
          )}

          <Button
            onPress={
              user
                ? () => {
                    setModalVisible(true);
                  }
                : () => {
                    navigation.navigate('Sign');
                  }
            }
            title={user ? 'Logout' : 'Login'}
            color={colors.darkBlue}
          />
          <LogoutModal
            visible={modalVisible}
            onPressCancel={() => {
              setModalVisible(false);
            }}
            Logout={() => {
              dispatch(removeLogin());
              navigation.navigate('Home');
            }}
            onRequestClose={() => setModalVisible(!modalVisible)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileBox: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textHeader: color => ({
    fontSize: 16,
    fontWeight: '700',
    color: color,
  }),
  text: color => ({
    fontSize: 15,
    color: color,
  }),
  header: {
    justifyContent: 'center',
    backgroundColor: colors.darkBlue,
    padding: 20,
  },
  container: {
    padding: 20,
  },
  profileUser: {
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: colors.black,
  },
  email: {
    fontSize: 12,
    textAlign: 'center',
    color: colors.darkGrey,
  },
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  totalActivity: {
    fontWeight: 'bold',
    color: colors.darkBlue,
    fontSize: 18,
    textAlign: 'center',
  },
  titleActivity: {
    color: colors.darkGrey,
    fontSize: 12,
    textAlign: 'center',
  },
  activity: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  boxActivity: {
    marginVertical: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: colors.grey,
    borderBottomWidth: 1,
  },
  image: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderRadius: 99,
    borderColor: colors.darkBlue,
  },
  box: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 10,
  },
  boxHeader: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
});
