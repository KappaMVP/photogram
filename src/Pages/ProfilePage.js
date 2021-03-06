import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {profilePageData as pageData, iconData} from '../data.source';
import PostWall from '../Views/PostWall';
import HeaderBtn from '../Views/HeaderBtn';
import Avatar from '../Views/Elements/Avatar';
import Styles from '../Styles/ProfilePage.style';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {navToSetting, navToFanFollow} from '../helper/routerAction';
import {getCurrentPost, getUserData} from '../helper/firebaseActions';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [
        {
          id: 1,
          name: '吳天天',
          content: 350,
          photo:
            'https://live.staticflickr.com/65535/49983611666_f329a3c368_b.jpg',
          like: '1',
        },
        {
          id: 2,
          name: '張和合',
          content: 280,
          photo:
            'https://live.staticflickr.com/65535/49997526092_91d7cf0963_b.jpg',
          like: '3',
        },
        {
          id: 3,
          name: '陳踢踢',
          content: 180,
          photo:
            'https://live.staticflickr.com/65535/49983091473_e09c8bb326_b.jpg',
          like: '2',
        },
        {
          id: 4,
          name: '王呵呵',
          content: 120,
          photo: 'https://i.imgur.com/Yg1t5sW.jpg',
        },
      ],
      tag: [
        {
          id: 5,
          name: '123',
          content: 120,
          photo:
            'https://live.staticflickr.com/65535/49983613426_29e5108012_b.jpg',
          like: '1',
        },
        {
          id: 6,
          name: '457',
          content: 120,
          photo:
            'https://live.staticflickr.com/65535/49983090718_71cfa75cfe_b.jpg',
          like: '2',
        },
        {
          id: 7,
          name: '789',
          content: 120,
          photo:
            'https://live.staticflickr.com/65535/49983612971_a103f0385e_b.jpg',
          like: '3',
        },
        {
          id: 8,
          name: '123',
          content: 120,
          photo:
            'https://live.staticflickr.com/65535/49983612971_a103f0385e_b.jpg',
          like: '1',
        },
      ],
      keep: [
        {
          id: 9,
          name: '457',
          content: 120,
          photo:
            'https://live.staticflickr.com/65535/49983090718_71cfa75cfe_b.jpg',
          like: '2',
        },
        {
          id: 10,
          name: '789',
          content: 120,
          photo:
            'https://live.staticflickr.com/65535/49983612971_a103f0385e_b.jpg',
          like: '3',
        },
      ],
      profileData: {
        follower: [],
        following: [],
        userName: '',
        custID: '',
      },
      defaultView: 0,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      right: () => (
        <HeaderBtn
          data={[{btn: iconData.seetingIcon, onPress: () => navToSetting()}]}
        />
      ),
    });
    this.loadData();
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.loadData();
    });
  }

  loadData = async () => {
    const profileResult = await getUserData();
    const postResult = await getCurrentPost();
    this.props.navigation.setParams({title: profileResult.custID});

    // console.log('--------------');
    // console.log(profileResult);
    // console.log('--------------');

    this.setState({
      post: postResult,
      profileData: profileResult,
      defaultView: Object.values(profileResult.priority).findIndex(
        (data) => data,
      ),
      keep: profileResult.keep,
    });
  };

  handleNavToFanFollow = (type) => {
    navToFanFollow({number: type === 'fan' ? 0 : 1});
  };

  render() {
    const {profileData, post, defaultView, keep, tag} = this.state;
    const {
      avatarSize,
      followText,
      fanText,
      postTitle,
      tagTitle,
      keepTitle,
    } = pageData;
    return (
      <ScrollView>
        <View style={Styles.container}>
          <View style={Styles.profileContainer}>
            <View style={Styles.avatarContainer}>
              <Avatar size={avatarSize} source={{uri: profileData.avatar}} />
            </View>
            <View style={Styles.infoContainer}>
              <View style={Styles.infoView}>
                <Text style={Styles.infoText}>{post.length}</Text>
                <Text style={Styles.infoText}>{postTitle}</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.handleNavToFanFollow('fan')}
                style={Styles.infoView}>
                <Text style={Styles.infoText}>
                  {profileData.follower.length}
                </Text>
                <Text style={Styles.infoText}>{fanText}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Styles.infoView}
                onPress={() => this.handleNavToFanFollow('following')}>
                <Text style={Styles.infoText}>
                  {profileData.following.length}
                </Text>
                <Text style={Styles.infoText}>{followText}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={Styles.name}>{profileData.userName}</Text>
          <Text style={Styles.profileData}>{profileData.profile}</Text>
        </View>

        <ScrollableTabView initialPage={defaultView}>
          <PostWall data={post} tabLabel={postTitle} />
          <PostWall data={tag} tabLabel={tagTitle} />
          <PostWall data={keep} tabLabel={keepTitle} />
        </ScrollableTabView>
      </ScrollView>
    );
  }
}

export default ProfilePage;
