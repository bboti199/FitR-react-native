import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Headline, Text, Title, TextInput, Snackbar} from 'react-native-paper';
import {Avatar} from 'react-native-elements';
import {Colors} from '../../styles/colors';
import HeaderLeftButton from '../../components/navigation/HeaderLeftButton';
import {useSelector, useDispatch} from 'react-redux';
import {updateProfile, uploadProfilePicture} from '../../redux/auth/actions';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';

import Feather from 'react-native-vector-icons/Feather';

const ProfileScreen = () => {
  const user = useSelector(state => state.auth.user);
  const pictureUploading = useSelector(state => state.auth.pictureUploading);
  const pictureUploadError = useSelector(
    state => state.auth.pictureUploadError,
  );
  const dispatch = useDispatch();

  const [userName, setUserName] = useState(user.displayName);
  const [editMode, setEditMode] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    if (pictureUploadError !== null) {
      setSnackbarVisible(true);
    }
  }, [pictureUploadError]);

  const toggleEditMode = () => setEditMode(!editMode);

  const submitForm = () => {
    if (userName === null || userName === '') {
      setUserName(user.displayName);
      setEditMode(false);
    } else {
      dispatch(updateProfile({displayName: userName}));
      setEditMode(false);
    }
  };

  const launchPicker = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.7,
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
        console.log(response.error);
      } else {
        dispatch(uploadProfilePicture(response));
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <HeaderLeftButton size={26} buttonStyle={{color: Colors.fgPrimary}} />
        <Headline>Profile</Headline>
        <View />
      </View>
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          {pictureUploading ? (
            <View style={styles.avatarPlaceholder}>
              <ActivityIndicator size="large" color={Colors.blueSecondary} />
            </View>
          ) : (
            <Avatar
              source={{uri: user.photoURL}}
              showEditButton
              rounded
              size={150}
              onPress={launchPicker}
            />
          )}
        </View>
        <View style={styles.userInfoContainer}>
          <View style={styles.section}>
            <Text>Email</Text>
            <Title>{user.email}</Title>
          </View>
          <View style={styles.section}>
            <Text>Name</Text>
            {editMode ? (
              <View style={styles.editLabel}>
                <TextInput
                  value={userName}
                  onChangeText={text => setUserName(text)}
                  style={{flex: 1, marginRight: 30, height: 40}}
                />

                <TouchableOpacity onPress={submitForm}>
                  <Feather name="check" color={Colors.fgPrimary} size={18} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.editLabel}>
                <Title>{userName}</Title>
                <TouchableOpacity onPress={toggleEditMode}>
                  <Feather name="edit-2" color={Colors.fgPrimary} size={18} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.section}>
            <Text>Member since</Text>
            <Title>
              {moment(user.metadata.creationTime).format('dddd MMMM Do, YYYY')}
            </Title>
          </View>
          <View style={styles.section}>
            <Text>Last login</Text>
            <Title>
              {moment(user.metadata.lastSignInTime).format(
                'DD/MM/YYYY, h:mm a',
              )}
            </Title>
          </View>
        </View>
        <Snackbar
          style={styles.snackbarStyle}
          duration={Snackbar.DURATION_SHORT}
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          action={{
            label: 'GOT IT',
            onPress: () => setSnackbarVisible(false),
          }}>
          ><Text>{pictureUploadError}</Text>
        </Snackbar>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgSecondary,
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 15,
  },
  titleContainer: {
    backgroundColor: Colors.bgSecondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: -20,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  userInfoContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  section: {
    marginVertical: 15,
  },
  editLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkGrey,
  },
  snackbarStyle: {
    backgroundColor: Colors.darkGrey,
    marginHorizontal: 20,
    marginBottom: 30,
  },
});
