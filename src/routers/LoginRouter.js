//登入路由
import React from 'react';
import {View} from 'react-native';
import {Router, Scene, Stack} from 'react-native-router-flux';
import Styles from '../Styles/LoginRouter.style';
import {navPop} from '../helper/routerAction';
import {iconData, routerKey} from '../data.source';
import HeaderBtn from '../Views/HeaderBtn';

//pages
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import ProfileSettingPage from '../Pages/ProfileSettingPage';
import SwitchIdentityPage from '../Pages/SwitchIdentityPage';

function LoginRouter(props) {
  return (
    <View style={Styles.page}>
      <Router>
        <Stack
          key="root"
          renderBackButton={() => (
            <HeaderBtn data={[{btn: iconData.back, onPress: () => navPop()}]} />
          )}
          headerLayoutPreset={'center'}>
          <Scene key={routerKey.LoginPage} component={LoginPage} hideNavBar />
          <Scene key={routerKey.RegisterPage} component={RegisterPage} />
          <Scene
            key={routerKey.ProfileSettingPage}
            component={ProfileSettingPage}
          />
          <Scene
            key={routerKey.SwitchIdentityPage}
            component={SwitchIdentityPage}
          />
        </Stack>
      </Router>
    </View>
  );
}

export default LoginRouter;
